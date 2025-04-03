import { useEffect, useState } from 'react';
import * as C from '../Constants/main';
import axios from 'axios';


export default function useProjects() {
    const [allProjects, setAllprojects] = useState(null);


    useEffect(_ => {

        axios.get(C.SERVER_URL + 'projects/all')
            .then(res => {
                setAllprojects(res.data);
                console.log(allProjects);
            })
            .catch(error => {
                console.log(error)
            });

    }, [])

    return { allProjects, setAllprojects }
}