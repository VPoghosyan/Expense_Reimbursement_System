import React from 'react';
import './logIn.css';
import { useState, useRef } from 'react';
import Card from './Card'



const LogIn = (props) => {

    const [labelClassU, setLabelClassU] = useState("label0")
    const [labelClassP, setLabelClassP] = useState("label0")
    const [uNameInp, setUnameInp] = useState("");
    const [passInp, setpassInp] = useState("");

    const [inputErrColor, setInputErrColor] = useState('#fff')

    function submitHanler(evt) {
        console.log('working');
        
       evt.preventDefault()
       
       fetch('http://localhost:7777/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName: uNameInp.trim(), password: passInp.trim()})
      }).then(res => res.json())
        .then(res => {
            console.log(res);
            console.log(res.fName===null? "wrong": "right");
            props.spinDial("")
            if(res.fName===null) {
                setLabelClassU("label404");
                setLabelClassP("label404");
                setInputErrColor('red');
                props.shakeLock(true);
            } else {

                // setUnameInp("");
                // setpassInp("");
                setLabelClassU("label0");
                setLabelClassP("label0");
                setInputErrColor('#fff');
                props.shakeLock(false);
                props.onJumpBar("jumpBar")
                props.onsetUserInfo(res)
                props.onsethitProfile([uNameInp.trim(),passInp.trim()])//test
                setTimeout(()=>props.onLockTada(true), 2200)
                setTimeout(()=>{
                    setUnameInp("");
                    setpassInp("");
                }, 3500)
            }
        }).catch(err => console.log('Request Failed', err));
       
        
        //let apiURL="http://localhost:7777/"+uNameInp.trim()+" "+passInp.trim();
        props.shakeLock(false);
        props.spinDial("spinner")
        /*
        fetch(apiURL) 
        
        .then(response => response.json())  // convert to json
        .then(json => {
            console.log(json);
            console.log(json.fName===null? "wrong": "right");
            props.spinDial("")
            if(json.fName===null) {
                setLabelClassU("label404");
                setLabelClassP("label404");
                setInputErrColor('red');
                props.shakeLock(true);
                
            } else {

                // setUnameInp("");
                // setpassInp("");
                setLabelClassU("label0");
                setLabelClassP("label0");
                setInputErrColor('#fff');
                props.shakeLock(false);
                props.onJumpBar("jumpBar")
               
                props.onsethitProfile([uNameInp.trim(),passInp.trim()])//test
                setTimeout(()=>props.onLockTada(true), 2200)
                setTimeout(()=>{
                    setUnameInp("");
                    setpassInp("");
                }, 3500)
            }

        })    //pass data to populateDate() OR print data to console
        .catch(err => console.log('Request Failed', err));
    */
    }

    return (
        <>
        <div className='card' >
        
        
           <form onSubmit={submitHanler}>
        <div className="userBox" style={{}}>
          <label className={labelClassU}>Username
          

          </label>
          <input  style={{color: inputErrColor}} type="text" name="" required onFocus={()=> setLabelClassU("label1") } value={uNameInp}
           onBlur={()=> uNameInp || setLabelClassU("label0") } onChange={(e)=>setUnameInp(e.target.value)}/>
        </div>
        <div className="userBox">
          <label className={labelClassP}>Password
         

          </label>
          <input style={{color: inputErrColor}} type="password" name="" required onFocus={()=> setLabelClassP("label1")} value={passInp}
           onBlur={()=> passInp || setLabelClassP("label0") } onChange={(e)=>setpassInp(e.target.value)} />
        </div>
        
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <button className="btn" >Log In</button>

        </div>
        </form>
       
         
        
        </div>
        </>
    );
}

export default LogIn;




