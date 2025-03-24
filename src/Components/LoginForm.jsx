import { useContext, useState } from "react";
import { NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";
import Auth from "../Contexts/Auth";

const loginDefaults = { username: '', password: '' };



export default function LoginForm() {

    const [loginData, setLoginData] = useState(loginDefaults);
    const { setUser } = useContext(Auth);
    const { setLoginFormData } = useAuth(setUser);

    const handleChange = e => {
        setLoginData(login => {
            login = { ...login, [e.target.name]: e.target.value }
            return login;
        })
    }

    const doLogin = _ => {
        setLoginFormData(loginData);
        // setLoginData(loginDefaults);
    }


    return (
        <>
            <div className='login-form'>


                <input name="username" onChange={handleChange} type="text" placeholder='Username' value={loginData.username} />
                <input name="password" onChange={handleChange} type="password" placeholder='Password' value={loginData.password} />
                <button onClick={doLogin}>Login</button>
                <NavLink to='/' end>Back to home</NavLink>


            </div>

        </>



    );
}