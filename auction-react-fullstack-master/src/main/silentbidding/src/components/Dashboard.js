import React,{Component} from 'react';
import './Dashboard.css'
import axios from 'axios';
import { Navigate} from 'react-router-dom';
class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            display:'hide',
            bid:'hide',
            products:[],
            redirect:" ",
            bids:[]
        }
        if(localStorage.getItem("email")==null){
          console.log("is null")
          window.location.href="#/login"
      }
    }
    componentDidMount(){
      axios({
         method:'GET',
         url:'http://localhost:8080/product-by-user/'+localStorage.getItem("email"),
         headers:{
          "Content-Type":"application/json"
        }
      }).then(response=>{
        this.setState({products:response.data})
      }).catch(response=>{
        alert("an error occured tyring to fetch products")
      })
      axios.get('http://localhost:8080/bid-by-user/'+localStorage.getItem('email')).then(response=>
      {
        this.setState({bids:response.data})
      }).catch(response=>{
        alert("an error occured fetching bids")
      })
   }
   handleClick=(id)=>{
     
     var res=<Navigate to='/bidsproduct' state={id} replace={true}>Hello</Navigate>
     this.setState({redirect:res})
     sessionStorage.setItem("prod",id)
   }
   handleBid=(e)=>{
     e.preventDefault()
     console.log("was clicked")
    if(this.state.bid=="hide"){
      this.setState({bid:''})
  }else{
      this.setState({bid:'hide'})

  }
   }
    switchDisplay=(e)=>{
      e.preventDefault()
        if(this.state.display=="hide"){
            this.setState({display:''})
        }else{
            this.setState({display:'hide'})

        }
    }
    
      
    
    render() {
      var result=  this.state.products.length>0 ?   <ul className={this.state.display} >{this.state.products.map(product=>(<li><a onClick={()=>this.handleClick(product.productid)}>{product.pname}</a></li>))}</ul>:  <ul className={this.state.display} ><li><a>No product Listed yet</a></li>   </ul>
      var bidsReuslt=this.state.bids.length>0? <ul className={this.state.bid} >{this.state.bids.map(bid=>(<li><a >{bid.bid_price} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span>{bid.bidstatus}</span></a></li>))}</ul>:  <ul className={this.state.bid} ><li><a>No Bids Placed Yet </a></li>   </ul>
        return (
          
            <div className='center'>
                <nav class='animated bounceInDown'>
  <ul>
    {this.state.redirect}
    <li>
      <a>
        <div class='fa fa-envelope'></div>
        <p onClick={this.handleBid}>Bids Placed <span class='badge right'>{this.state.bids.length}</span></p>
        
        <ul className={this.state.bid} >
        {
         bidsReuslt
        }
      </ul>
      </a>
    </li>
    <li class='sub-menu'>
      <a>
        <div class='fa fa-gear'></div>
        <p onClick={this.switchDisplay}>My Listed Products</p>
        <div class='fa fa-caret-down right'></div>
      </a>
      <ul className={this.state.display} >
        {
         result
        }
      </ul>
    </li>
    
    <li>
      <a>
        <div class='fa fa-sign-out'></div>
        Logout
      </a>
    </li>
  </ul>
</nav>

            </div>
             
        );
    }
}
//https://silentbiddingapp.herokuapp.com

export default Dashboard;