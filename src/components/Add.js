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

class Add extends React.Component{
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
                                <h3 class="text-muted">Add Contact</h3>
                            </div>
                            <div class="card-body">
                                <AddForm history={this.props.history}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}



class AddForm extends React.Component {
    cookies=new Cookies()
    constructor(props) {
      super(props);
      this.state = {
        name:"",
        email:"",
        phone:"",
        address:"",
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
        let contact={
            email:this.state.email,
            phone:this.state.phone,
            name:this.state.name,
            address:this.state.address
        }
        fetch(config.API_URL+'/contact',{
            method:"POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token':this.cookies.get('token')
            },
            body:JSON.stringify(contact),
        }).then(data=>data.json())
        .then(data=>{
            this.setState({loading:false})
            if(data.code==1){
                this.setState({success:true,message:data.message,any_errors:false})
                console.log(this.state)
                this.props.history.push('/')
            }
            else{
                if(data.errors){
                    this.setState({success:false,message:data.message,any_errors:true,errors:data.errors,any_errors_:false}) 
                }
                else{
                    this.setState({success:false,message:data.message,any_errors_:true,errors:data.errors,any_errors:false})
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
                        <input type="text"  onChange={this.handleInputChange} value={this.state.name} className="form-control" placeholder="Full Name" name="name" />
                    </div>
                    <div class="form-group">
                        <input type="number"  onChange={this.handleInputChange} value={this.state.phone} className="form-control" placeholder="Phone number" name="phone" />
                    </div>
                    <div class="form-group">
                        <input type="email"  onChange={this.handleInputChange} value={this.state.email} className="form-control" placeholder="Email" name="email" />
                    </div>
                    <div class="form-group">
                        <textarea  onChange={this.handleInputChange} value={this.state.password} className="form-control" placeholder="Address" name="address"></textarea>
                    </div>
                    <div class="form-group">
                        <button class="btn" onClick={this.handleSubmit}>Add<Loader loading={this.state.loading}/></button>
                    </div>
               </form>
          </div>
      );
    }
  }
export default Add