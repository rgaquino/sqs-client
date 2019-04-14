const GET_ERRORS = 'GET_ERRORS';
const CLEAR_ERRORS = 'CLEAR_ERRORS';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
