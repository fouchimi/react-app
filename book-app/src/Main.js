import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import { Header } from './Header';
import { Home } from './Home';
import { Bookshelves } from './Bookshelves';


export const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component = { Home } />
            <Route path='/bookshelves' component = { Bookshelves } />
        </Switch>
    </main>
);
