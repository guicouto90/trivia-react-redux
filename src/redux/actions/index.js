import { getQuestionsFetch, getToken } from '../../services/Api';
import { GET_LOGIN, GET_QUESTIONS, GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAIL, GET_TOKEN, GET_TOKEN_SUCCESS,
  GET_TOKEN_FAIL, CHANGE_DISABLED, SET_PLAYER,
  SET_SCORE, RESET_SCORE } from './actionType';

export const getLogin = (payload) => ({
  type: GET_LOGIN, payload,
});

const getQuestions = () => ({
  type: GET_QUESTIONS,
});

const getQuestionsSuccess = (payload) => ({
  type: GET_QUESTIONS_SUCCESS, payload,
});

const getQuestionsFail = () => ({
  type: GET_QUESTIONS_FAIL,
});

const loadToken = () => ({
  type: GET_TOKEN,
});

const getTokenSuccess = (payload) => ({
  type: GET_TOKEN_SUCCESS, payload,
});

const getTokenFail = () => ({
  type: GET_TOKEN_FAIL,
});

export const changeDisabled = (payload) => ({
  type: CHANGE_DISABLED, payload,
});

export const setPlayer = (payload) => ({
  type: SET_PLAYER,
  payload,
});

export const setPoints = (payload) => ({
  type: SET_SCORE,
  payload,
});

export const resetScore = () => ({
  type: RESET_SCORE,
});

export const fetchTokenThunk = () => (dispatch) => {
  dispatch(loadToken());
  return getToken()
    .then(
      ({ token }) => dispatch(getTokenSuccess(token)),
      () => dispatch(getTokenFail()),
    );
};

export const fetchQuestionsThunk = () => (dispatch) => {
  dispatch(getQuestions());
  return getQuestionsFetch()
    .then(
      ({ results }) => dispatch(getQuestionsSuccess(results)),
      () => dispatch(getQuestionsFail()),
    );
};
