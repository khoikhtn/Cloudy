const initialState = {
    packList : []
  }
  
  const PackReducer = (state = initialState, action) => {
      switch(action.type){
        case 'UPDATEDADDPACK': 
              return {
                ...state,
                 packList: state.packList.concat(action.pack) 
              }
        case 'DELETEPACK':
          return {
            ...state,
            packList: state.packList.filter(x => x !== action.pack)
          }
          default:
            return state
      } 
  }
  
  export default PackReducer;