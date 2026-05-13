import React from 'react'
import '../form.auth.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { useNavigate } from 'react-router'


const login = () => {

    const navigate = useNavigate();
    const { loading, handleLogin } = useAuth();


    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin(email, password);
        navigate("/");
    }

    if (loading) {
        return (<main><h1>Loading...</h1></main>)
    }
  return (
    <main>
        <div className="form-container">
            <h1 className='heading'>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" id="email" name='email' placeholder='Enter email address'/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password" id="password" name="password"placeholder='Enter password'/>
                </div>

                <button className='button primary-button'>Login</button>
            </form>
            <div className="register-link">
                <p>Don't have an account? <Link to="/register">Register here</Link></p>
            </div>
        </div>
    </main>
  )
}

export default login