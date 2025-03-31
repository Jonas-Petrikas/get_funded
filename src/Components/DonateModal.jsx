import { useContext, useState } from "react";
import Auth from "../Contexts/Auth";


export default function DonateModal({ showDonateModal }) {
    const { user } = useContext(Auth);

    const [userName, setUserName] = useState(user.name);
    const [donationAmount, setDonationAmount] = useState(0);


    const handleInput = e => {
        if (e.target.name === 'userName') {
            setUserName(e.target.value);
        } else {
            setDonationAmount(e.target.value);
        }



    }

    console.log(user);


    return (
        <div className="donate-modal">
            <div className="donate-modal-bg" onClick={showDonateModal}></div>


            <div className="donate-modal-card">
                <div className="donate-modal-card-close" onClick={showDonateModal}>X</div>
                <div className="donate-modal-card-title">
                    <h2>Donate to the project</h2>
                </div>
                <div className="donate-modal-card-description">
                    <p>Write amount and the name of the donor to donate</p>

                </div>
                <div className="donate-modal-card-inputs">
                    <div className="donate-modal-card-inputs-amount">
                        <p>AMOUNT:</p>
                        <input type="number" name='donationAmount' onChange={handleInput} value={donationAmount} />
                    </div>
                    <div className="donate-modal-card-inputs-name">
                        <p>DONOR:</p>
                        <input type="text" name='userName' onChange={handleInput} value={userName} />
                    </div>

                </div>
                <button>DONATE</button>
            </div>

        </div>
    )
}