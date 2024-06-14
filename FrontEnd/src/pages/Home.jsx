import { authcntxt } from "../Components/AuthContext.jsx";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
const navigate = useNavigate();
const user = useContext(authcntxt); 



useEffect(()=>{if(!user) { navigate("/Login")}}, [user]);

if(user){
     return (<div className="home"><h2>Welcome To Gym Buddy,{user[0].name}</h2></div>);
}

  
}
