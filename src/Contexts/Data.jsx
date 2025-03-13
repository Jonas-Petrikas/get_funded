import { createContext } from 'react';
import useProjects from '../Hooks/useProjects';
import useDonations from '../Hooks/useDonations';

const Data = createContext();


export const DataProvider = ({ children }) => {

    const { projects, dispatchProjects } = useProjects();
    const { donations, dispatchDonations } = useDonations();

    return (
        <Data.Provider value={{
            projects, dispatchProjects,
            donations, dispatchDonations
        }}>
            {children}
        </Data.Provider>
    );
}

export default Data;