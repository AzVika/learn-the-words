import React, { Component } from 'react';
import Card from '../Card';
import { Spin, Input } from 'antd';

import FirebaseContext from '../../context/firebaseContext';

import getTraslateWord from '../../services/dictionary';

import s from './CardList.module.scss';

const { Search } = Input;


class CardList extends Component {

    state = {
        wordsArr: [],
        value: '',
        label: '',
        isBusy: false,
    }

    componentDidMount() {
        const { getUserCardRef } = this.context;

        getUserCardRef().on('value', res => {
            console.log(3);
            if(res.val() !== null) {
                this.setState({
                    wordsArr: res.val(),
                });
            }
                    
            console.log(res.val());
        });
    }

    handleDeletedItem = (id) => {
        const { wordsArr } = this.state;
        const { getUserCardRef } = this.context;
        const newWorsdArr = wordsArr.filter(item => item.id !== id);

        getUserCardRef().set(newWorsdArr);
        console.log('delete word');
    }

    getTheWord = async () => {

        const { value } = this.state;

        try {
            const getWord = await getTraslateWord(value);

            console.log(getWord);

            this.setState({
                label: `${value} - ${getWord.translate}`,
                value: '',
                isBusy: false,
            });
            if(getWord.message) {
                console.log(getWord.message);
            } else {
                this.setNewWord(value, getWord.translate);
            }
        } catch(error) {
            console.log(error);
        }

        
    }

    handleInputChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    handeSubmitForm = async () => {
        this.setState({
            isBusy: true,
        }, this.getTheWord);
    }

    setNewWord = (wordEng, wordRus) => {
        console.log(wordEng, wordRus);
        const { wordsArr } = this.state;
        const { getUserCardRef } = this.context;

        const filterWord = wordsArr.filter(item => item.eng === wordEng);
        if(filterWord.length < 1) {
            getUserCardRef().set([...wordsArr, {
                id: +new Date(),
                eng: wordEng,
                rus: wordRus,
            }]);
            
            console.log('word added');
        }
    }


    render() {
        const { wordsArr, value, label, isBusy } = this.state;

        return (
            <>
                <div>{label}</div>
                <form className={s.form}>
                    <Search
                        placeholder="?????????????? ?????????? ???? ????????????????????"
                        allowClear
                        enterButton="Search"
                        size="large"
                        value={value}
                        loading={isBusy}
                        onChange={this.handleInputChange}
                        onSearch={this.handeSubmitForm}
                        // ref={inputRef}
                    />
                </form>
                {
                    (wordsArr === null || wordsArr.length === 0)
                        ? <Spin />
                        : <div className={s.root}>
                            {
                                wordsArr.map(({ eng, rus, id }) => (
                                    <Card
                                        key={id}
                                        eng={eng}
                                        rus={rus}
                                        index={id}
                                        onDeleted={this.handleDeletedItem}
                                    />
                                ))
                            }
                        </div>
                }
                
            </>
        );
    }
}

CardList.contextType = FirebaseContext;

export default CardList;
