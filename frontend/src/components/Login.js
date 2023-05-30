import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    });

    const loginHandle = async () => {
        let result = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        result = await result.json();
        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/');
        } else {
            alert('please enter correct details');
        }
    }

    return (
        <div className='center'>
            <div>
                <h3>Sign In </h3>
                <input className='input-field' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                <input className='input-field' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                <button type='button' onClick={loginHandle}>Sign In</button>
            </div>
        </div>
    )
}

export default Login;