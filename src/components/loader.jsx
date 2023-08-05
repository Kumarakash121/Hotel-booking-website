import React from 'react'
import { useState, CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";
const loaderStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
  };
  
function Loader() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");
    // const override =`
    //     display: "block",
    //     margin: "0 auto",
    //     borderColor: "red",
    //   `;
    return (
        <div style={loaderStyle}>
      <div className="sweet-loading text-center">
        
  
        <HashLoader color='#000' loading={loading} css='' size={150}/>
      </div>
      </div>
    );
}

export default Loader;