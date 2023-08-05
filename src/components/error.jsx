import React from 'react'

function Error({message}) {
  return (
    <div style ={{margin:"10px",padding:"10px"}}>
        <div class="alert alert-danger" role="alert">
            {message}
        </div>
    </div>
  )
}

export default Error;