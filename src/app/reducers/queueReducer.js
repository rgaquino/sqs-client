import {
  GET_QUEUES,
  GET_QUEUE,
} from '../actions/types';

const initialState = {
  queues: [],   // list of all queues
  queue: null,  // current queue being viewed
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUEUES:
      return {
        queues: action.payload,
        queue: state.queue,
      };
    case GET_QUEUE:
      return {
        queue: action.payload,
        queues: state.queues,
      };
    default:
      return state;
  }
}
