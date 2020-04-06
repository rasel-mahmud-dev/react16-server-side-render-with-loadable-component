import { combineReducers } from 'redux'

import { 
  FETCH_NEWS_SUCCESS,  
  FETCH_USERS_SUCCESS
} from '../actions'


// Reducers
export default combineReducers({
  news: newsReducer,
  users: usersReducer,
})


function newsReducer(state = [], action) {
  switch (action.type) {
    case FETCH_NEWS_SUCCESS:
      return [...state, ...action.payload ];

    default:
      return state;
  }
}

function usersReducer(state = [], action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return [ ...state, ...action.payload ];

    default:
      return state;
  }
}
