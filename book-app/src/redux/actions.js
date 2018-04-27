import {localhostURL} from '../constants';

// action types
export const ADD_BOOK = 'ADD_BOOK';
export const REQUEST_BOOKS = 'REQUEST_BOOKS';
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
export const BOOK_REQUEST_FAILED = 'BOOK_REQUEST_FAILED';
export const DELETE_BOOK = 'DELETE_BOOK';

//action creators
export const addedBook = (update) => ({
    type: ADD_BOOK,
    payload: update
});

export function requestBooks(val) {
    return {
        type: REQUEST_BOOKS,
        payload: val
    }
}

export function receiveBooks(data) {
    return {
        type: RECEIVE_BOOKS,
        payload: data
    }
}

export function bookRequestFailed(err) {
    return {
        type: BOOK_REQUEST_FAILED,
        payload: err
    }
}

export function deleteBook(update) {
    return {
        type: DELETE_BOOK,
        payload: update
    }
}

// async action creator
export function fetchBooks(url) {
    return function(dispatch) {
        return fetch(url)
            .then(
                response => response.json(),
                error => error
            )
            .then(resp => dispatch(receiveBooks(resp.items))
            );
    }
}

export function addBook(book) {
    return function(dispatch){
        return fetch(localhostURL + '/bookshelves', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: book
        }).then((resp) => {console.log(resp)})
        .catch(err => console.error(err));
    }
}

export function fetchBookshelves(url) {
    return function(dispatch) {
        return fetch(url)
        .then((response) => response.json())
        .catch(err => console.log(err));
    }
}

export function removeBook(id) {
    return function(dispatch) {
        return fetch(localhostURL + '/bookshelves/'+ id, {
            method: 'DELETE',
            headers: {'content-type': 'application/json'}
        }).then((resp) => dispatch(deleteBook(resp)));

    }
}