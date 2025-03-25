import { createContext, useState } from 'react';
import useProjects from '../Hooks/useProjects';
import useDonations from '../Hooks/useDonations';
import useProject from '../Hooks/useProject';

const Data = createContext();


export const DataProvider = ({ children }) => {

    const [projectID, setProjectID] = useState(null);

    const { projects, dispatchProjects } = useProjects();
    const { donations, dispatchDonations } = useDonations();
    const { project, dispatchProject } = useProject({ projectID });

    return (
        <Data.Provider value={{
            projects, dispatchProjects,
            donations, dispatchDonations,
            project, dispatchProject,
            projectID, setProjectID
        }}>
            {children}
        </Data.Provider>
    );
}

export default Data;