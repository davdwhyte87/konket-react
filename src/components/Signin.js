import React from 'react'
import ReactDOM from 'react-dom'
import { timingSafeEqual } from 'crypto';
import config from '../config'
import Form_Error_Message from '../components/Form_Error_Message'
import Error_Message from '../components/Error_Message'
import Success_Message from '../components/Success_Message'
import Loader from '../components/Loader'
import Cookies from 'universal-cookie'
import {Route, Link} from 'react-router-dom'

class Signin extends React.Component{
    cookies = new Cookies();
    componentDidMount(){
        if(this.cookies.get('loggedin')==true){
            this.props.history.push('/signin')
        }
    }
    render(){
        return(
            <section class="container">
                <div class="row">
                    <div class="col-md-5 offset-md-3">
                        <div class="card sg">
                            <div class="card-header">
                                <h3 class="text-muted">Signin</h3>
                            </div>
                            <div class="card-body">
                                <SigninForm history={this.props.history}/>
                                <p className="text-muted">Don't have an account? <Link to="/signup">Signup</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}



class SigninForm extends React.Component {
    cookies=new Cookies()
    constructor(props) {
      super(props);
      this.state = {
        email:"",
        password:"",
        message:"",
        any_errors:false,
        errors:[],
        success:false,
        loading:false,
        any_errors_:false
      };
      this.setState({any_errors:false})
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this)
    }
  
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }

   

    handleSubmit(event){
        event.preventDefault()
        this.setState({loading:true,any_errors:false})
        this.handleInputChange(event)
        let user={
            email:this.state.email,
            password:this.state.password
        }
        console.log(user)
        fetch(config.API_URL+'/user/signin',{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user),
        }).then(data=>data.json())
        .then(data=>{
            this.setState({loading:false})
            if(data.code==1){
                this.setState({success:true,message:data.message,any_errors:false})
                console.log(this.state)
                let expiration_date = new Date();
                expiration_date.setTime(expiration_date.getTime() + (2*60*1000))
                if(data.token){
                    this.cookies.set("loggedin",true)
                    this.cookies.set("token",data.token)
                    this.props.history.push('/')
                }
            }
            else{
                if(data.errors){
                    this.setState({success:false,message:data.message,any_errors:true,errors:data.errors}) 
                }
                else{
                    this.setState({success:false,message:data.message,any_errors_:true,errors:data.errors})
                }
               
                console.log(this.state.errors)  
            }
            console.log(data.code)
        })
        .catch(error=>{
            console.log(error)
            this.setState({loading:false,any_errors_:true,message:"Network error"})
        })
    }

    componentDidMount(){
        
    }

    onDismiss(){
        this.setState({any_errors:false,any_errors_:false})
    }
  
    render() {
      return (
          <div>
              <Success_Message message={this.state.message} success={this.state.success} onDismiss={()=>{this.setState({success:false})}}/>
              <Error_Message any_errors={this.state.any_errors_} message={this.state.message} onDismiss={()=>{this.setState({any_errors_:false})}}/>
              <Form_Error_Message errors={this.state.errors} any_errors={this.state.any_errors} onDismiss={()=>{this.setState({any_errors:false})}}/>
              <form>
                    <div class="form-group">
                        <input type="email"  onChange={this.handleInputChange} value={this.state.email} className="form-control" placeholder="Email" name="email" />
                    </div>
                    <div class="form-group">
                        <input type="password"  onChange={this.handleInputChange} value={this.state.password} className="form-control" placeholder="Password" name="password" />
                    </div>
                    <div class="form-group">
                        <button class="btn" onClick={this.handleSubmit}>Signin <Loader loading={this.state.loading}/></button>
                    </div>
               </form>
          </div>
      );
    }
  }
export default Signin