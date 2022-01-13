
import './App.css';
import Login from './components/Login'
import './components/Card'
import Card from './components/Card';
import Fade from "react-reveal/Fade";
import Flip from 'react-reveal/Flip';
import React, { useState, useEffect, useRef } from 'react'
import Select from 'react-dropdown-select';
import WorkSpace from './components/WorkSpace'
import Slide from 'react-reveal/Slide';
import Profile from './components/Profile'
import './components/logIn.css'
import Lock from './components/Lock'
import Zoom from 'react-reveal/Zoom';
import Shake from 'react-reveal/Shake';
import Tada from 'react-reveal/Tada';
import NewClaim from './components/NewClaim';
import ClaimItems from './components/ClaimItems';
import ProfileItem from './components/ProfileItem';
import { FcSearch } from 'react-icons/fc';


function App() {
  //className='mainCont'
  
  const [showLogIn, setShowLogIn] = useState("");
  const [workSpaceHeight, setWorkSpaceHeight] = useState('300px')
  const [workSpaceWidth, setWorkSpaceWidth] = useState('400px')
  const [workSpaceTransl, setWorkSpaceTransl] = useState('')
  const [showProfile, setShowProfile] = useState(false);
  const [workSpaceMargBt, setWorkSpaceMargBt] = useState('')
  const [showLock, setShowLock] = useState(false)
  const [shakeLock, setShakeLock] = useState(false)
  const [spinDial, setSpinDial] = useState("")
  const [jumpBar, setJumpBar] = useState("")
  const [lockTada, setLockTada] = useState(false)
  const [hitProfile, sethitProfile] = useState([])//test
  const [userInfo, setUserInfo] = useState()
  const [profshowBtns, setprofshowBtns] = useState(false)
  const [submitNewClaim, setSubmitNewClaim] = useState(false);
  const [claimsArr, setClaimsArr] = useState([])
  const [viewClaims, setViewClaims] = useState(false)
  const [viewClaimWind, setViewClaimsWind] = useState(false)
  const [specificStatus, setSpecificStatus] = useState('')
  const [logOut, setLogOut] = useState(true)
  const [viewEmps, setViewEmps] = useState(false)
  const [inputLen, setInputLen] = useState('7%')
  const [empNameInp, setEmpNameInp] = useState('')
  const [empList,setEmpList] = useState([])

  const empNameRef = useRef();

  
  //document.body.style.background = "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,101,121,1) 0%, rgba(0,212,255,1) 100%)";
//onClick={()=>setShowLogIn("workspace")}

  const lockShakeHandler = (status) => {
    setShakeLock(status)
  }
  const lockSpinHandler = (status) => {
    setSpinDial(status)
  }
  const jumpBarHandler = (status) => {
    setJumpBar(status)
 
  }

  const getClaims = () => {
    fetch('http://localhost:7777/getIndClaims', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userName: hitProfile[0]})
  }).then(res => res.json())
    .then(res => {
      console.log(res);//test
      
        setClaimsArr(res)
        
    }).catch(err => console.log('Request Failed', err));
}
 
useEffect(()=>{
        
    setTimeout(() => {
            if(empNameInp.trim().length !== 0 && empNameInp === empNameRef.current.value){
              let keyWord0 = empNameInp.trim().toLowerCase();
              let keyWord1 = keyWord0.charAt(0).toUpperCase() + keyWord0.slice(1);
                let query =  (['all','All','ALL'].includes(keyWord1)? "": 
                keyWord1) + "%"; 
            fetch('http://localhost:7777/getEmps', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({fName: query})
          }).then(res => res.json())
            .then(res => {
              setEmpList(res);
              console.log(res);
              
            }).catch(err => console.log('Request Failed', err));
        }
    }, 500);
  
  
},[empNameInp])


