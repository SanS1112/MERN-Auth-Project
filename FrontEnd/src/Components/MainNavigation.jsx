import { NavLink, useNavigate} from "react-router-dom";
import { authcntxt,dispcntxt } from "./AuthContext";
import { useContext } from "react";


function MainNavigation(){
const user = useContext(authcntxt); 
const dispatch=useContext(dispcntxt)
const navigate= useNavigate();
//Empty Array is Truthy!!!!


async function logout(){
  try{
    const response = await fetch("http://localhost:3000/logout",{credentials:"include"});
  } catch(error){console.log("Error clearing Cookie")}
  localStorage.clear();
  dispatch({type:"logout"});
  navigate("/Login");
}
    return (
      
        <header className="header">
          <div>
            <img src="../image.png" className="image"></img>
          </div>
          <nav>
            {!user ? (
              <ul className="list">
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : null)}
                    to="/Login"
                    end
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : null)}
                    to="/signup"
                    end
                  >
                    Signup
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="list">
                <li>
                  <NavLink className={({ isActive }) => (isActive ? "active" : null)} to="/" end>
                    {user.name}
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : null)}
                    to="/exercises"
                    end
                  >
                    My Exercises
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={({ isActive }) => (isActive ? "active" : null)}
                    to="/addexercises"
                    end
                  >
                    AddExercises
                  </NavLink>
                </li>
                <li>
                  <button className="btn" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </nav>
        </header>
      
    );
}
export default MainNavigation; 