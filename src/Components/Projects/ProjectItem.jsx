import '../Components-style/ProjectItem.scss';
import ProgressBar from './ProgressBar';
import * as C from '../../Constants/main.js';
import { NavLink } from 'react-router';
import useProject from '../../Hooks/useProject.jsx';
import DonateModal from '../DonateModal.jsx';
import { useState } from 'react';


export default function ProjectItem({ id, title, fullAmount, collectedAmount, image }) {
    const [donateModal, setDonateModal] = useState(false);
    const showDonateModal = () => setDonateModal(!donateModal);
    return (
        <>


            <div className='project-item-card'>

                <div className='project-card-image-holder'>
                    <NavLink to={'../project/' + id} end>
                        <img className='project-card-image' src={image} alt="" />
                        <div className="project-card-title-holder">
                            <h2 className='project-title'>
                                {title}
                            </h2>

                        </div>
                    </NavLink>

                </div>


                <p><span>Goal: </span><span>{fullAmount.toString().slice(-9, -6) + ' ' + fullAmount.toString().slice(-6, -3) + ' ' + fullAmount.toString().slice(-3)}</span> Eur</p>
                <ProgressBar fullAmount={fullAmount} collectedAmount={collectedAmount} />
                <p className='amount-raised'><span>{collectedAmount.toString().slice(-9, -6) + ' ' + collectedAmount.toString().slice(-6, -3) + ' ' + collectedAmount.toString().slice(-3)}</span> Eur <span>raised</span></p>

                <div className="buttons">
                    <NavLink to={'../project/' + id} end><button>Learn more</button></NavLink>
                    <button className='donate-btn' onClick={showDonateModal}>Donate</button>
                </div>

            </div>

            {
                donateModal &&
                <DonateModal showDonateModal={showDonateModal} pid={id} />
            }
        </>

    )
};