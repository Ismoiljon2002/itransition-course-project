import React, { createContext, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

export const CurrentUserContext = createContext();

export const CurrentUserProvider = ({ children }) => {
    const cookies = new Cookies();

    const [currentUser, setCurrentUser] = useState({
        _id: '',
        firsName: '',
        lastName: "",
        email: "",
        password: "",
        phone: "",
        status: "",
        isOnline: true,
        regTime: "",
        lastLogin: "",
        avatar: "",
        likedReviews: [],
        reviews: {
            by: '',
            createdAt: '',
            title: "",
            text: "",
            img: "",
            likedUsersId: [],
            groupSet: [],
            tag: [],
            ratedUsers: { userId: "", rate: 0 },
        }
    });

    const userEmail = cookies.get('email');
    const userPassword = cookies.get('password');
    if ( currentUser._id.length === 0 && userEmail && userPassword ) {
        console.log("set user by context axios")
        axios.post("http://localhost:1879/api/login", {
            email: userEmail,
            password: userPassword,
        }).then(data => {
            // console.log(data, "came from CurrentUser context login")
            if (data.data.status === "OK") {
                setCurrentUser(data.data.user);
            }
        })
    }

    return <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
        {children}
    </CurrentUserContext.Provider>
}