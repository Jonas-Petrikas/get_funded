import { useReducer, useEffect, useState, useRef } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import projectDonationsReducer from '../Reducers/projectDonationsReducer';

export default function useProjectDonations({ projectID, donationsAmount, }) {
    const [projectDonations, dispatchProjectDonations] = useReducer(projectDonationsReducer, null);
    const [updateProjectDonations, setUpdateProjectDonations] = useState(0);
    const projectDonationsCount = useRef(0);

    useEffect(_ => {
        axios.get(C.SERVER_URL + 'project/' + projectID + '/donations/' + donationsAmount)
            .then(res => {
                console.log('rezultatas', res);
                projectDonationsCount.current = (res.data.count);
                dispatchProjectDonations({
                    type: A.LOAD_PROJECT_DONATIONS_FROM_SERVER, // tipas ka daryt
                    payload: res.data.donations // payloadas su kuo tai daryt

                });
            })
            .catch(error => {
                console.log(error)
            });
        setUpdateProjectDonations(0);

    }, [projectID, donationsAmount, updateProjectDonations])

    return { projectDonations, dispatchProjectDonations, setUpdateProjectDonations, projectDonationsCount }
}