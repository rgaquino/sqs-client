import { GET_CONN_CONFIG, SET_CONN_CONFIG } from '../actions/types';

const initialState = {
  connection: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CONN_CONFIG:
      return {
        connection: action.payload,
      };
    case SET_CONN_CONFIG:
      return {};
    default:
      return state;
  }
}
