const initialState = {
  favorList : [],
  customPackageList: []
}

const FavorReducer = (state = initialState, action) => {
    switch(action.type){
      case 'UPDATEDFAVOR': 
          return {
            ...state,
            favorList: state.favorList.concat(action.favor)
          }
      case 'DELETEDFAVOR': 
          return {
            ...state,
            favorList: state.favorList.filter((x) => x !== action.favor)
          }
      case 'ADDCUSTOMPACKAGE':
        return {
          ...state,
          customPackageList: state.customPackageList.concat(action.favor)
        }
      case 'CLEARCUSTOMPACKAGE':
        return {
          ...state,
          favorList: action.favor
        }
      case 'REMOVECUSTOMPACKAGE':
        return {
          ...state,
          customPackageList: state.favorList.filter((x) => x !== action.favor)
        }
      case 'UPDATEDCUSTOMITEM':
        return {
          ...state,
          customPackageList: action.item
        }
      case 'DELETECUSTOMITEM':
        return {
          ...state,
          customPackageList: action.item
        }
        default:
          return state
    } 
}

export default FavorReducer;