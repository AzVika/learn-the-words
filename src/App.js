import React, { Component } from 'react';
import { Layout, Menu, Spin } from 'antd';

import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { PrivateRoute } from './utils/privateRoute';

import s from './App.module.scss';
import FirebaseContext from './context/firebaseContext';

import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import CurrentCard from './pages/CurrentCard';

const { Header, Content } = Layout;

class App extends Component {

    state = {
        user: null,
    }

    componentDidMount() {
        const { auth, setUserUid } = this.context;

        auth.onAuthStateChanged(user => {
            if (user) {
                setUserUid(user.uid);
                localStorage.setItem('user', JSON.stringify(user.uid));
                this.setState({
                    user,
                });
            } else {
                setUserUid(null);
                localStorage.removeItem('user');
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
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route render={(props) => {
                        // const { history: { push } } = props;

                        return (
                            <Layout>
                                <Header>
                                    <Menu theme="dark" mode="horizontal">
                                        <Menu.Item key="1">
                                            <Link to="/">Home</Link>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Link to="/about">About</Link>
                                        </Menu.Item>
                                        {/* <Menu.Item key="3" onClick={() => push('/contact')}>Contact</Menu.Item> */}
                                    </Menu>
                                </Header>
                                <Content>
                                    <Switch>
                                        <PrivateRoute path="/" exact component={HomePage} />
                                        <PrivateRoute path="/home/:id?/:isDone?" component={HomePage} />
                                        <PrivateRoute path="/word/:id?" component={CurrentCard} />
                                        {/* <PrivateRoute path="/about" render={() => <h1>Немного о себе...</h1>} />
                                        <PrivateRoute path="/contact" render={() => <h1>Мои контакты...</h1>} /> */}
                                        <Redirect to="/" />
                                    </Switch>
                                </Content>
                            </Layout>
                        )
                }} />
                </Switch>
            </>
        )
    }
}

App.contextType = FirebaseContext;

export default App;