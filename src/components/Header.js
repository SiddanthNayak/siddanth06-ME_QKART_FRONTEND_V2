import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import { useHistory, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import React,{useEffect} from "react";
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory()

  const logOut = () => {
    localStorage.clear()
    window.location.reload()
  }

  const AuthButtons = () => {
    if(localStorage.getItem('token')){
      return(
        <Stack direction="row" spacing={2}>
          <Avatar alt={localStorage.getItem('username')} src="../../public/avatar.png" />
          <p>{localStorage.getItem('username')}</p>
          <Button onClick={() =>{logOut()}}>Logout</Button>
        </Stack>
      )
    }
    else{
      return(
        <Stack direction="row" spacing={2}>
          <Button onClick={() =>{history.push('/login')}}>Login</Button>
          <Button onClick={() =>{history.push('/register')}} className='button' variant='contained'>Register</Button>
        </Stack>
      )
    }
  }
  useEffect(() => {
    
  },[])
  
    return (
      <Box className="header">
        <Box className="header-title">
            <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        {children}
        {hasHiddenAuthButtons?
        <Button
        className="explore-button"
        startIcon={<ArrowBackIcon />}
        variant="text"
        onClick={() => history.push("/")}
      >
          Back to explore
      </Button>
        :
        <AuthButtons/> 
        }
      </Box>
    );
};

export default Header;
