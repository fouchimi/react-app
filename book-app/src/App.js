import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  withRouter,
  Redirect
} from "react-router-dom";

import { InputGroup, InputGroupAddon, Input, Button, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

export const baseURL = 'https://www.googleapis.com/books/v1';
export const apiKey = 'AIzaSyDRWwNOZfk4Vpmd2-sQxFs1YK269ZjAJOQ';
export const localhostURL = 'http://localhost:3004';

const SearchBar = (props) => {
  return (
    <div className="mainContainer">
      <InputGroup>
        <Input placeholder="Search book here ..." onChange={props.onChanged} />
        <InputGroupAddon addonType="append">
          <Button color="primary" onClick={props.onSearched}>Search</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

const Book = props => {
  return (
    <div className="bookContainer">
      <div className="book-card">
        <Card>
          <CardImg top width="100%" src={props.book.volumeInfo.imageLinks.thumbnail} alt="Card image cap" />
          <CardBody>
            <CardTitle>{props.book.volumeInfo.title}</CardTitle>
            <CardSubtitle>{props.book.volumeInfo.subtitle}</CardSubtitle>
            <CardText>{props.book.volumeInfo.description}</CardText>
            <Button color="primary" onClick={props.onAddBook}>Add Book</Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export class Bookshelves extends Component {
  render() {
    return (
      <div>
        <span>Bookshelves Component</span>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      bookName: "",
      items: [],
    }
  }

  updateInput(event) {
    this.setState({
      bookName: event.target.value,
    })
  }

  addBook(book) {
    book = JSON.stringify(book);
    fetch(localhostURL + '/bookshelves', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: book
    }).then(() => {
      //reset state
      this.setState({
        bookName: "",
        items: [],
        isLoadingBookShelves: true
      });
      this.props.history.push('/bookshelves');
    }).catch(err => console.error(err));
  }

  fetchBooks() {
    this.state.bookName = this.state.bookName.trim().replace(/ /g, '+');
    const url = baseURL + '/volumes' + '?q=' + this.state.bookName + '&apiKey=' + apiKey;
    this._fetchBooks(url)
      .then(response => {
        response.items.forEach(item => {
          item.volumeInfo.title = item.volumeInfo.title.substr(0, 30);
          item.volumeInfo.description = item.volumeInfo.description.substr(0, 120);
          this.setState({
            items: response.items,
          })
        });
      });
  }

  async _fetchBooks(url) {
    try {
      const response = await fetch(url);
      const result = await response.json();
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div className="App">
        { !this.state.isLoadingBookShelves && 
            <div>
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">Welcome to my bookstore</h1>
              </header>
              <SearchBar
                onChanged={(event) => this.updateInput(event)}
                onSearched={() => this.fetchBooks()} />
              <div className="list">
                {this.state.items.map((book, index) => <Book book={book} key={index} onAddBook={() => this.addBook(book)} />)}
              </div>
            </div>
        }
      </div>
    );
  }
}

export default withRouter(App);
