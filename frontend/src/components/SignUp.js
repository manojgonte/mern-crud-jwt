import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate('/');
        }
    });

    const collectData = async () => {
        let result = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
        });
        result = await result.json();
        if (result) {
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.auth));
            navigate('/');
        }
    }

    return (
        <div className='center'>
            <div>
                <h3>Sign up </h3>
                <input className='input-field' type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />
                <input className='input-field' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />
                <input className='input-field' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
                <button type='button' onClick={collectData}>Sign Up</button>
            </div>
        </div>
    )
}

export default Signup;