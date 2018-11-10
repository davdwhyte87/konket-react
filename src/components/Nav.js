import React from 'react'
import {Route, Link} from 'react-router-dom'

class Nav extends React.Component{
    render(){
        return(
            <section>
                <nav class="navbar navbar-expand-lg navbar-light">
                    <a class="navbar-brand" href="#">Konnect</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon bg-alt"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item active">
                                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/">Find</Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </section>
        )
    }
}

export default Nav