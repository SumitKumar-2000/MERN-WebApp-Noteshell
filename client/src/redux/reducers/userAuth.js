const identityName = () =>{
    const userInfo  = JSON.parse(localStorage.getItem("userInfo"))
    if(userInfo !== null){
        return userInfo.name;
    }
    return "user"
}

const initialState = {
    loginedUserName : identityName(),
}

export const userReducer = (state=initialState,action) => {
    switch (action.type) {
        case "LOGINED_USER" : {
            return{
                loginedUserName : action.payload.name
            }
        }

        default: return state;
    }
}