const createStore = require("redux").createStore;
const thunk = require("redux-thunk").default;
const axios = require("axios");
const applyMiddleware = require("redux").applyMiddleware;

const initialState = {
  user: [],
  loading: false,
  error: "",
};

const FETCH_DATA = "FETCH DATA";
const FETCH_DATA_SUCCESS = "FETCH DATA SUCCESS";
const FETCH_DATA_FAILURE = "FETCH DATA FAILURE";

const fetchData = () => {
  return {
    type: FETCH_DATA,
  };
};

const fetchDataSuccess = (users) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: users,
  };
};

const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        ...initialState,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...initialState,
        user: action.payload,
        loading: false,
      };
    case FETCH_DATA_FAILURE:
      return {
        ...initialState,
        loading: false,
        error: action.payload,
      };
  }
};

const fetchDataAsync = () => (dispatch) => {
  console.log("called");
  dispatch(fetchData());
  axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((res) => dispatch(fetchDataSuccess(res.data)))
    .catch((err) => dispatch(fetchDataFailure(err.message)));
};

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchDataAsync());
