const createStore = require("redux").createStore;
const thunk = require("redux-thunk").default;
const axios = require("axios");
const applyMiddleware = require("redux").applyMiddleware;

//CREATING INITIAL STATE
const initialState = {
  user: [],
  loading: false,
  error: "",
};

//CREATING REDUX ACTION
const FETCH_DATA = "FETCH DATA";
const FETCH_DATA_SUCCESS = "FETCH DATA SUCCESS";
const FETCH_DATA_FAILURE = "FETCH DATA FAILURE";

//CREATING CREATE ACTION FUNC (PREFERRED)
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

//CREATING REDUCER WITH initialState AS DEFAULT STATE VALUE
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

//CREATING ACTION THAT RETURNS FUNCTION FOR ASYNCHRONOUS ACTION (USING REACT-THUNK)
const fetchDataAsync = () => (dispatch) => {
  console.log("called");
  dispatch(fetchData());
  axios
    .get(`https://jsonplaceholder.typicode.com/users`)
    .then((res) => dispatch(fetchDataSuccess(res.data)))
    .catch((err) => dispatch(fetchDataFailure(err.message)));
};

//CREATE STORE
const store = createStore(reducer, applyMiddleware(thunk));

//SUBSCRIBE TO LISTER STATE CHANGE
store.subscribe(() => {
  console.log(store.getState());
});

//DISPATCHING AN ACTION
store.dispatch(fetchDataAsync());
