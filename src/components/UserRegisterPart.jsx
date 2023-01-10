import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from "axios";
import { CurrentUserContext } from '../context/currentUser';

import { TextField, Checkbox, FormGroup, FormControlLabel, IconButton, InputLabel, FormControl, InputAdornment, OutlinedInput, Alert } from '@mui/material';
import { Visibility, VisibilityOff, FacebookIcon } from '@mui/icons-material';

function UserRegisterPart({ isLogin, setLogin }) {
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

    const cookies = new Cookies();
    const alertEl = useRef();

    const [fName, setFName] = useState(localStorage.getItem("firstName") || "");
    const [lName, setLName] = useState(localStorage.getItem("lastName") || "");
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
    const [password, setPassword] = useState(localStorage.getItem("password") || "");
    const [confirmPassword, setConfirmPassword] = useState(localStorage.getItem("confirmPassword") || "");
    const [remember, setRemember] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [alertMessage, setAlertMessage] = useState({
        message: "",
        status: "error",
    });

    const registerUser = (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setAlertMessage({ status: "error", message: "Password should have at least 8 characters" })
            togglePop();
            return null;
        }
        if (password !== confirmPassword) {
            setAlertMessage({ status: "error", message: "Confirm Your Password" })
            togglePop();
            return null;
        }
        if (password === confirmPassword) {

            axios.post("http://localhost:1879/api/register", {
                fName,
                lName,
                email,
                password,
                phone
            })
                .then(data => {
                    console.log(data.data, "came from user reg...")
                    if (data.data.status === "OK") {
                        setAlertMessage({ status: "success", message: "Registered Successfully!" })
                        togglePop();
                        setCurrentUser(data.data.newUser)
                        // window.location = '/user-dashboard'
                    } else {
                        setAlertMessage({ status: "warning", message: "This email already registered!" })
                        togglePop();
                    };
                });

            if (remember) {
                cookies.set("email", email);
                cookies.set("password", password);
            } else {
                cookies.set("email", '');
                cookies.set("password", '');
            }
        }
    }

    const togglePop = () => {
        alertEl.current.classList.add("active");
        setTimeout(() => alertEl.current.classList.remove("active"), 5000);
    }

    return (
        <div className="container">
            <Alert ref={alertEl} severity={alertMessage.status} className="alert-m">{alertMessage.message}</Alert>

            <h3>Create account <br /> <span>For yourself or your company</span></h3>

            <form action="" onSubmit={registerUser}>
                <div className="col-sm-6 p-1">
                    <TextField sx={{ my: 2, width: '23ch' }}
                        required
                        id="outlined-required"
                        label="First Name"
                        onChange={e => setFName(e.target.value)}
                    />
                    <TextField sx={{ my: 2, width: '23ch' }}
                        required
                        type="email"
                        id="outlined-required"
                        label="Email Address"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <FormControl sx={{ my: 2, width: '23ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password *</InputLabel>
                        <OutlinedInput required
                            onChange={e => setPassword(e.target.value)}
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
                    <FormGroup>
                        <FormControlLabel
                            onClick={() => setRemember(!remember)}
                            control={<Checkbox />} label="Remember me" />
                    </FormGroup>
                    <p className="account-message">Already have an account?
                        <span onClick={() => setLogin(!isLogin)}>Login</span>
                    </p>
                </div>

                <div className="col-sm-6 p-1">
                    <TextField sx={{ my: 2, width: '23ch' }}
                        onChange={e => setLName(e.target.value)}
                        required
                        id="outlined-required"
                        label="Last Name"
                    />
                    <TextField sx={{ my: 2, width: '23ch' }}
                        onChange={e => setPhone(e.target.value)}
                        type="phone"
                        label="Phone Number"
                    />
                    <FormControl sx={{ my: 2, width: '23ch' }} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password *</InputLabel>
                        <OutlinedInput required
                            onChange={e => setConfirmPassword(e.target.value)}
                            id="outlined-adornment-password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Confirm Password"
                        />
                    </FormControl>

                    <button type="submit" className="btn btn-primary my-4 submit-btn">Submit</button>

                </div>
            </form>
        </div>
    )
}

export default UserRegisterPart;