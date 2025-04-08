// import { NavLink } from 'react-router';

import { useContext, useEffect, useState } from "react"
import useImage from "../Hooks/useImage";
import Data from "../Contexts/Data";
import Auth from "../Contexts/Auth";
import { useNavigate } from "react-router";

export default function CreateForm() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [amountGoal, setAmountGoal] = useState('');
    const { image, readFile } = useImage();
    const { setStoreProject, storeProject, setFrontProjects, setNeedUpdate } = useContext(Data);
    const { user } = useContext(Auth);


    const navigate = useNavigate();




    const handleInput = e => {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        } else if (e.target.name === 'content') {
            setContent(e.target.value);
        } else if (e.target.name === 'amount_goal') {
            setAmountGoal(e.target.value);
        }
    }

    const submit = _ => {
        const newProject = {
            title,
            content,
            amountGoal,
            image,
            status: user.role !== 'admin' ? 'to_review' : 'approved'
        };
        console.log(image)
        setStoreProject(newProject);
        setFrontProjects(newProject);
        // setNeedUpdate(1);
    }

    useEffect(_ => {
        if (!user || user.role === 'guest') {
            navigate("/login");
        }


    }, [])

    return (

        <>
            <div className='create-form'>

                <input className="title" name="title" type="text" onChange={handleInput} placeholder='Project Title' value={title} />
                <textarea name="content" id="" onChange={handleInput} placeholder='Project description' value={content}></textarea>

                {/* //add validation */}<input name="amount_goal" type="number" onChange={handleInput} placeholder='Goal amount' value={amountGoal} />
                <input id='image' type="file" onChange={e => readFile(e)} />
                <div className="project-image">
                    <label className="add" htmlFor={'image'}>+ Add image</label>
                    <div className="image-holder">
                        {
                            image ? <img src={image.src} alt="post picture" /> : 'no-image'
                        }
                    </div>

                </div>

                <button onClick={submit}>SUBMIT</button>


            </div>

        </>



    )
}