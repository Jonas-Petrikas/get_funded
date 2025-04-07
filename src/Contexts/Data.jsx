import { createContext, useState } from 'react';
import useProjects from '../Hooks/useProjects';
import useDonations from '../Hooks/useDonations';
import useProject from '../Hooks/useProject';
import useAllProjects from '../Hooks/useAllProjects';
import useProjectDonations from '../Hooks/useProjectDonations';
import useMakeDonations from '../Hooks/useMakeDonation';

const Data = createContext();


export const DataProvider = ({ children }) => {

    const [projectID, setProjectID] = useState(null);
    const [donationsAmount, setDonationsAmount] = useState(5);
    const { projects, dispatchProjects } = useProjects();
    // const { allProjects, setAllprojects } = useAllProjects()
    const { donations, dispatchDonations } = useDonations();
    const { project, dispatchProject, setStoreProject, newProjectID } = useProject({ projectID });
    const { projectDonations, dispatchProjectDonations } = useProjectDonations({ projectID, donationsAmount });
    const { donation, setDonation, newDonationAmount } = useMakeDonations({ projectID });
    const [frontProjects, setFrontProjects] = useState(null);

    return (
        <Data.Provider value={{
            projects, dispatchProjects,
            // allProjects, setAllprojects,
            donations, dispatchDonations,
            project, dispatchProject, setStoreProject, newProjectID,
            projectID, setProjectID,
            projectDonations, dispatchProjectDonations,
            donationsAmount, setDonationsAmount,
            donation, setDonation, newDonationAmount,
            frontProjects, setFrontProjects
        }}>
            {children}
        </Data.Provider>
    );
}

export default Data;