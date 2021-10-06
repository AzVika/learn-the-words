import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './App';

import 'antd/dist/antd.css';
import './index.css';

import FirebaseContext from './context/firebaseContext';
import Firebase from './services/firebase';

ReactDom.render(
    
    <FirebaseContext.Provider value={new Firebase()}>
        <BrowserRouter> 
            <App />
        </BrowserRouter>
    </FirebaseContext.Provider>, document.getElementById('root'));