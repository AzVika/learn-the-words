import React, { Component } from 'react';
import { Layout, Form, Input, Button } from 'antd';

import { fire } from '../../services/firebase';

import FirebaseContext from '../../context/firebaseContext';

import s from './Login.module.scss';

const { Content } = Layout;

class LoginPage extends Component {

    onFinish = ({ email, password }) => {
        const { signWithEmail } = this.context;
        signWithEmail(email, password)
            .then(res => {
                console.log(res)
            });
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    renderForm = () => {
        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 18 },
        }

        const tailLayout = {
            wrapperCol: { offset: 6, span: 18 },
        }

        return (
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        )
    }

    render() {



        return (
            <Layout>
                <Content>
                    <div className={s.root}>
                        <div className={s.form_wrap}>
                            {this.renderForm()}
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}

LoginPage.contextType = FirebaseContext;

export default LoginPage;
