import * as actions from "./actions"

const initialState = {
  queryType: 'none',
  personArray: []
}

const rootReducer = (state = initialState, action) => {
  if (action.type === actions.UPDATE_QUERY_TYPE) {
    return {
      ...state,
      queryType: action.queryType
    }
  }
  if (action.type === actions.INITIALIZE_PERSON_ARRAY) {
    return {
      ...state,
      personArray: action.zombieArray
    }
  }
  if (action.type === actions.UPDATE_PERSON_ARRAY) {
    return {
      ...state,
      personArray: action.personArray
    }
  }
  return state;
}

export default rootReducer;