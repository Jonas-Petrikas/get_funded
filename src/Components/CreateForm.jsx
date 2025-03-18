// import { NavLink } from 'react-router';

export default function CreateForm() {
    return (
        <>
            <div className='create-form'>

                <input name="title" type="text" placeholder='Project Title' />
                <textarea name="content" id="" placeholder='Project description'></textarea>
                <input name="amount_goal" type="number" placeholder='Goal amount' />
                <input name='image' type="file" />
                <button>continue</button>


            </div>

        </>



    )
}