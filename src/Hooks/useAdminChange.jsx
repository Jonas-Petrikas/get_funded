import { useContext, useEffect, useState } from 'react';
import * as C from '../Constants/main';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Data from '../Contexts/Data';

export default function useAdminChange() {
    const navigate = useNavigate();
    const [updatedProjects, setUpdatedProjects] = useState(null);


    useEffect(_ => {
        if (null === updatedProjects) {
            return;
        }
        console.log(updatedProjects);
        console.log('pasileido useEffect useMakeDonation')
        axios.post(C.SERVER_URL + 'admin/useAdminChange', updatedProjects, { withCredentials: true })
            .then(res => {
                console.log('changes saved')
            })
            .catch(error => {
                console.log(error)
            });

    }, [updatedProjects])

    return { updatedProjects, setUpdatedProjects }
}