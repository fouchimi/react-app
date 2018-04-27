import React, { Component } from "react";

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

export class Book extends Component {
    
    constructor(props) {
        super(props);
    }
    

    render(){
        const imageUrl = this.props.book.volumeInfo.imageLinks;
        return (
            <div className="bookContainer">
                <div className="book-card">
                    <Card>
                        {
                            imageUrl !== undefined ?
                                (<CardImg top width="100%" src={this.props.book.volumeInfo.imageLinks.thumbnail} alt="Card image cap" />)
                                :
                                (<CardImg top width="100%" src="" alt="Card image cap" />)
                        }
                        <CardBody>
                            <CardTitle>{this.props.book.volumeInfo.title}</CardTitle>
                            <CardSubtitle>{this.props.book.volumeInfo.subtitle}</CardSubtitle>
                            <CardText>{this.props.book.volumeInfo.description}</CardText>
                            {
                                window.location.href.indexOf('bookshelves') !== -1 ? 
                                    (<Button color="danger" onClick={this.props.onDelete}>Delete Book</Button>):
                                    (
                                        <Button color="primary" onClick={this.props.onAddBook}>Add Book</Button>
                                    )
                            }
                            
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}