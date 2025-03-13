import { useReducer, useEffect } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import donationsReducer from '../Reducers/donationsReducer';

export default function useDonations() {
    const [donations, dispatchDonations] = useReducer(donationsReducer, null);

    useEffect(_ => {
        axios.get(C.SERVER_URL + 'donations/home-show-latest')
            .then(res => {
                console.log(res.data.db);
                dispatchDonations({
                    type: A.LOAD_LATEST_DONATIONS_FROM_SERVER, // tipas ka daryt
                    payload: res.data.db // payloadas su kuo tai daryt
                });
            })
            .catch(error => {
                console.log(error)
            });

    }, [])

    return { donations, dispatchDonations }
}