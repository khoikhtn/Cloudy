const initialState = {
    name : '-',
    image: '-',
    email: '-',
    password: '-',
    currentAccount: '-'
  }
  
  const UserReducer = (state = initialState, action) => {
      switch(action.type){
        case 'UPDATEDNAME': 
          return {
                ...state,
                name : action.nameUser
          }
        case 'UPDATEDEMAIL': 
          return {
                ...state,
                email : action.emailUser
          }
        case 'UPDATEDIMAGE': 
          return {
                ...state,
                image : action.imageUser
          }
        case 'UPDATEDPASSWORD': 
          return {
                ...state,
                password : action.passUser
          }
        case 'UPDATEDCURRENTACCOUNT': 
          return {
                ...state,
                currentAccount : action.account
          }
          default:
            return state
      } 
  }
  
  export default UserReducer;