import React from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router'

const Register = () => {
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
    }
  return (
    <main>
        <div className="form-container">
            <h1 className='heading'>Register</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor='username'>Username</label>
                    <input type="text" id='username' name='username' placeholder='Enter username'/>
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name='email' placeholder='Enter email address'/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"placeholder='Enter password'/>
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm password'/>
                </div>

                <button className='button primary-button'>Register</button>
            </form>
    
            <div className="login-link">
                <p>Already registered? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    </main>
  )
}

export default Register