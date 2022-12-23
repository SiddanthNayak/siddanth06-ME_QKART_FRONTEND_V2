import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [userName,setUserName] = useState(null)
  const [password,setPassword] = useState(null)
  const [confirmPassword,setConfirmPassword] = useState(null)
  const [loader,setLoader] = useState(0)
  const history = useHistory()


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    setLoader(1)
    axios({
      method:"POST",
      url: config.endpoint+"/auth/register",
      data: formData
    }).then((res) => {
      if(res.status === 201){
        enqueueSnackbar("Registered Successfully",{variant:'Success'})
        setLoader(0)
        history.push('/login',{ from:"RegisterPage" })
      }
    }).catch((error) => {
      if(error.response){
        enqueueSnackbar(error.response.data?.message)
        setLoader(0)
      }
      else{
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.")
        setLoader(0)
      }
    })
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if(data.username===null){
      enqueueSnackbar("Username is a required field")
      return
    }
    if(data.password===null){
      enqueueSnackbar("Password is a required field")
      return 
    }
    if(data.username?.length <6 ){
      enqueueSnackbar("Username must be at least 6 characters")
      return
    }
    if(data.password?.length <6 ){
      enqueueSnackbar("Password must be at least 6 characters")
      return
    }
    if(data.password !== data.confirmPassword){
      enqueueSnackbar("Passwords do not match")
      return
    }
    register({username:data.username,password:data.password})
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            onChange={(e) => setUserName(e.target.value)}
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            type="password"
            fullWidth
          />

          {loader?
            <div  className="loader">
              <CircularProgress/>
            </div>
          :
          <Button onClick={() => {validateInput({username:userName,password:password,confirmPassword:confirmPassword})}} className="button" variant="contained">
            Register Now
           </Button>
          }
           
          <p className="secondary-action">
            Already have an account?{" "}
            <Link to={{pathname:'/login'}}>
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
