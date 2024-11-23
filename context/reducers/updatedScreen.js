import subject from "../../constants/subject"

const initialState = {
    screenList : [subject[0], subject[1], subject[2], subject[3], subject[4], subject[5]],
  }
  
  const ScreenReducer = (state = initialState, action) => {
      switch(action.type){
        case 'UPDATEDSCREEN': 
            return {
              ...state,
              screenList : state.screenList.concat(action.screen)
            }
        case 'DELETEPACKSCREEN': {
          return {
            ...state,
            screenList : state.screenList.filter((x) => x !== action.screen)
          }
        }
          default:
            return state
      } 
  }
  
  export default ScreenReducer;