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
    const { project, dispatchProject, setStoreProject } = useProject({ projectID });
    const { projectDonations, dispatchProjectDonations } = useProjectDonations({ projectID, donationsAmount });
    const { donation, setDonation } = useMakeDonations({ projectID });

    return (
        <Data.Provider value={{
            projects, dispatchProjects,
            // allProjects, setAllprojects,
            donations, dispatchDonations,
            project, dispatchProject, setStoreProject,
            projectID, setProjectID,
            projectDonations, dispatchProjectDonations,
            donationsAmount, setDonationsAmount,
            donation, setDonation
        }}>
            {children}
        </Data.Provider>
    );
}

export default Data;