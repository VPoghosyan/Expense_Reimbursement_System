

import Card from './Card'
import React, {useEffect, useState, useRef} from 'react';
import classes from "./Card.module.css";
import profClasses from "./Profile.module.css"
import './Profile.css';
import Flip from 'react-reveal/Flip';
import { FaUserEdit } from 'react-icons/fa';
import ContentEditable from 'react-contenteditable'



const Profile = (props) => {
    // let fName = props.userInfo.fName;
    // let lName = props.userInfo.lName;
    // let jobTitle = props.userInfo.employeeRole;
    // let userName = props.userInfo.userName;
    // let empEmail  = props.userInfo.email;

    
    const [userInfo, setUserInfo] = useState({})
    const [makeEditable, setMakeEditable] = useState(false)
    const roleRef = useRef()
    const [roleEdited, setRoleEdited] = useState('')
    const isItMichael = props.hitProfile[0]==="mScott1965";

    useEffect(()=>{
        
        
        fetch('http://localhost:7777/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName: props.hitProfile[0], password: props.hitProfile[1]})
      }).then(res => res.json())
        .then(res => {
            setUserInfo(res);
        }).catch(err => console.log('Request Failed', err));
        
        
    },[])

    const updateRole = (newRole) => {

        fetch('http://localhost:7777/updateRole', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName: props.hitProfile[0], employeeRole: newRole,
            email: 'lol'})
      }).then(res => res.json())
        .then(res => {
            console.log(res);//test
            
        }).catch(err => console.log('Request Failed', err));
    }

    

    return (

        <div  className={classes.card} style={{height: "300px", width: "600px", display:'flex',
        padding:'10px', transition:'2s', boxShadow: '0px -3px 33px 3px #000000',
         flexDirection:'column', zIndex:'9999', position:'relative', marginTop:'10px' }}>
            <div style={{flex:'60%', display:'flex', justifyContent:'center', }}>
                <div style={{borderRadius:'50%', height:'150px', width:'150px',  
            boxShadow: "0px 15px 205px rgba(0,0,0,.2)", textAlign:'center', }}>
                <img style={{height:'150px', width:'150px',borderRadius:'50%', objectFit:'cover',
                 transition:'1s' }} src={userInfo.profilePic} alt='your add here' />
            </div>
            <span style={{position: 'absolute', top:'5px', left:'95%', cursor:'pointer'}} 
            onClick={()=>{
                
                setMakeEditable(makeEditable? false: true )
                setTimeout(() => {
                    roleRef.current.focus()
                }, 100);
            }}>

            <FaUserEdit />
            </span>
            </div>
            <div style={{ flex:'25%', display:'flex', flexDirection:'column',
             alignItems:'center', justifyContent:'space-around'}}>
                <div >{userInfo.fName + " " +userInfo.lName}</div>
                
                <div ref={roleRef} 
                onBlur={()=> {
                    if(userInfo.employeeRole !== document.getElementById('role').innerHTML){
                        updateRole(document.getElementById('role').innerHTML)
                        console.log('ok');  
                    }
                    setMakeEditable(false)
                }}
                 contentEditable={makeEditable} id='role'>{userInfo.employeeRole}</div>
            </div>
            <Flip left cascade when={props.showBtns}>
            <div style={{ flex:'15%', display:'flex', borderRadius:'5%'}}>
                { isItMichael?
                    <button onClick={()=>{
                        props.onsetViewClaims(false)
                        props.onSetViewEmps(true)
                       
                    }} className={'btn'}  >View Emps</button>
                    :
                    <button onClick={()=>{
                        props.onsetViewClaims(false)
                        props.onsetSubmitNewClaim(true);
                        props.onSetViewEmps(false)
                    }} className={'btn'}  >New Claim</button>
                    
                    
                }
                <button className={'btn'} onClick={()=>{
                    props.onsetSubmitNewClaim(false)
                    props.ongetClaims()
                    props.onsetViewClaims(true)
                    props.setViewClaimsWind(true)
                    props.onSetViewEmps(false)
                }}>View Claims</button>
                <button onClick={()=> {
                    props.onsetViewClaims(false)
                    props.onsetSubmitNewClaim(false);
                    props.onSetViewEmps(false)
                    props.onLogOutHandler();

                }} className={'btn'} >Log Out</button>
                
            </div>
            </Flip>
            
        </div>
    );
};

export default Profile;


