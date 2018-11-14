import React from 'react'

class Error_Message extends React.PureComponent{
    dismiss=(e)=>{
        e.preventDefault()
        const {onDismiss}=this.props
        if(onDismiss) onDismiss()
    }
    render(){
        if(!this.props.any_errors){
            return null
        }
      return (
          <div id="errf" class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error!</strong> {this.props.message}
              <button type="button" class="close"  aria-label="Close" onClick={this.dismiss}>
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
      )
    } 
}
export default Error_Message