const claimDecisionHandler = (submitTime,decision) => {

  fetch('http://localhost:7777/claimDecision', {
  method: 'post',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({submitTime: submitTime, claimStatus: decision})
}).then(res => res.json())
  .then(res => {
      console.log('claimDecision',res);
      
  }).catch(err => console.log('Request Failed', err));
  
  


}

  const logOutHandler = () => {
  //   setTimeout(()=>{
  //     setTimeout(() => {
  //       setWorkSpaceTransl('-330px');
  //     }, 1000);
  //     setWorkSpaceHeight('300px');
  //     setWorkSpaceWidth('400px')
  //     setWorkSpaceMargBt('0')
  // },700)
  //   setTimeout(()=>{
  //     setprofshowBtns(false);
  // },300)
  //   setTimeout(()=>{
  //     setShowProfile(false);
  // },500)
  setprofshowBtns(false)
  setTimeout(() => {
    setLogOut(false)
  setShowProfile(false)
  }, 500);
  setTimeout(() => {
    window.location.reload(false);
  }, 1000);
  }
  const options = [
    { value: 'All', label: 'All' },
    { value: 'pending', label: 'pending' },
    { value: 'Approved', label: 'Approved' },
    { value: 'Denied', label: 'Denied' }
  ]
  return (
    <Fade duration={2000} wait={1500} onReveal={ () => setShowLogIn("login")  }>
    <div className='mainCont' >
      
        <div style={{position:'relative'}}>

              
              <Fade top when={showProfile} appear={true}  unmountOnExit={true}  mountOnEnter={true}
              wait={1200} collapse  onReveal={ () => {
                setWorkSpaceTransl('330px');
                setTimeout(() => {
                  setprofshowBtns(true)
                
                }, 1100);
              }}> 
              
                  <Profile showBtns={profshowBtns} hitProfile={hitProfile} onsetViewClaims={setViewClaims}
                   onsetSubmitNewClaim={setSubmitNewClaim} ongetClaims={getClaims} 
                   setViewClaimsWind={setViewClaimsWind} onLogOutHandler={logOutHandler}
                   onSetViewEmps={setViewEmps}/>

              </Fade>

              <Fade bottom when={logOut}>
              <Flip delay={700} left opposite when={showLogIn==='workspace'}  unmountOnExit={true}
              
               mountonEnter={true} wait={1700} onReveal={ () => {
                 
                setWorkSpaceHeight('700px');
                setWorkSpaceWidth('600px')
                
                setTimeout(() => {
                  setShowProfile(true)
                  setWorkSpaceMargBt('25px')
                }, 2000);
                
                
               }}>
                 
                <div className='card' 
                style={{height:workSpaceHeight,width:workSpaceWidth, transition:'2s',
                marginTop:workSpaceTransl, marginBottom:workSpaceMargBt, position:'relative',
                overflowY: viewClaims || viewEmps? 'scroll': '' }}>

               

                  <NewClaim userInfo={userInfo} hitProfile={hitProfile} 
                  onsetSubmitNewClaim={setSubmitNewClaim} submitNewClaim={submitNewClaim}/>
                 
                
                 <Fade  left opposite appear={true} when={viewClaims} unmountOnExit={true} mountonEnter={true}>
                 
                      <div style={{position:'absolute', top:'0' , width:'80%',
                   margin:'1rem auto', marginLeft:'20px'}}>
                   <Select
                        style={{zIndex:'100', position:'relative'}}
                        options={options}
                        values={['All']}
                        onChange={(values) => setSpecificStatus(values[0].value)
                          
                        }
                      />
                    {claimsArr.map(c=>{
                      if(specificStatus===c.claimStatus || specificStatus==='All'){
                      return(
                      <ClaimItems key={c.submitTime} claimItem={c} hitProfile={hitProfile}
                      viewClaims={viewClaims} specificStatus={specificStatus} hitProfile={hitProfile}
                      onClaimDecisionHandler={claimDecisionHandler}/>
                      )
                      }
                      
                      })}
                     
                    
                     </div>
                     </Fade>
                 <Fade  left opposite appear={true} when={viewEmps} unmountOnExit={true} mountonEnter={true}>
                      
                      <div style={{position:'absolute', top:'0' , width:'80%',
                   margin:'1rem '}}>
                     <div style={{}}>
                       <span style={{ position:'relative'}}>
                         <FcSearch style={{ position:'absolute',top:'0' }} size='25'/></span>
                     <span>
                     <input ref={empNameRef} style={{ width:inputLen,paddingLeft:'30px', transition:'all 1s'
                     , color:'black' }} 
                     onFocus={()=>setInputLen('50%')} onBlur={()=>!empNameInp && setInputLen('7%')} 
                     value={empNameInp} onChange={(e)=>setEmpNameInp(e.target.value)} />
                     </span>
                     
                     {empList.map(e=>{
                      
                      return(
                        <ProfileItem key={e.username} empInfo={e} />
                      )
                     
                      })}
                     
                     </div>

                           
                    
                     </div>
                     </Fade>
                 
                 

                

                </div>
              </Flip>
              </Fade>
              <div style={{position:'absolute', top:'0px'}}>
          <div style={{position:'relative'}}>
            <Flip left opposite when={showLogIn==='login'} unmountOnExit={true} mountonEnter={true}
            wait={1000} onReveal={ () => setShowLock(true)  }>
              <Login shakeLock={lockShakeHandler} spinDial={lockSpinHandler} onJumpBar={jumpBarHandler}
               onLockTada={setLockTada}  onsethitProfile={sethitProfile} onsetUserInfo={setUserInfo}/>
            </Flip>
           
                <div style={{position:'absolute', top:'-50%', left:'13%'}}>
                <Zoom left opposite when={showLock} unmountOnExit={true} mountonEnter={true}>
                  <Shake when={shakeLock} >
                  <Tada when={lockTada} wait={1200} onReveal={()=> {
                    setShowLock(false);
                    setTimeout(() => {
                      setShowLogIn('workspace')
                    }, 500);
                  }}>
                    <Lock spinDial={spinDial} jumpBar={jumpBar}/>
                    </Tada>
                 </Shake>
                 </Zoom>
                </div>
               </div>
          </div>

          
        </div>

        
          
        

      
    </div>
    </Fade>
  )
}

