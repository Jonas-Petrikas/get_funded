import '../Components-style/ProjectItem.scss';
import ProgressBar from './ProgressBar';
import * as C from '../../Constants/main.js';
import { NavLink } from 'react-router';


export default function ProjectItem({ id, title, fullAmount, collectedAmount, image }) {
    return (


        <NavLink to={'../project/' + id} end>
            <div className='project-item-card'>

                <div className='project-card-image-holder'>
                    <img className='project-card-image' src={image} alt="" />
                    <div className="project-card-title-holder">
                        <h2 className='project-title'>
                            {title}
                        </h2>
                    </div>

                </div>


                <p><span>Goal: </span><span>{fullAmount.toString().slice(-9, -6) + ' ' + fullAmount.toString().slice(-6, -3) + ' ' + fullAmount.toString().slice(-3)}</span> Eur</p>
                <ProgressBar fullAmount={fullAmount} collectedAmount={collectedAmount} />
                <p className='amount-raised'><span>{collectedAmount.toString().slice(-9, -6) + ' ' + collectedAmount.toString().slice(-6, -3) + ' ' + collectedAmount.toString().slice(-3)}</span> Eur <span>raised</span></p>
                <button>Learn more</button>
            </div>
        </NavLink>
    )
};