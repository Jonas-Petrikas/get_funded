import { createContext } from 'react';
import useProjects from '../Hooks/useProjects';

const Data = createContext();


export const DataProvider = ({ children }) => {

    const { projects, dispatchProjects } = useProjects();

    return (
        <Data.Provider value={{
            projects, dispatchProjects
        }}>
            {children}
        </Data.Provider>
    );
}

export default Data;