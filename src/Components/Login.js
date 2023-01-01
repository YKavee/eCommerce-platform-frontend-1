import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {auth} from '../Config/Config'
import {useHistory} from 'react-router-dom'
import axios from "axios";


export const Login = () => {

    const history = useHistory();

    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const [errorMsg, setErrorMsg]=useState('');
    const [successMsg, setSuccessMsg]=useState('');

    const handleLogin=async(e)=>{
        e.preventDefault();

        try {
			const url = "http://localhost:3000/user/login";
            const data = {email:email, password:password};
			const res = await axios.post(url, data);
			localStorage.setItem("token", JSON.stringify(res.data.token));
            localStorage.setItem("user", email);
			history.push("/");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setErrorMsg(error.response.data.message);
			}
		}
    }

    return (
        <div className='container'>
            <br></br>
            <br></br>
            <h1>Login</h1>
            <hr></hr>
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>}
            <form className='form-group' autoComplete="off"
            onSubmit={handleLogin}>               
                <label>Email</label>
                <input type="email" className='form-control' required
                onChange={(e)=>setEmail(e.target.value)} value={email}></input>
                <br></br>
                <label>Password</label>
                <input type="password" className='form-control' required
                onChange={(e)=>setPassword(e.target.value)} value={password}></input>
                <br></br>
                <div className='btn-box'>
                    <span>Don't have an account SignUp
                    <Link to="signup" className='link'> Here</Link></span>
                    <button type="submit" className='btn btn-success btn-md'>LOGIN</button>
                </div>
            </form>
            {errorMsg&&<>
                <br></br>
                <div className='error-msg'>{errorMsg}</div>                
            </>}
        </div>
    )
}
