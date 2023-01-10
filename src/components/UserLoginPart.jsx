import React, { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from "axios";
import { CurrentUserContext } from '../context/currentUser'

import GoogleLogin from '@leecheuk/react-google-login';
import FacebookLogin from 'react-facebook-login';

import { TextField, Checkbox, FormGroup, FormControlLabel, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl, Alert } from '@mui/material';
import { Visibility, VisibilityOff, Facebook, GitHub } from '@mui/icons-material';

function UserLoginPart({ isLogin, setLogin }) {
    const navigate = useNavigate();
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const cookies = new Cookies();
    const alertEl = useRef();

    const [email, setEmail] = useState(cookies.get('email') || "");
    const [password, setPassword] = useState(cookies.get("password") || "");
    const [remember, setRemember] = useState(cookies.get('email') ? true : false);
    const [loginWithSocialAccount, setLWSA] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState({
        message: "",
        status: "error",
    });

    // Facebook Sign in
    const responseFacebook = (response) => {
        console.log(response);
        const facebookEmail = response.email;
        if (facebookEmail) {
            setEmail(facebookEmail);
            setLWSA(true);
            setPassword(facebookEmail.length > 7 ? facebookEmail : "qwertyuiop");
            setAlertMessage({ status: "success", message: "Facebook Authorized Successfully!" })
            togglePop();
            setTimeout(() => loginUser(), 5000);
        }
    }

    const togglePop = () => {
        alertEl.current.classList.add("active");
        setTimeout(() => alertEl.current.classList.remove("active"), 5000);
    }

    const loginUser = (e) => {
        if (e) e.preventDefault();

        if (password.length < 8) {
            setAlertMessage({ status: "error", message: "Password should have at least 8 characters" })
            togglePop();
            return;
        }

        axios.post("http://localhost:1879/api/login", {
            email,
            password,
            loginWithSocialAccount
        }).then(data => {
            console.log(data, "came from user login")
            if (data.data.status === "OK") {
                setAlertMessage({ status: "success", message: "Logged in Successfully!" })
                togglePop();
                setCurrentUser(data.data.user);
                navigate('/user-dashboard');
                // window.location = "/user-dashboard";
            } else {
                setAlertMessage({ status: "error", message: data.data.message })
                togglePop();
                return;
            }
        })

        if (remember) {
            cookies.set("email", email);
            cookies.set("password", password);
        } else {
            cookies.set("email", '');
            cookies.set("password", '');
        }
    };

    // GitHub Sign in
    const responseGoogle = (response) => {
        console.log(response);
    }

    return (
        <div className="container">
            <Alert ref={alertEl} severity={alertMessage.status} className="alert-m">{alertMessage.message}</Alert>

            <h3> Login <br /> <span>to your or your company account</span></h3>

            <form action="" onSubmit={loginUser}>
                <div className="col-sm-6 p-1">
                    <TextField sx={{ my: 2, width: '23ch' }}
                        required
                        type="email"
                        id="outlined-required"
                        label="Email Address"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <FormGroup>
                        <FormControlLabel
                            onClick={() => setRemember(!remember)}
                            control={<Checkbox checked={remember} />} label="Remember me" />
                    </FormGroup>

                    <p className="account-message">Don't have an account yet?
                        <span onClick={() => setLogin(!isLogin)}>Register</span>
                    </p>

                </div>

                <div className="col-sm-6 p-1">

                    <FormControl sx={{ my: 2, width: '23ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                        <OutlinedInput required
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => { setShowPassword(!showPassword) }}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>

                    <button type="submit" className="btn btn-primary submit-btn">Submit</button>
                </div>
                <div className="clr"></div>
            </form>
            <div className="col-sm-6">
                <GoogleLogin
                    clientId="872170103824-eupg511i6kamo35fp1sg5fhm9q9poa3v.apps.googleusercontent.com"
                    buttonText="Sign in with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={false}
                    jsSrc="https://apis.google.com/js/api.js"
                    className='google-btn'
                />
            </div>
            <div className="col-sm-6">
                <FacebookLogin
                    appId="937887227196431"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    icon={<Facebook />}
                />
            </div>
            <div className="clr"></div>
        </div>
    );
}

export default UserLoginPart;