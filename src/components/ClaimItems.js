
import Card from './Card';
import './ClaimItems.css'
import './NewClaim.css';
import React, { useState, useEffect } from 'react'
import Flip from 'react-reveal/Flip';
import Bounce from 'react-reveal/Bounce';
import { FcApproval } from 'react-icons/fc';
import { ImCross } from 'react-icons/im';



const ClaimItems = (props) => {

    const isItMichael = props.hitProfile[0]==="mScott1965";
    const [hovered, setHovered] = useState(false)

    const [decisionMade, setDecisionMade] = useState(false)
    const [isApproved, setIsApproved] = useState(false)
    const [showClaim, setShowClaim] = useState(true)

    
  
   
    return (
        <Flip delay={300}
         top opposite collapse appear={true} when={showClaim} unmountOnExit={true}  mountOnEnter={true}>
        <section >
            <div className='cont ' 
              onMouseLeave={()=> setHovered(false)}
            >
            <div class="form-style-1" style={{ minHeight:'70%' 
            ,display:'flex',flexWrap:'wrap', marginTop:'30px'
        , justifyContent:'space-around', zIndex:'5', position:'relative'}}
        onMouseEnter={()=> setHovered(!decisionMade && true)}
        >
                { props.hitProfile[0]==="mScott1965" &&  
                <>
                <div className='infoCont'>
                    <div style={{marginBottom:'15px'}} ><label>Full Name: </label>
                    <span>{props.claimItem.fName}</span>
                    <span>{" "}</span>
                    <span>{props.claimItem.lName}</span>
                    </div>
                    <div style={{marginBottom:'15px'}}>
                        <label>Email: </label>
                        <span>{props.claimItem.email}</span>
                    </div>
                </div>
                
                </>
                }
                
                <div className='infoCont '>
                    <div style={{marginBottom:'15px'}}>
                        <label>Submited on:</label>
                        <span>{props.claimItem.claimSubmitDate}</span>
                        
                    </div>
                    <div style={{marginBottom:'15px'}}>
                        <label>Status: </label>
                        <span>{props.claimItem.claimStatus}</span>
                    </div>
                </div>
               
                <div className='infoCont' style={{}}>
                    <label style={{marginBottom:'5px',overflowY: 'scroll'}}>Claim Description </label>
                    <p >{props.claimItem.claimDescription}</p>
                   
                    {decisionMade && <span style={{position:'absolute', top:'20%'
                ,color:isApproved? '#006600' :'#D23'}} class="stamp isStamp is-nope"> 
                {isApproved? 'Approved' :'Denied'}</span>}
                </div>
               
            </div>
            {isItMichael && props.claimItem.claimStatus==='pending'?
                    (
                        <Bounce top collapse when={hovered} appear={true} >
                        <div className='infoCont' style={{display:'flex'
            ,width:'100%', justifyContent:'space-around', position:'absolute', top:'0%', 
            zIndex:'7'}}
                onMouseEnter={()=> setHovered(!decisionMade && true)}  >
                    <span style={{cursor:'pointer', 
                }}><FcApproval size = '45' onClick={()=>{
                    
                    setDecisionMade(true);
                    setIsApproved(true);
                    setTimeout(() => {
                        setShowClaim(false)
                    }, 2200);
                    props.onClaimDecisionHandler(props.claimItem.submitTime,"Approved")
                }}/></span>
                   <span style={{cursor:'pointer'}} onClick={()=>{
                       setDecisionMade(true);
                       setTimeout(() => {
                        setShowClaim(false)
                    }, 2200);
                    props.onClaimDecisionHandler(props.claimItem.submitTime,"Denied")
                   }}><ImCross color='red' size = '37'/></span>
                               </div>
                                </Bounce>
                    )
                    :
                    ''
                
            }
            
            </div>
        </section>
        </Flip>
      
    );
};

export default ClaimItems;