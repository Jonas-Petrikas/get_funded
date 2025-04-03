import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Auth from "../Contexts/Auth";
import useAllProjects from '../Hooks/useAllProjects';


export default function Admin() {

    const { user } = useContext(Auth);
    const navigate = useNavigate();
    const { allProjects, setAllprojects } = useAllProjects()

    console.log(allProjects);

    useEffect(_ => {
        if (!user || user.role !== 'admin') {
            navigate("/login");
        }
    }, [])
    return (


        <>
            <Link to='/'>Back to homepage</Link>
            <h1>Admin</h1>
            {allProjects.db.map(project =>
                <div>
                    {/* <img src={project.image}></img> */}
                    <div>{project.id}</div>
                    <div>{project.title}</div>
                    <div>{project.content}</div>
                    <div> <strong>Status:</strong> <span>{project.status}</span></div>


                </div>
            )}

        </>
    )
}