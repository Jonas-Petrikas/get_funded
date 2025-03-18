import { NavLink } from "react-router";

export default function LoginForm() {


    return (
        <>
            <div className='login-form'>


                <input name="username" type="text" placeholder='Username' />
                <input name="password" type="password" placeholder='Password' />
                <button>Login</button>
                <NavLink to='/' end>Back to home</NavLink>


            </div>

        </>



    )
}