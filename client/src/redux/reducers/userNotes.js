const initialState = {
    query : "" 
}

export const searchNoteReducer = (state = initialState.query,action) =>{
    switch (action.type) {
        case "USER_NOTES": {
            return {
                query : action.payload
            }
        }
            
        default: return state
    }
}