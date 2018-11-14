import React from 'react'

class Success_Message extends React.PureComponent{
    dismiss=(e)=>{
        e.preventDefault()
        const {onDismiss}=this.props
        if(onDismiss) onDismiss()
    }
    render(){
        if(!this.props.success){
            return null
        }
      return (
          <div id="errf" class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Success!</strong> {this.props.message}
              <button type="button" class="close"  aria-label="Close" onClick={this.dismiss}>
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
      )
    }
}

export default Success_Message