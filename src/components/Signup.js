import React from 'react'

class Signup extends React.Component{
    render(){
        return(
            <section class="container">
                <div class="row">
                    <div class="col-md-4 offset-md-4">
                        <div class="card sg">
                            <div class="card-header">
                                <h3 class="text-muted">Signup</h3>
                            </div>
                            <div class="card-body">
                                <form>
                                    <div class="form-group">
                                        <input type="text" class="form-control" placeholder="Full Name" />
                                    </div>
                                    <div class="form-group">
                                        <input type="number" class="form-control" placeholder="Phone number" />
                                    </div>
                                    <div class="form-group">
                                        <input type="email" class="form-control" placeholder="Email" />
                                    </div>
                                    <div class="form-group">
                                        <input type="password" class="form-control" placeholder="Password" />
                                    </div>
                                    <div class="form-group">
                                        <button class="btn">Signup</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Signup