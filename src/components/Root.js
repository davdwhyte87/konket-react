import React from "react";

class Root extends React.Component{
    render(){
        return(
        <div>
            <div>
                {this.props.children}
            </div>
        </div>
        )
    }
}

export default Root