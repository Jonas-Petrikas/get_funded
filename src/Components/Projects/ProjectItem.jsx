import '../Components-style/ProjectItem.scss';
import ProgressBar from './ProgressBar';
import { NavLink } from 'react-router';
import DonateModal from '../DonateModal.jsx';
import { useState } from 'react';


export default function ProjectItem({ id, title, fullAmount, collectedAmount, image, content }) {
    const [donateModal, setDonateModal] = useState(false);
    const showDonateModal = _ => setDonateModal(!donateModal);
    return (
        <>


            <div className='project-item-card'>
                <NavLink to={'../project/' + id} end>
                    <div className='project-card-image-holder'>

                        <img className='project-card-image' src={image} alt="" />
                        <div className="project-card-title-holder">
                            <h2 className='project-title'>
                                {title}
                            </h2>

                        </div>


                    </div>
                    <ProgressBar fullAmount={fullAmount} collectedAmount={collectedAmount} />
                    <div className='project-item-card-description'>
                        <p>{content.slice(0, 60)}...</p>
                    </div>
                </NavLink>




                <div className="buttons">
                    {
                        fullAmount <= collectedAmount ? '' :
                            <>
                                <NavLink to={'../project/' + id} end><button>Learn more</button></NavLink>
                                <button className='donate-btn' onClick={showDonateModal}>Donate</button>
                            </>
                    }
                </div>

                {fullAmount === collectedAmount ? <div className="finished">Collection Finished!</div> : ''}

            </div >


            {
                donateModal &&
                <DonateModal showDonateModal={showDonateModal} pid={id} />
            }
        </>

    )
};