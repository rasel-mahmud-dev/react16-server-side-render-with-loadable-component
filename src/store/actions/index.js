import "isomorphic-fetch";

// Actions Types
export const FETCH_NEWS_REQUEST = "FETCH_NEWS_REQUEST";
export const FETCH_NEWS_SUCCESS = "FETCH_NEWS_SUCCESS";
export const FETCH_NEWS_FAILURE = "FETCH_NEWS_FAILURE";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";


const receivedNews = (news)=> ({type: FETCH_NEWS_SUCCESS, payload: news})
const receivedUsers = (users)=> ({type: FETCH_USERS_SUCCESS, payload: users})


export const fetchNews = () => (dispatch, getState) => {
  return fetch("http://localhost:3000/api/news")
    .then(response => response.json())
    .then(news => dispatch(receivedNews(news)))
    // .catch(err => dispatch(newsError(err)));
};


export const fetchUsers = () => (dispatch, getState) => {
  return fetch("http://localhost:3000/api/users")
    .then(response => response.json())
    .then(news => dispatch(receivedUsers(news)))
    // .catch(err => dispatch(newsError(err)));
};