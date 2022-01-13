
import lBody from '../images/lBody.png'
import lBar from '../images/lBar.png'
import lDial from '../images/lDial.png'
import './lock.css'
import Spin from 'react-reveal/Spin';
import React, { useState, useEffect } from 'react'




const Lock = (props) => {
    
   


    return (
        <div style={{width: '200px', height: '200px', position: 'relative', 
        }}>

        <img style={{width: '300px', height:'200px', position: 'relative',  zIndex: '5'}} src={lBody} alt=""/>
        <img className={props.jumpBar} style={{width: '300px', height:'200px', position: 'absolute',top:'0',  
        zIndex: '2', transition:'all 2s'}} src={lBar} alt=""/>
        
        <img className={props.spinDial} style={{width: '300px', height:'200px', position: 'absolute',top:'0',
          zIndex: '10', paddingBottom:'53px', transition:'all 2s'
          , pointerEvents:'none'}} src={lDial} alt=""/>
        
 
    
      </div>
    )
};

export default Lock