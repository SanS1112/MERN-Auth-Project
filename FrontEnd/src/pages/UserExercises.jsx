import {Link, useNavigate } from "react-router-dom";
import { authcntxt, dispcntxt } from "../Components/AuthContext";
import {useEffect, useState, useContext} from "react";
import Exercise from "../Components/Exercise";

export default function UserExercises(){
  const user = useContext(authcntxt); 
  const dispatch = useContext(dispcntxt);
  const navigate= useNavigate();
  const [ex, setEx]= useState(null);
  const[err, setErr]=useState("");
    

/*useEffect(() => {
  if (!user && localStorage.getItem("User")) {
    console.log("1st Effect of UserEx running");
    dispatch({ type: "login", payload: JSON.parse(localStorage.getItem("User")) });
  }else if((!user && localStorage.getItem("User")=== null)) { console.log("Navigating"); navigate("/Login")}
},[]);*/


useEffect(()=>{ async function get(){
  if(user){
  try{
  const response= await fetch(`http://localhost:3000/getexercises/${user[0]._id}`,{credentials:"include"});
  if(!response.ok){ const error= await response.json();
  throw error;}
  const Userexercises= await response.json();
  setEx(Userexercises);
}catch(err){setErr(err.message)}
}else if(localStorage.length){
const usr = JSON.parse(localStorage.getItem("User"));
try{
  const response= await fetch(`http://localhost:3000/getexercises/${usr[0]._id}`,{credentials:"include"});
  if(!response.ok){ const error= await response.json();
  throw error;}
  const Userexercises= await response.json();
  setEx(Userexercises);
}catch(err){setErr(err.message)}
}
}

if(user || localStorage.length){
  console.log(user);
get();
} else navigate("/Login");
   },[user])



    return (
      <>
         {err && <h1>{err}</h1>}
        {!err && <>
        <h2>Your Selected Exercises:</h2> 
        <div className="userex">
         
        {ex && ex.map(e=> <Exercise key={e.name} name={e.name} reps={e.reps} load={e.load} />)}
        </div>
        </>}
     </>
    );
}
