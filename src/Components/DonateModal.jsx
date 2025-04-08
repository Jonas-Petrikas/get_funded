import { useContext, useEffect, useState } from "react";
import Auth from "../Contexts/Auth";
// import { Link } from "react-router";
// import useMakeDonations from "../Hooks/useMakeDonation";
import Data from "../Contexts/Data";


export default function DonateModal({ showDonateModal, pid }) {
    const { user } = useContext(Auth);

    const { setDonation, setUpdateProjectDonations } = useContext(Data);
    const [donorName, setDonorName] = useState(user.name);
    const [donationAmount, setDonationAmount] = useState(1);

    const [warningMessage, setWarningMessage] = useState('');


    const handleInput = e => {
        if (e.target.name === 'userName') {
            setDonorName(e.target.value);
        } else {
            if (e.target.value < 1) {
                setWarningMessage('Amount should be higher than 1!')
                setTimeout(_ => {
                    setWarningMessage('')
                }, 2000)
            } else {
                setDonationAmount(e.target.value);
            }


        }
    }

    const makeDonation = _ => {
        console.log('donation from', donorName, 'with the amount: ', donationAmount, 'to project', pid)
        setDonation({
            amount: donationAmount,
            donor: donorName,
            project_id: pid
        });
        showDonateModal();
        setUpdateProjectDonations(1);


    }


    return (
        <div className="donate-modal">
            <div className="donate-modal-bg" onClick={showDonateModal}></div>


            <div className="donate-modal-card">
                <div className="donate-modal-card-close" onClick={showDonateModal}>X</div>
                <div className="donate-modal-card-title">
                    <h2>Donate to the project #{pid}</h2>
                </div>
                <div className="donate-modal-card-description">
                    <p>Write amount and name of the donor to donate below</p>
                </div>

                {
                    warningMessage ? <div className="donate-modal-card-warning-message"> {warningMessage}</div> : ''
                }

                <div className="donate-modal-card-inputs">
                    <div className="donate-modal-card-inputs-amount">
                        <p>AMOUNT (Eur):</p>
                        <input type="number" name='donationAmount' onChange={handleInput} value={donationAmount} />
                    </div>
                    <div className="donate-modal-card-inputs-name">
                        <p>DONOR NAME:</p>
                        <input type="text" name='userName' onChange={handleInput} value={donorName} />
                    </div>

                </div>
                <button onClick={makeDonation}>DONATE</button>
            </div>

        </div>
    )
}