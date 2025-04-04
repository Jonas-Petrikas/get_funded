import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import Auth from "../Contexts/Auth";
import useAllProjects from '../Hooks/useAllProjects';
import useAdminChange from "../Hooks/useAdminChange";


export default function Admin() {

    const { user } = useContext(Auth);
    const navigate = useNavigate();
    const { allProjects, setAllprojects } = useAllProjects();
    const { updatedProjects, setUpdatedProjects } = useAdminChange();
    const deletions = useRef([]);
    const changed = useRef([]);



    useEffect(_ => {
        if (!user || user.role !== 'admin') {
            navigate("/login");
        }
    }, [])

    const deleteProject = pid => {
        const newProjects = allProjects.db.filter(project => project.id !== pid);
        setAllprojects(ap => ({ ...ap, db: newProjects }));
        deletions.current.push(pid)
    }

    const approve = pid => {

        const updProjects = allProjects.db.map(project =>
            project.id === pid ? { ...project, status: 'approved' } : project
        );

        setAllprojects(ap => ({
            ...ap,
            db: updProjects
        }));

        changed.current.push(pid);
        console.log(changed)

    }
    const disapprove = pid => {
        const updProjects = allProjects.db.map(project =>
            project.id === pid ? { ...project, status: 'disapproved' } : project
        );

        setAllprojects(ap => ({
            ...ap,
            db: updProjects
        }));
        changed.current.push(pid);
    }

    const submit = _ => {
        console.log('submitting', allProjects);
        console.log('deletions', deletions, 'changes', changed);
        const newProjects = { projects: allProjects.db, delete: deletions.current, changes: changed.current }

        setUpdatedProjects(newProjects);
        deletions.current = [];
        changed.current = [];


    }

    return (


        <div className='admin bin'>
            <h1>Admin dashboard</h1>
            <Link to='/'>Back to homepage</Link>
            <div className="admin-projects-list">
                {allProjects === null ? <div>Loading...</div> :
                    allProjects.db.map(project =>
                        <div className="admin-projects-list-project" key={project.id} >
                            <div className="admin-projects-list-project-image"><img src={project.image}></img></div>
                            <div className="admin-projects-list-project-id"> <strong>ID:</strong> {project.id}</div>
                            <div className="admin-projects-list-project-user-id"> <strong>user ID:</strong> {project.user_id}</div>
                            <div className="admin-projects-list-project-title"><strong>Title:</strong> {project.title}</div>
                            <div className="admin-projects-list-project-content">{project.content}</div>
                            <div className="admin-projects-list-project-progress"><strong>Progress:</strong> {project.amount_collected} / {project.amount_goal} </div>

                            <div className="admin-projects-list-project-status"> <strong>Status:</strong> <span>{project.status}</span>
                                {project.status === 'to_review' || project.status === 'disapproved' ? <button className="admin-projects-list-project-status-btn approve" onClick={_ => approve(project.id)}>👍 Approve</button> : project.status === 'done' ? '' : <button className="admin-projects-list-project-status-btn disapprove" onClick={_ => disapprove(project.id)}>👎 Disapprove</button>}
                            </div>
                            <div className="admin-projects-list-project-status"><button onClick={_ => deleteProject(project.id)}>❌ delete</button></div>



                        </div>
                    )
                }
            </div>
            <div className="save-changes-btn"><button onClick={submit}>☝️ Save changes</button>
            </div>

        </div>
    )
}