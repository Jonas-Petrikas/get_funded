import { useEffect, useState } from 'react';
import * as C from '../Constants/main';
import axios from 'axios';

export default function useRegistration() {
    const [regData, setRegData] = useState(null);
    const [warningMessage, setWarningMessage] = useState('');


    useEffect(_ => {
        if (null === regData) {
            return;
        }
        console.log('pasileido useEffect useRegistration')
        axios.post(C.SERVER_URL + 'register', regData, { withCredentials: true })
            .then(res => {
                console.log('changes saved')
            })
            .catch(error => {
                console.log(error)
            });

    }, [regData])

    return { regData, setRegData }
}