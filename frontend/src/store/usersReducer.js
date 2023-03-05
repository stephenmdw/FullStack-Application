import { csrfFetch } from "./csrf";

const RECEIVE_USER = 'users/RECEIVE_USER'
const REMOVE_USER = 'users/REMOVE_USER'

export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    payload: user
});

export const removeUser = (userId) => ({
    type: REMOVE_USER,
    userId
});

export const getUser = (userId) => (state) => {
    return state.users ? state.users[userId] : null
}

export const fetchUser = (user) => async dispatch => {
    let res = await fetch(`users/${user.id}`)

    if(res.ok) {
        let fetchedUser = res.json()
        dispatch(receiveUser(fetchedUser))
    }
}

// export const loginUser = (user) => async (dispatch) => {
//     let res = await csrfFetch('/api/session', {
//         method: "POST",
//         body: JSON.stringify(user)
//     });

//     let data = await res.json();
//     sessionStorage.setItem("currentUser", JSON.stringify(data.user))
//     dispatch(receiveUser(data.user))
// }

// export const logoutUser = (userId) => async (dispatch) => {
//     let res = await csrfFetch('/api/session',{
//         method: "DELETE"
//     })

//     // let data = await res.json()
//     sessionStorage.removeItem("currentUser")
//     dispatch(removeUser(userId)) //removes from redux global state
// }

export const signupUser = user => async dispatch => {
    let res = await csrfFetch('/api/users',{
        method: "POST",
        body: JSON.stringify(user)
    });
    let data = await res.json();
    sessionStorage.setItem("currentUser", JSON.stringify(data.user))
    dispatch(receiveUser(data.user))
}


const usersReducer = (state = {}, action) => {
    const nextState = {...state};
    switch (action.type) {
        case RECEIVE_USER:
            nextState[action.payload.id] = action.payload
            return nextState
        case REMOVE_USER:
            delete nextState[action.userId]
            return nextState
        default:
            return state;
    }
};

export default usersReducer