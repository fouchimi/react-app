import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App, { Bookshelves } from './App';
import registerServiceWorker from './registerServiceWorker';
import {
    BrowserRouter as Router,
    Route
} from "react-router-dom";


ReactDOM.render(
    <Router>
        <div>
            <App />
            <Route path="/bookshelves" component={Bookshelves} />
        </div>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
