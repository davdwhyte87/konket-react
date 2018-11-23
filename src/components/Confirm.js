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

class Confirm extends React.Component{
    cookies = new Cookies();
    componentDidMount(){
        if(this.cookies.get('loggedin')==true){
            this.props.history.push('/signup')
        }
    }
    render(){
        return(
            <section class="container">
                <div class="row">
                    <div class="col-md-5 offset-md-3">
                        <div class="card sg">
                            <div class="card-header">
                                <h3 class="text-muted">Confirm</h3>
                            </div>
                            <div class="card-body">
                                <ConfirmForm history={this.props.history}/>
                                <p className="text-muted">A code has been sent to your mail.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}



class ConfirmForm extends React.Component {
    cookies=new Cookies()
    constructor(props) {
      super(props);
      this.state = {
        code:"",
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
            code:this.state.code
        }
        fetch(config.API_URL+'/user/confirm',{
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
                this.props.history.push('/signin')
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
        })
        .catch(error=>{
            console.log(error)
            this.setState({loading:false,any_errors_:true,message:"Network error",success:false})
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
                        <input type="number"  onChange={this.handleInputChange} value={this.state.code} className="form-control" placeholder="Code" name="code" />
                    </div>
                    <div class="form-group">
                        <button class="btn" onClick={this.handleSubmit}>Confirm<Loader loading={this.state.loading}/></button>
                    </div>
               </form>
          </div>
      );
    }
  }
export default Confirm