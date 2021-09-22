import React, { Component } from 'react';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';

import { fire } from './services/firebase';

import FirebaseContext from './context/firebaseContext';

import { Spin } from 'antd';

import s from './App.module.scss';

class App extends Component {

    state = {
        user: null,
    }

    componentDidMount() {
        console.log(this.context);
        const { auth, setUserUid } = this.context;

        auth.onAuthStateChanged(user => {
            if (user) {
                setUserUid(user.uid);
                this.setState({
                    user,
                });
            } else {
                setUserUid(null);
                this.setState({
                    user: false,
                });
            }
        });
    }

    render() {
        const { user } = this.state;

        if (user === null) {
            <div className={s.loader_wrap}>
                <Spin size="large" />
            </div>
        }

        return (
            <>
                {user ? <HomePage user={user} /> : <LoginPage />}
            </>
        )
    }
}

App.contextType = FirebaseContext;

export default App;