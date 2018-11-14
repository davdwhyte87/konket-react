import React from 'react'
import config from '.././config'
import Nav from '../components/Nav'
import '../style.css'
import Cookies from 'universal-cookie';
import Loader from '../components/Loader'


class Home extends React.Component{
    colors=['bg-r','bg-b','bg-bl','bg-y','bg-p','bg-g','bg-gr']
    constructor(props){
        super(props)
        this.state={
            data:[],
            loading:false,
            is_delete_modal_open:false
        }
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
          this.setState({data:data.data,loading:false})
          console.log(data.data)
        })
    }
    nom=false
    render(){
        console.log(this.state.data)
       
        if(this.state.loading){
            return(
                <div>
                    <Nav/>
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
                                    <button onClick={()=>{this.nom=true}} class="btn" data-toggle="modal" data-target={"#"+"Md"+index}><i class="fa fa-trash"></i></button>
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