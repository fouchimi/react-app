import React, { Component } from 'react';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';

export class PopUpModal extends Component {

    render() {
        return (
            <div>
                <Modal isOpen={this.props.show} toggle={this.props.onToggle}>
                    <ModalHeader toggle={this.props.onToggle}>Confirm Deletion</ModalHeader>
                    <ModalBody>
                      Are you sure you want to delete this book ?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.props.onRemove}>Delete</Button>
                        <Button color="secondary" onClick={this.props.onToggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}