import { useReducer, useEffect, useState } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import donationsReducer from '../Reducers/donationsReducer';

export default function useDonations() {
    const [donations, dispatchDonations] = useReducer(donationsReducer, null);
    const [updateDonations, setUpdateDonations] = useState(0)

    useEffect(_ => {
        axios.get(C.SERVER_URL + 'donations/home-show-latest')
            .then(res => {
                dispatchDonations({
                    type: A.LOAD_LATEST_DONATIONS_FROM_SERVER, // tipas ka daryt
                    payload: res.data.db // payloadas su kuo tai daryt
                });
            })
            .catch(error => {
                console.log(error)
            });

    }, [])

    useEffect(_ => {
        if (updateDonations === 0) {
            return;
        }
        axios.get(C.SERVER_URL + 'donations/home-show-latest')
            .then(res => {
                dispatchDonations({
                    type: A.LOAD_LATEST_DONATIONS_FROM_SERVER, // tipas ka daryt
                    payload: res.data.db // payloadas su kuo tai daryt
                });
            })
            .catch(error => {
                console.log(error)
            });
        setUpdateDonations(0);

    }, [updateDonations])

    return { donations, dispatchDonations, setUpdateDonations }
}