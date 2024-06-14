import { createContext, useContext, useEffect, useReducer} from "react";
 
export const authcntxt = createContext();
export const dispcntxt = createContext();


export default function AuthContext({children}){
   
   let[cntxt, dispatch] = useReducer(reducer, null);

   useEffect(()=>{if(localStorage.length){
    
    dispatch({type:"login", payload:JSON.parse(localStorage.getItem("User"))})
   } 
    },[]);

 
 
   function reducer(cntxt, action) {
     switch (action.type) {
    case "login": {
      
      return action.payload;
    }
    case "logout": {
     return null;
    }
  }
}

    return(
        <authcntxt.Provider value={cntxt} >
         <dispcntxt.Provider value={dispatch} >
            {children}
            </dispcntxt.Provider>   
        </authcntxt.Provider>
    )
}

