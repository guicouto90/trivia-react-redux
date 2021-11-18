import { GET_QUESTIONS_SUCCESS, GET_QUESTIONS,
  GET_QUESTIONS_FAIL, GET_TOKEN_SUCCESS,
  CHANGE_DISABLED, SET_PLAYER, SET_SCORE,
} from '../actions/actionType';
import { setLocalStorage } from '../../services/localStoreService';

const INITIAL_STATE = {
  isLoading: true,
  erro: null,
  questions: '',
  token: '',
  disabledButton: false,
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, isLoading: true };

  case GET_QUESTIONS_SUCCESS:
    return { ...state, questions: action.payload, isLoading: false };

  case GET_QUESTIONS_FAIL:
    return { ...state,
      isLoading: false,
      erro: 'Problema para carregar as perguntas',
    };

  case GET_TOKEN_SUCCESS:
    return { ...state,
      token: action.payload };

  case CHANGE_DISABLED:
    return { ...state,
      disabledButton: action.payload };

  case SET_PLAYER:
    setLocalStorage('state', { player: { ...state.player, ...action.payload } });
    return { ...state, player: { ...state.player, ...action.payload } };

  case SET_SCORE:
    setLocalStorage('state', { player: {
      ...state.player,
      score: state.player.score + action.payload.score,
      assertions: state.player.assertions + action.payload.assertions,
    } });
    console.log(action.payload);
    return { ...state,
      player: {
        ...state.player,
        score: state.player.score + action.payload.score,
        assertions: state.player.assertions + action.payload.assertions,
      } };

  default:
    return state;
  }
};

export default game;
