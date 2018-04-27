import React, { Component } from 'react';
import { fetchBooks, addBook } from './redux/actions';
import { store } from './redux/store';
import { baseURL, apiKey, localhostURL} from './constants';
import { Book } from './Book';
import { Link } from "react-router-dom";

import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    CardSubtitle
} from 'reactstrap';

const SearchBar = (props) => (
    <div className="mainContainer">
        <InputGroup>
            <Input placeholder="Search book here ..." onChange={props.onChanged} onKeyPress={props.onEnterPressed} />
            <InputGroupAddon addonType="append">
                <Button color="primary" onClick={props.onSearched}>Search</Button>
            </InputGroupAddon>
        </InputGroup>
    </div>
);

export class Home extends Component {

    constructor() {
        super();
        this.state = {
            bookName: "",
            books: [],
            available: false
        }
    }

    updateInput(e) {
        this.setState({
            bookName: e.target.value,
        });
    }
    search(e) {
        this.setState({bookName: e.target.value});
        if(e.key === 'Enter') {
            console.log(this.state.bookName);
            this._fetchBooks();
        }
    }

    _fetchBooks() {
        if(this.state.bookName !== '') {
            console.log('I am here');
            this.state.bookName = this.state.bookName.trim().replace(/ /g, '+');
            const url = baseURL + '/volumes' + '?q=' + this.state.bookName + '&apiKey=' + apiKey;
            store.dispatch(fetchBooks(url))
              .then(result => {
                  const allBooks = result.payload;
                  allBooks.map(book => {
                      let title = book.volumeInfo.title;
                      let description = book.volumeInfo.description;
                      if (title != undefined && title.length > 30) {
                          book.volumeInfo.title = title.substr(0, 30);
                      }
                      if (description !== undefined && description.length > 100) {
                          book.volumeInfo.description = description.substr(0, 100);
                      }
                  });
                  this.setState({ books: allBooks });
            });
        }
    }

    addBook(book) {
        let currentBook = JSON.stringify(book);
        store.dispatch(addBook(currentBook))
         .then(() => {
             let newList = this.state.books.filter((b) =>  b.id !== book.id);
             this.setState({books: newList});
         }); 
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="cold-xs-10 col-sm-8">
                            <SearchBar
                                onEnterPressed={(event) => this.search(event)}
                                onChanged={(event) => this.updateInput(event)}
                                onSearched={() => this._fetchBooks()} />
                        </div>
                        <div className="cold-xs-10 col-sm-4" className="viewbookshelves">
                             <Link to='/bookshelves'>view bookshelves</Link>
                        </div>   
                    </div> 
                </div>

                <div className="list">
                    {this.state.books.map((book, index) => <Book book={book} key={index} onAddBook={() => this.addBook(book)} />)}
                </div> 
            </div>
        );
    }
}