import {
  GET_QUEUES,
  DELETE_QUEUE,
} from '../actions/types';

const initialState = {
  queues: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUEUES:
      return {
        queues: action.payload,
      };
    case DELETE_QUEUE:
      // TODO: implement this
      return state;
    default:
      return state;
  }
}
