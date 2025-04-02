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
        console.log('pasileido useEffect useMakeDonation')
        axios.post(C.SERVER_URL + 'make-donation/' + projectID, { amount: donation.amount, donor: donation.donor }, { withCredentials: true })
            .then(res => {
                navigate('/project/' + projectID)
            })
            .catch(error => {
                console.log(error)
            });

    }, [donation])

    return { donation, setDonation }
}