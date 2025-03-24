import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import Auth from "../Contexts/Auth";
import axios from "axios";
import * as C from '../Constants/main';


export default function Logout() {
    const navigate = useNavigate();
    const { setUser } = useContext(Auth)

    useEffect(_ => {
        axios.post(C.SERVER_URL + 'logout', {}, { withCredentials: true })
            .then(res => {
                setUser(res.data.user);
                navigate(C.GO_AFTER_LOGOUT);
            })
            .catch(err => {
                console.log(err);
            });

    }, []);

    return (
        <>
            <div className="bin">
                <div className="wrapper shadow">
                    <h2>Logging out</h2>
                </div>
            </div>
        </>
    )
}