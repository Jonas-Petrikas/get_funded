import { createContext, useState } from 'react';
import useProjects from '../Hooks/useProjects';
import useDonations from '../Hooks/useDonations';
import useProject from '../Hooks/useProject';
import useProjectDonations from '../Hooks/useProjectDonations';

const Data = createContext();


export const DataProvider = ({ children }) => {

    const [projectID, setProjectID] = useState(null);
    const [donationsAmount, setDonationsAmount] = useState(5);

    const { projects, dispatchProjects } = useProjects();
    const { donations, dispatchDonations } = useDonations();
    const { project, dispatchProject } = useProject({ projectID });
    const { projectDonations, dispatchProjectDonations } = useProjectDonations({ projectID, donationsAmount });


    return (
        <Data.Provider value={{
            projects, dispatchProjects,
            donations, dispatchDonations,
            project, dispatchProject,
            projectID, setProjectID,
            projectDonations, dispatchProjectDonations,
            donationsAmount, setDonationsAmount
        }}>
            {children}
        </Data.Provider>
    );
}

export default Data;