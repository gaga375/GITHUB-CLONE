import React, { useEffect } from "react";
import {useNavigate , useRoutes} from "react-router-dom";

// All Pages 
import CreateRepo from './components/createRepo/CreateRepo'
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';
import Profile from "./components/profile/Profile";
import UserIssue from "./components/userIssue/UserIssue";
import Issue from "./components/issue/Issue";
import ViewRepo from "./components/viewRepo/ViewRepo";

// Auth Context
import {useAuth} from './AuthContext'

const ProjectRoute = ()=>{
const {currentUser , setCurrentUser} = useAuth();
const navigate = useNavigate();

useEffect (()=>{

    const userIDFromStorage = localStorage.getItem("userID");



    if(userIDFromStorage && ! currentUser){
        setCurrentUser(userIDFromStorage);
    }
     if (!userIDFromStorage &&  ! ["/auth" , "/login"].includes(window.location.pathname)) {
        navigate("/auth");
    }

    if(userIDFromStorage && window.location.pathname == "/auth"){
        navigate("/")
    }

     if(userIDFromStorage && window.location.pathname == "/login"){
        navigate("/")
    }

},[currentUser , navigate , setCurrentUser]);

let element = useRoutes ([
{
    path:"/",
    element:<Dashboard/>
},
{
path:"/profile",
element:<Profile/>
},
{
    path:"/repository/:repoid",
    element:<ViewRepo/>
},
{
    path:"/auth",
    element:<Signup/>
},
{
    path:"/new",
    element:<CreateRepo/>
},
{
path:"/login",
element:<Login/>
},
{
path:"/user/issues",
element:<UserIssue/>
},
{
 path:"/issue/:repoid",
 element:<Issue/>

 }
]);

return element;
}

export default ProjectRoute;
