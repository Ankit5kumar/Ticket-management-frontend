import React from 'react'

const Profile = () => {
  let userinfo = localStorage.getItem("userInfo");
let userobj = JSON.parse(userinfo);
   return (
    <>
     <div>
       <div>
         <div className='text-3xl'>This is user Profile Page</div>
         <div className='text-2xl'>
           <h1>Welcome {userobj.username}</h1>
           <h1>Email: {userobj.email}</h1>
           <h1>Team: {userobj.team}</h1>
         </div>
 
       </div>
     </div>
    </>
   )
 }
 
 export default Profile


