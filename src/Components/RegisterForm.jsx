import { useState } from "react";
import { NavLink } from "react-router";
import useRegistration from "../Hooks/useRegistration";


export default function RegisterForm() {
    const formDefaults = { name: '', password: '', email: '', role: 'user' };
    const [regFormData, setRegFormData] = useState({ name: '', password: '', email: '', role: 'user' });
    const { setRegData } = useRegistration();
    const [message, setMessage] = useState('');
    const [warningMessage, setWarningMessage] = useState('');

    const handleChange = e => {
        setRegFormData(form => {
            form = { ...form, [e.target.name]: e.target.value }
            return form;
        })
    }

    const doRegister = _ => {
        setRegData(regFormData);
        if (regFormData.name === '' || regFormData.password === '' || regFormData.email === '') {
            setWarningMessage("Don't leave empty fields!")
            setTimeout(_ => {
                setWarningMessage('')
            }, 3000)
        } else {
            console.log('registration form submit', regFormData);
            setRegFormData(formDefaults);
            setMessage('Registration sucessful, you can now LOGIN!')
            setTimeout(_ => {
                setMessage('')
            }, 5000)

        }

    }


    return (
        <>
            <div className='login-form'>
                <h1>Registration form:</h1>
                <p>Please enter your info to register</p>
                {
                    message ? <div className="message"> {message}</div> : ''
                }
                {
                    warningMessage ? <div className="donate-modal-card-warning-message"> {warningMessage}</div> : ''
                }



                <input name="name" onChange={handleChange} type="text" placeholder='Username' value={regFormData.name} />
                <input name="password" onChange={handleChange} type="password" placeholder='Password' value={regFormData.password} />
                <input name="email" onChange={handleChange} type="email" placeholder='Email' value={regFormData.email} />
                <div> <label htmlFor="role">Select role:</label>
                    <select name="role" onChange={handleChange} id="role" value={regFormData.role}>
                        <option value="admin">Admin</option>
                        <option value="powered">Powered</option>
                        <option value="user">User</option>
                    </select>

                </div>


                <button onClick={doRegister}>Register</button>
                <div>
                    <NavLink to='/' end>Exit to <strong>home</strong></NavLink>
                    <NavLink to='/login' end> | Back to <strong>LOGIN</strong></NavLink>


                </div>


            </div>

        </>



    );
}