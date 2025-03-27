import { useReducer, useEffect } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import projectDonationsReducer from '../Reducers/projectDonationsReducer';

export default function useProjectDonations({ projectID, donationsAmount }) {
    const [projectDonations, dispatchProjectDonations] = useReducer(projectDonationsReducer, null);

    useEffect(_ => {
        axios.get(C.SERVER_URL + 'project/' + projectID + '/donations/' + donationsAmount)
            .then(res => {
                dispatchProjectDonations({
                    type: A.LOAD_PROJECT_DONATIONS_FROM_SERVER, // tipas ka daryt
                    payload: res.data.donations // payloadas su kuo tai daryt
                });
            })
            .catch(error => {
                console.log(error)
            });

    }, [projectID, donationsAmount])

    return { projectDonations, dispatchProjectDonations }
}