import React from 'react'
import loader from '../img/loader.gif' 
function Loader(props){
    if(props.loading){
      return(
          <img src={loader} height="50px" width="50px"/>
          )
    }
    else{
        return null
    }
}

export default Loader