import { useContext, useEffect, useState } from 'react';
import * as C from '../Constants/main';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Data from '../Contexts/Data';

export default function useMakeDonations({ projectID }) {
    const navigate = useNavigate();
    const [donation, setDonation] = useState(null);



    useEffect(_ => {
        if (null === donation) {
            return;
        }
        console.log('project id', donation.project_id)
        console.log('pasileido useEffect useMakeDonation')
        axios.post(C.SERVER_URL + 'make-donation/' + donation.project_id, { amount: donation.amount, donor: donation.donor, pid: donation.project_id }, { withCredentials: true })
            .then(res => {
                navigate('/project/' + donation.project_id)
            })
            .catch(error => {
                console.log(error)
            });

    }, [donation])

    return { donation, setDonation }
}