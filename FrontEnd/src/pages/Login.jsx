import {useEffect, useRef} from "react";
import { dispcntxt,authcntxt } from "../Components/AuthContext";
import { useContext, useState} from "react";
import {useNavigate} from "react-router-dom";



export default function Login() {
const [a, setA] = useState("");
const user= useContext(authcntxt);
const ref1 =useRef();
const ref2 =useRef();
const dispatch = useContext(dispcntxt);
const navigate=useNavigate();

useEffect(()=> {if(user) navigate("/")},[user])


async function Submit(e) {
e.preventDefault();
const email= ref1.current.value;
const password = ref2.current.value;

try{
  const response = await fetch("http://localhost:3000/login" ,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({email, password}),
      credentials:"include", //The credentials option in the fetchAPI when set to "include" allows sending & receiving Cookies.
                             // Here it is allowing browser to receive cookie if they are sent by server
      })   
  if(!response.ok) {throw Error("Some Error Occured")}
      const user = await response.json();
  if(user.length){
      localStorage.setItem("User", JSON.stringify(user));
      dispatch({type : "login", payload:user});
      navigate("/");
      } else throw user;
}catch(error){setA(a=>error.message);}
}
//For cookies to be saved in the browser when the server sends them in the response, the following conditions must be met:

//1.Same-Origin or CORS with Credentials:
//If the request is cross-origin, the server must respond with these headers:
//Access-Control-Allow-Origin: https://example-client.com
//Access-Control-Allow-Credentials: true

//2.Set-Cookie Header:
//The server must send cookies in the response using the Set-Cookie header. Example:
//Set-Cookie: sessionId=abc123; Secure; HttpOnly; SameSite=None

//3. Secure Context:
//For cross-origin requests or sensitive operations, the connection must be over HTTPS.

//4.Proper SameSite Attribute:
//For cross-origin requests, the cookie's SameSite attribute must be set to None:
//Set-Cookie: sessionId=abc123; SameSite=None; Secure
   return (
     <>
     <div className="logindiv"><img className="loginimage" src="../image2.jpeg"></img></div>
       <form onSubmit={Submit} className="loginform">
         <label>Email:</label>
         <input type="email" ref={ref1}></input>
         <br />
         <br />
         <br />
         <br />
         <label id="l3">Password:</label>
         <input type="text" ref={ref2} id="i2"></input>
         <br />
         <br />
         <br />
         <br />
         <br />
         <button type="submit">Submit</button>
         <br />
         <br />
         {a && <p>{a}</p>}
       </form>

       
     </>
   );
}
