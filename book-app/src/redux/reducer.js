import { combineReducers } from 'redux';

import { ADD_BOOK, REQUEST_BOOKS, RECEIVE_BOOKS, BOOK_REQUEST_FAILED, DELETE_BOOK } from './actions';

const merge = (prev, next) => next;

const bookReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_BOOK: 
            return [...state, action.payload];
        case REQUEST_BOOKS:    
        case RECEIVE_BOOKS:
            return action.payload;
        case BOOK_REQUEST_FAILED:
            return merge(state, { bookErr: action.payload });
        case DELETE_BOOK:
            return action;    
        default:
            return state;
    }
}


const reducer = combineReducers({
    books: bookReducer,
});

export default reducer;