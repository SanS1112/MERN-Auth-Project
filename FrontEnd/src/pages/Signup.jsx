import { useEffect, useRef,useState } from "react";
import { dispcntxt, authcntxt } from "../Components/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const user = useContext(authcntxt);
  const [a, setA]= useState();
  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const dispatch = useContext(dispcntxt);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  async function Submit(e) {
    e.preventDefault();
    
    const email = ref1.current.value;
    const name= ref2.current.value;
    const password= ref3.current.value;
   
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name,password,email }),
        credentials:"include",
      });
      
      if (!response.ok) {
        const error= await response.json();
        throw error;
      }
      const usr= await response.json();
      const user =[];
      user.push(usr);
      localStorage.setItem("User", JSON.stringify(user));
      dispatch({ type: "login", payload:user });
      navigate("/");
    } catch (error) {
      setA(error.message);
    }
  }

  return (
    <>
      <div className="logindiv">
        <img className="loginimage" src="../image2.jpeg"></img>
      </div>
      <form onSubmit={Submit} className="loginform">
        <label>Name:</label>
        <input type="text" ref={ref2}></input>
        <br />
        <br />
        <br />
        <br />
        <label id="l2">Email:</label>
        <input type="email" ref={ref1}></input>
        <br />
        <br />
        <br />
        <br />
        <label id="l3">Password:</label>
        <input type="text" ref={ref3} id="i2"></input>
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
