import {useRef, useContext,useEffect,useState} from "react";
import { useNavigate } from "react-router-dom";

import { authcntxt } from "../Components/AuthContext";
export default function AddExercises(){
const ref1= useRef();
const ref2=useRef();
const ref3=useRef();
const user=useContext(authcntxt);
const[err, setErr]=useState("");

const navigate=useNavigate();

useEffect(()=>{if(!user && !localStorage.length){  navigate("/Login")}})




async function submit(e){
e.preventDefault();
const name= ref1.current.value;
const reps= ref2.current.value;
const load= ref3.current.value;
try{
  const response = await fetch(`http://localhost:3000/addexercise/${user[0]._id}` ,{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({name, reps, load}),
      credentials:"include"
      })   
    if(!response.ok) {const error= await response.json();
      throw error;}
    
     navigate("/exercises");
}catch(error){setErr(error.message);}
 
}

    return (
      <>
   {!err ? <form className="addform" onSubmit={submit}>
        <label>Exercise Name:</label>
        <input ref={ref1} type="text"></input>
        <label>Reps:</label>
        <input ref={ref2} type="number"></input>
        <label>Load:</label>
        <input ref={ref3} type="number"></input>
        <button type="submit">Submit</button> 
     </form> : <h1>{err}</h1>}  
     
     </>
    )
}
