import React from 'react'
import '../form.auth.scss'
import { Link } from 'react-router'
const login = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <main>
        <div className="form-container">
            <h1 className='heading'>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name='email' placeholder='Enter email address'/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"placeholder='Enter password'/>
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