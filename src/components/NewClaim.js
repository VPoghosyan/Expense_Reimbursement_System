
import './NewClaim.css';
import './Profile.css'
import React, { useState, useEffect, useRef } from 'react'
import Fade from 'react-reveal/Fade';


const NewClaim = (props) => {

    const [userInfo, setUserInfo] = useState({})
    const textRef = useRef();
    

    useEffect(()=>{
        
        if(props.submitNewClaim) {

            fetch('http://localhost:7777/login', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userName: props.hitProfile[0], password: props.hitProfile[1]})
          }).then(res => res.json())
            .then(res => {
                console.log(res);//test
                
                setUserInfo(res);
            }).catch(err => console.log('Request Failed', err));
        }
        
        
    },[props.submitNewClaim])

    const formSubmitHandler = (evt) => {
        evt.preventDefault()
        props.onsetSubmitNewClaim(false)
        let current = new Date();
        let tDate = (current.getMonth()+1)+'.'+current.getDate() + '.'+ current.getFullYear();
        let cTime =  current.getSeconds()+":" + current.getMinutes() + ":" + current.getHours();
        
        
        fetch('http://localhost:7777/newClaim', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userName:  props.hitProfile[0]   ,
            fName:  userInfo.fName,
            lName:  userInfo.lName,
            email: userInfo.email,
            claimStatus:   'pending'   , 
            claimDescription: textRef.current.value, 
            claimSubmitDate:  tDate, 
            submitTime:       cTime, 
        })
      }).then(res => res.json())
        .then(res => {
            console.log(res);//test
            
        }).catch(err => console.log('Request Failed', err));

    }

    return (
        <Fade left opposite when={props.submitNewClaim} unmountOnExit={true} mountonEnter={true}>
        <form style={{width:'100%', height:'100%'}} onSubmit={formSubmitHandler}>

            <ul class="form-style-1" style={{ minHeight:'70%', display:'flex',flexDirection:'column'
        , justifyContent:'space-between'}}>
                <li ><label>Full Name <span class="required">*</span></label>
                <span>{userInfo.fName}</span>
                <span>{" "}</span>
                <span>{userInfo.lName}</span>
                 </li>
                <li>
                    <label>Email <span class="required">*</span></label>
                    <span>{userInfo.email}</span>
                </li>
               
                <li>
                    <label style={{marginBottom:'5px'}}>Claim Description <span class="required">
                        *</span></label>
                    <textarea ref={textRef} name="field5" id="field5" class="field-long field-textarea"
                    placeholder="max 300 character" required></textarea>
                </li>
                <li style={{display:'flex', justifyContent:'center'}}>
                    <button className='btn' type='submit' >Submit</button>
                </li>
            </ul>
            
        </form>
        </Fade>
    );
};

export default NewClaim;

