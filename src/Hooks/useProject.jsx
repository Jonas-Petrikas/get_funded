import { useReducer, useEffect, useState } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import projectReducer from '../Reducers/projectReducer';

export default function useProject({ projectID }) {
    const [project, dispatchProject] = useReducer(projectReducer, null);



    useEffect(_ => {
        axios.get(C.SERVER_URL + 'project/' + projectID)
            .then(res => {
                dispatchProject({
                    type: A.LOAD_SINGLE_PROJECT_FROM_SERVER, // tipas ka daryt
                    payload: res.data.project // payloadas su kuo tai daryt
                });
            })
            .catch(error => {
                console.log(error)
            });
    }, [projectID])

    return { project, dispatchProject }
}