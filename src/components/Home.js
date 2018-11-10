import React from 'react'
import config from './config'

class Home extends React.Component{
    componentDidMount(){
        fetch(config.API_URL+'/user')
        .then(data=>data.json())
        .then(data=>{
          this.setState({})
        })
    }
    render(){
        return(
        <section>
            <div class="container">
                <ul class="list-group">
                    <li class="list-group-item"> 
                        <div class="row">
                            <div class="col-md-1">
                                <div class="fl bg-cr">M</div>
                            </div>
                            <div class="col-md">
                                <div class="cdp text-muted">Maroon4</div>
                            </div>
                            <div class="col-md-1 offset-md-4">
                                <button class="btn"><i class="fa fa-trash"></i></button>
                            </div>
                            <div class="col-md-1 offset-md">
                                <button class="btn"><i class="fa fa-edit"></i></button>
                            </div>
                        </div>
                    </li>
                    <li class="list-group-item"> 
                        <div class="row">
                            <div class="col-md-1">
                                <div class="fl bg-bl">S</div>
                            </div>
                            <div class="col-md">
                                <div class="cdp text-muted">sammy J</div>
                            </div>
                            <div class="col-md-1 offset-md-4">
                                <button class="btn"><i class="fa fa-trash"></i></button>
                            </div>
                            <div class="col-md-1 offset-md">
                                <button class="btn"><i class="fa fa-edit"></i></button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        )
    }
}

export default Home