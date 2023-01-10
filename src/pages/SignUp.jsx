import React, { useState, useEffect, useRef } from 'react';
import UserLoginPart from '../components/UserLoginPart';
import UserRegisterPart from '../components/UserRegisterPart';
import SignUpImg from '../img/SignUpImg.png';

import './styles/SignUp.css';

function SignUp() {

    // change login and register part
    const [ isLoginCard, setIsLoginCard ] = useState(true);

    return (
        <div className="signUp">            
            <div className="signUpCard">
                <div className="col-md-12">
                    <div className="col-md-6 blue-bg text-center">
                        <div className="container">
                            <h3 className="text-white">You can Create as many Reviews as You want</h3>

                            <img src={SignUpImg} className="signUpImg" alt="" />

                        </div>
                    </div>
                    <div className="col-md-6" style={{ textAlign: "left" }}>
                        {!isLoginCard ? 
                            <UserRegisterPart isLogin={isLoginCard} setLogin={setIsLoginCard} /> : 
                            <UserLoginPart isLogin={isLoginCard} setLogin={setIsLoginCard} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;