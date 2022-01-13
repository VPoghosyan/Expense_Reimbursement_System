

import Card from './Card'
import React, {useEffect, useState, useRef} from 'react';
import classes from "./Card.module.css";
import profClasses from "./Profile.module.css"
import './Profile.css';
import Flip from 'react-reveal/Flip';
import { FaUserEdit } from 'react-icons/fa';
import ContentEditable from 'react-contenteditable'

import Fade from 'react-reveal/Fade';


const ProfileItem = (props) => {
    // let fName = props.userInfo.fName;
    // let lName = props.userInfo.lName;
    // let jobTitle = props.userInfo.employeeRole;
    // let userName = props.userInfo.userName;
    // let empEmail  = props.userInfo.email;

    
    const [userInfo, setUserInfo] = useState({})
    const [makeEditable, setMakeEditable] = useState(false)
    const roleRef = useRef()
    const [roleEdited, setRoleEdited] = useState('')
    //const isItMichael = props.hitProfile[0]==="mScott1965";

    

    const updateRole = (newRole) => {

        fetch('http://localhost:7777/updateRole', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName: props.empInfo.userName, employeeRole: newRole,
            email: 'lol'})
      }).then(res => res.json())
        .then(res => {
            console.log(res);//test
            
        }).catch(err => console.log('Request Failed', err));
    }

    

    return (
        <Fade collapse appear={true} unmountOnExit={true}  mountOnEnter={true}>
        <div  className={classes.card} style={{height: "300px", width: "100%", display:'flex',
        padding:'10px', transition:'2s', boxShadow: '0px 0px 0px 3px #000000', marginBottom:'20px' ,
         flexDirection:'column', zIndex:'9999', position:'relative', marginTop:'10px' }}>
            <div style={{flex:'60%', display:'flex', justifyContent:'center', }}>
                <div style={{borderRadius:'50%', height:'150px', width:'150px',  
            boxShadow: "0px 15px 205px rgba(0,0,0,.2)", textAlign:'center', }}>
                <img style={{height:'150px', width:'150px',borderRadius:'50%', objectFit:'cover',
                 transition:'1s' }} src={props.empInfo.profilePic} alt='your add here' />
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
                <div >{props.empInfo.fName+" "+props.empInfo.lName}</div>
                
                
                <div ref={roleRef} 
                onBlur={()=> {
                    if(userInfo.employeeRole !== document.getElementById(props.empInfo.userName).innerHTML){
                        updateRole(document.getElementById(props.empInfo.userName).innerHTML)
                        
                        
                          
                    }
                    setMakeEditable(false)
                }}
                 contentEditable={makeEditable} id={props.empInfo.userName}>{props.empInfo.employeeRole}</div>
            </div>
            
            
        </div>
        </Fade>
    );
};

export default ProfileItem;


