import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../firebase/firebase.init';
const Login = () => {
    const [isLoggedin, setIsLoggedin] = useState([]);
    // isLoggedin.length && 
    const [email, displayName, photoURL] = isLoggedin;
    const btnStyle = {
        background: 'green',
        padding: '10px 20px',
        fontSize: '20px',
        color: '#fff',
        cursor: 'pointer'
    }

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const loginUser = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                console.log(result.user);
                const {email, displayName, photoURL} = result.user;
                setIsLoggedin([email, displayName, photoURL])
            })
            .then(error => {
                console.log(error);
            })
    }

    return (
        <div>
            <button style={btnStyle} onClick={loginUser}>Login</button>
            {
                isLoggedin.length ? 
                <div>
                    <img src={photoURL} alt="" />
                    <h2>Name : {displayName}</h2>
                    <h4>Email : {email}</h4>
                </div> : ''
            }
        </div>
    );
};

export default Login;