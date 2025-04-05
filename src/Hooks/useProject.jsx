import { useReducer, useEffect, useState, useContext } from 'react';
import * as C from '../Constants/main';
import * as A from '../Constants/actions';
import axios from 'axios';
import projectReducer from '../Reducers/projectReducer';
import { useNavigate } from 'react-router';


export default function useProject({ projectID }) {
    const [project, dispatchProject] = useReducer(projectReducer, null);
    const [storeProject, setStoreProject] = useState(null);

    const navigate = useNavigate();



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


    useEffect(_ => {

        if (null === storeProject) {
            return;
        }

        axios.post(C.SERVER_URL + 'project/new', storeProject, { withCredentials: true })
            .then(res => {
                setTimeout(_ => {
                    navigate('/project/' + res.data.result.insertId)
                }, 200)
            })
            .catch(error => {
                console.log(error)
            })

    }, [storeProject]);

    return { project, dispatchProject, setStoreProject }
}