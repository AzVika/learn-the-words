import React from 'react';
import Card from '../../components/Card';

import FirebaseContext from '../../context/firebaseContext';

// import Firebase from '../../services/firebase';

import { Typography, Spin } from 'antd';

import s from './CurrentCard.module.scss';

const { Title } = Typography;

class CurrentCard extends React.PureComponent {
    
    state = {
        word: {
            id: 0,
            eng: '',
            rus: '',
        }
    }

    componentDidMount() {

        const { match: { params } } = this.props;
        const { getUserCurrentCardRef } = this.context;
        if(params.id) {
            getUserCurrentCardRef(params.id).once('value').then(res => {
                this.setState({
                    word: res.val(),
                });
            });
        }
    }

    render() {
        const { word } = this.state;

        if(word === null || word.eng === '' || word.rus === '') {
            return <div className={s.root}>
                <Spin />
            </div>
        }

        const { eng, rus } = word;
        
        return (
            <div className={s.root}>
                <Title>
                    This is out Current Card - { eng }
                </Title>
                <Card eng={eng} rus={rus} />
            </div>
        )
    }
}

CurrentCard.contextType = FirebaseContext;

export default CurrentCard;