export default App;

/*
if(specificStatus===c.claimStatus){
                      return (
                          
                        <ClaimItems key={c.submitTime} claimItem={c} hitProfile={hitProfile}
                         viewClaims={viewClaims} specificStatus={specificStatus} />
                     )
                      }



<div style={{position:'absolute', top:'0px'}}>
          <div style={{position:'relative'}}>
            <Flip left opposite when={showLogIn==='login'} unmountOnExit={true} mountonEnter={true}
            wait={1000} onReveal={ () => setShowLock(true)  }>
              <Login shakeLock={lockShakeHandler} spinDial={lockSpinHandler} onJumpBar={jumpBarHandler}
               onLockTada={setLockTada}/>
            </Flip>
           
                <div style={{position:'absolute', top:'-50%', left:'13%'}}>
                <Zoom left opposite when={showLock} unmountOnExit={true} mountonEnter={true}>
                  <Shake when={shakeLock} >
                  <Tada when={lockTada} wait={1200} onReveal={()=> {
                    setShowLock(false);
                    setTimeout(() => {
                      setShowLogIn('workspace')
                    }, 500);
                  }}>
                    <Lock spinDial={spinDial} jumpBar={jumpBar}/>
                    </Tada>
                 </Shake>
                 </Zoom>
                </div>
               </div>
          </div>


*/








/*
<Fade duration={2000} wait={1500} onReveal={ () => setShowLogIn("login")  }>
      <div className='mainCont'  style={{backgroundColor:'salmon'}}>

      <div style={{position:'relative', backgroundColor:'yellow',zIndex:'-1000'}} 
      onClick={()=>console.log('yel')}>

      <Slide  top when={showProfile} appear={true}  unmountOnExit={true} mountOnEnter={true} 
      style={{backgroundColor:'red'}}> 
      <div style={{position:'absolute', top:'-170px', backgroundColor:'red'}} 
      onClick={()=>console.log('red')}>
        <Profile  />
      </div>
      </Slide>
       
      <Flip left opposite when={showLogIn==='card'}  unmountOnExit={true}
       delay={700} wait={1700} onReveal={ () => {
        setWorkSpaceHeight('700px');
        setWorkSpaceWidth('600px')
        
        setTimeout(() => {
          setWorkSpaceTransl('translateY(200px)');
          
        }, 1200);
        setTimeout(() => {
          setShowProfile(true)
          
        }, 2000);
       }}>
      <div style={{position:'relative',  zIndex:'0'}}>

        <Card height={workSpaceHeight} width={workSpaceWidth} transl={workSpaceTransl}/>

      </div>
      </Flip>
        <Flip left opposite when={showLogIn==='login'}  unmountOnExit={true}>
      <div style={{position:'absolute', top:'0', backgroundColor:'pink'}}>

          <Login/>

      </div>
        </Flip>
      
      </div>

       
      
      </div>
    </Fade>
*/

/*
 <Flip>
        <div style={{backgroundColor:'red' ,width:'100px', height:'110px'}}></div>

      </Flip>
      <div style={{backgroundColor:'blue' ,width:'100px', height:'100px', position:'absolute'}}></div>
*/