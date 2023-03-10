import { createBoard } from "../../../store/boardsReducer";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
export default function BoardForm(){
    const dispatch = useDispatch()

    const [title, setTitle] = useState('')
    let board = {
        title: '',
        secret: false,
        userId: ''
    }
    const [secret, setSecret] = useState(false)
    const sessionUser = useSelector(state => state.session.user);

    const userId = sessionUser.id

    function handleSubmit() {
        let newBoard = {...board, title, secret, userId }
        dispatch(createBoard(newBoard))
    }

    return (
        <div className='board-create-modal'>
            <div className="create-board-header-wrapper">
                <h1 className="create-board-header">Create board</h1>
            </div>
            <form className="create-board-form" onSubmit={handleSubmit}>
                <div>
            <label className='board-create-label'>Name</label>
                <input 
                    type="text"
                    className='board-create-title'
                    placeholder={`Like "Places to go" or "Recipes to Make"`}
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}/>
            </div>
            <div className="create-board-footer">
                <button className="create-board-button-submit">Create</button>
            </div>
            </form>
        </div>
    )
}