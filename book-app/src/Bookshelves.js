import React, { Component } from 'react';
import { store } from './redux/store';
import { localhostURL } from './constants';
import { fetchBookshelves, removeBook } from './redux/actions';
import { Book } from './Book';
import { PopUpModal } from './PopUpModal';

export class Bookshelves extends Component {

    state = {
        books: [],
        bookTitle: '',
        show : false,
        selectedBook: {}
    }

    componentDidMount(){
        const url = localhostURL + '/bookshelves';
        store.dispatch(fetchBookshelves(url))
          .then(p => Promise.resolve(p)
            .then(bookshelves => {
                this.setState({books: bookshelves})
            }));
        
    }

    delete(book){
        this.toggle();
        this.setState({selectedBook: book});
    }

    toggle() {
        this.setState({
            show: !this.state.show
        });
    }

    remove(book) {
        this.toggle();
        const response = store.dispatch(removeBook(book.id));
        Promise.resolve(response).then(r => {
            if(r.payload.status === 200) {
                this.state.books = this.state.books.filter(b => b.id !== book.id);
                this.setState({books: this.state.books});
                console.log("Book deleted successfully");
            }
        });
          
    }

    render() {
        return(
            <div>
                { this.state.show ?
                    (<PopUpModal onToggle={() => this.toggle()} title={this.state.bookTitle} show={this.state.show} 
                    onRemove={() => this.remove(this.state.selectedBook)} />) :
                    null
                }
                <div className="list">
                    {this.state.books.map((book, index) => <Book book={book} key={index} onDelete={() => this.delete(book)} />)}
                </div> 
            </div>
        );
    }
}