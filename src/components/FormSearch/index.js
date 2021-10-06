import React, { Component } from 'react';

import { Input } from 'antd';

import FirebaseContext from '../../context/firebaseContext';

import getTraslateWord from '../../services/dictionary';

import s from './FormSearch.module.scss';

const { Search } = Input;

const inputRef = React.createRef();

class FormSearch extends Component {

    state = {
        wordsArr: [],
        value: '',
        label: 'sfsdfsdfsdfs',
        isBusy: false,
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

        const { value, label, isBusy } = this.state;
        
        return (
            <>
                <div>{label}</div>
                <form className={s.form}>
                    <Search
                        placeholder="введите слово на английском"
                        allowClear
                        enterButton="Search"
                        size="large"
                        value={value}
                        loading={isBusy}
                        onChange={this.handleInputChange}
                        onSearch={this.handeSubmitForm}
                        ref={inputRef}
                    />
                </form>
                {/* <form 
                    className={s.form}
                    onSubmit={this.handeSubmitForm}
                >
                    <input 
                        ref={this.inputRef}
                        type="text"
                        value={this.state.value}
                        onChange={this.handleImputChange}
                    />
                    <button>
                        Add new word
                    </button>
                  </form> */}
            </>
        )
    }
}

FormSearch.context = FirebaseContext;

export default FormSearch;
