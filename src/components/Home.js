import React from 'react'
import config from '.././config'
import Nav from '../components/Nav'
import '../style.css'
import Cookies from 'universal-cookie';
import Loader from '../components/Loader'
import {Route, Link} from 'react-router-dom'
import Error_Message from '../components/Error_Message'
import Success_Message from '../components/Success_Message'

class Home extends React.Component{
    colors=['bg-r','bg-b','bg-bl','bg-y','bg-p','bg-g','bg-gr']
    constructor(props){
        super(props)
        this.state={
            data:[],
            loading:false,
            is_delete_modal_open:false,
            get_contacts_error:false,
            message:"",
            is_delete_error:false,
            success:false
        }
        this.delete_contact=this.delete_contact.bind(this)
    }
    cookies = new Cookies();
    componentDidMount(){
        this.setState({loading:true})
        console.log(this.cookies.get('loggedin'))
        if(!this.cookies.get('loggedin')){
            this.props.history.push('/signin')
        }
        fetch(config.API_URL+'/contact',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token':this.cookies.get('token')
            }
        })
        .then(data=>data.json())
        .then(data=>{
            if(data.code==1){
                this.setState({data:data.data,loading:false,get_contacts_error:false})
            }
            if(data.code==0){
                this.setState({data:data.data,loading:false,get_contacts_error:true,message:data.message})   
            }
          console.log(data.data)
        })
    }
    
    delete_contact(id){
        let cookies = new Cookies();
        let contact_id=id
        this.setState({loading:true})
        fetch(config.API_URL+'/contact/'+contact_id+'/delete',{
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'token':cookies.get('token')
            }
        })
        .then(data=>data.json())
        .then(data=>{
            if(data.code==1){
                this.setState({data:data.data,loading:false,is_delete_error:false,success:true})
                console.log(data.data)
            }
            if(data.code==0){
                this.setState({is_delete_error:true,loading:false,message:data.message,success:false})
                console.log(data.data) 
            }
       
        })
        .catch(err=>{
            console.log(err)
            this.setState({is_delete_error:true,loading:false,message:"An error occured",success:false})

        })
    }
    render(){
        console.log(this.state.data)
       
        if(this.state.loading || this.state.get_contacts_error ||!this.state.data){
            return(
                <div>
                    <Nav/>
                    <Error_Message any_errors={this.state.get_contacts_error} message={this.state.message} onDismiss={()=>{this.setState({any_errors_:false})}}/>
                    <div className="col-md-1 offset-md-5">
                    <Loader loading={this.state.loading}/>
                    </div>  
                </div>
            )
        }
        else{
            return(
                <div>
                    <Nav/>
                    <div className="col-md-1 offset-md-5">
                    <Loader loading={this.state.loading}/>
                    </div>
                    <Success_Message message={this.state.message} success={this.state.success} onDismiss={()=>{this.setState({success:false})}}/>
                    <Error_Message any_errors={this.state.is_delete_error} message={this.state.message} onDismiss={()=>{this.setState({is_delete_error:false})}}/>
                    <Error_Message any_errors={this.state.get_contacts_error} message={this.state.message} onDismiss={()=>{this.setState({get_contacts_error:false})}}/>
                    <section>
                    <div class="container">
                        <ul class="list-group">
                        {this.state.data.map((item,index)=>
                            <li  class="list-group-item"> 
                            <div class="row">
                                <div class="col-md-1">
                                    <div className={"fl "+this.colors[Math.floor(Math.random() * this.colors.length) + 0 ]}>{item.name[0]}</div>
                                </div>
                                <div class="col-md">
                                    <div class="cdp text-muted">{item.name}</div>
                                </div>
                                <div class="col-md-1 offset-md-4">
                                    <button class="btn" onClick={()=>this.delete_contact(item._id)}><i class="fa fa-trash"></i></button>
                                </div>
                                
                                <div class="col-md-1 offset-md">
                                    <button class="btn"><i class="fa fa-edit"></i></button>
                                </div>
                            </div>
                        </li>
                        
                        )}
                        </ul>
                    </div>
                </section>
                </div>
            )
        }
       
    }
}


export default Home