import { useEffect, useState } from 'react';
import * as C from '../Constants/main';
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function useMakeDonations({ pid }) {
    const navigate = useNavigate();
    const [donation, setDonation] = useState({ amount: 0, donor: '' });


    useEffect(_ => {
        axios.post(C.SERVER_URL + 'make-donation/' + pid, { amount: donation.amount, donor: donation.donor }, { withCredentials: true })
            .then(res => {
                navigate('/project/' + pid)
            })
            .catch(error => {
                console.log(error)
            });

    }, [donation])

    return { donation, setDonation }
}