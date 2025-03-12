import { useReducer, useEffect } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import projectsReducer from '../Reducers/projectsReducer';

export default function useProjects() {
    const [projects, dispatchProjects] = useReducer(projectsReducer, null);

    useEffect(_ => {
        axios.get(C.SERVER_URL + 'projects/confirmed-list')
            .then(res => {
                console.log(res.data.db);
            })
            .catch(error => {
                console.log(error)
            });

    }, [])

    return { projects, dispatchProjects }
}