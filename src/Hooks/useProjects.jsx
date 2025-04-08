import { useReducer, useEffect, useContext, useState } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import projectsReducer from '../Reducers/projectsReducer';
import Data from '../Contexts/Data';

export default function useProjects() {
    const [projects, dispatchProjects] = useReducer(projectsReducer, null);
    const [needUpdate, setNeedUpdate] = useState(0)
    useEffect(_ => {
        axios.get(C.SERVER_URL + 'projects/confirmed-list')
            .then(res => {

                dispatchProjects({
                    type: A.LOAD_CONFIRMED_PROJECTS_FROM_SERVER, // tipas ka daryt
                    payload: res.data.db, // payloadas su kuo tai daryt

                });

            })
            .catch(error => {
                console.log(error)
            });

    }, [])

    useEffect(_ => {

        if (setNeedUpdate === 0) {
            return;
        }
        axios.get(C.SERVER_URL + 'projects/confirmed-list')
            .then(res => {

                dispatchProjects({
                    type: A.LOAD_CONFIRMED_PROJECTS_FROM_SERVER, // tipas ka daryt
                    payload: res.data.db, // payloadas su kuo tai daryt

                });
            })
            .catch(error => {
                console.log(error)
            });
        console.log('pasileido use projects su NeedUpdate', projects)

        setNeedUpdate(0);

    }, [needUpdate])


    return { projects, dispatchProjects, needUpdate, setNeedUpdate }
}