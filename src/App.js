import React, { Component } from 'react';

import { ClockCircleOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons';
import { Input } from 'antd';

import BackgroundBlock from './components/BackgroundBlock';
import Button from './components/Button';
import CardList from './components/CardList';
import Footer from './components/Footer';
import Header from './components/Header';
import Paragraph from './components/Paragraph';
import Section from './components/Section';

import getTraslateWord from './services/dictionary';
import database from './services/firebase';

import firstBackground from './assets/background.jpg';
import secondBackground from './assets/back2.jpg';

import s from './App.module.scss';

const { Search } = Input;

class App extends Component {

  state = {
    wordsArr: [],
    value: '',
    label: '',
    isBusy: false,
  }

  inputRef = React.createRef();

  handleDeletedItem = (id) => {
    this.setState( ({ wordsArr }) => {
      const idx = wordsArr.findIndex(item => item.id === id);
      const newWordArr = [
        ...wordsArr.slice(0, idx),
        ...wordsArr.slice(idx + 1)
      ]
      return {
        wordsArr: newWordArr
      }
    });
  }

  handleInputChange = (e) => {
    this.setState({
        value: e.target.value,
    });
  }

  getTheWord = async () => {
    
    const { value } = this.state;
    const getWord = await getTraslateWord(value);
    
    console.log(getWord);

    this.setState({
        label: `${value} - ${getWord.translate}`,
        value: '',
        isBusy: false,
    });
  }

  handeSubmitForm = async () => {
      this.setState({
          isBusy: true,
      }, this.getTheWord);
  }

  componentDidMount() {
    database.ref('/cards').once('value').then(res => {
        this.setState({
            wordsArr: res.val(),
        });
    });
  }

  setNewWord = () => {
      const { wordsArr } = this.state;
      database.ref('/cards').set([...wordsArr, {
          id: +new Date(),
          eng: 'mouse',
          rus: 'мышь',
      }]);
  }

  render() {
    const { value, label, isBusy, wordsArr } = this.state;

    return (
      <>
          <BackgroundBlock
              backgroundImg={firstBackground}
              fullHeight
          >
              <Header white>
                  Время учить слова онлайн
              </Header>
              <Paragraph white>
                  Используйте карточки для запоминания и пополняйте активный словарный запас.
              </Paragraph>
              <Button 
                onClick={() => {
                  console.log(this.inputRef.current);
                  this.inputRef.current.focus();
                }}
              >
                Начать беспланый урок
              </Button>
          </BackgroundBlock>
          <Section className={s.textCenter}>
              <Header size="l">
                  Мы создали уроки, чтобы помочь вам увереннее разговаривать на английском языке
              </Header>
              <div className={s.motivation}>
                  <div className={s.motivationBlock}>
                      <div className={s.icons}>
                          <ClockCircleOutlined /> 
                      </div>
                      <Paragraph small>
                          Учитесь, когда есть свободная минутка
                      </Paragraph>
                  </div>

                  <div className={s.motivationBlock}>
                      <div className={s.icons}>
                          <HomeOutlined />
                      </div>
                      <Paragraph small>
                          Откуда угодно — дома, в&nbsp;офисе, в&nbsp;кафе
                      </Paragraph>
                  </div>

                  <div className={s.motivationBlock}>
                      <div className={s.icons}>
                          <SmileOutlined />
                      </div>
                      <Paragraph small>
                          Разговоры по-английски без&nbsp;неловких пауз и&nbsp;«mmm,&nbsp;how&nbsp;to&nbsp;say…»
                      </Paragraph>
                  </div>
              </div>
          </Section>
          <Section bgColor="#f0f0f0" className={s.textCenter}>
              <Header size='l'>
                  Начать учить английский просто
              </Header>
              <Paragraph>
                  Клика по карточкам и узнавай новые слова, быстро и легко!
              </Paragraph>

              <div>{label}</div>
              <form className={s.form}>
                <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="Search"
                    size="large"
                    value={value}
                    loading={isBusy}
                    onChange={this.handleInputChange}
                    onSearch={this.handeSubmitForm}
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

              <CardList 
                  items={wordsArr}
                  onDeletedItem={this.handleDeletedItem}
              />
          </Section>
          <BackgroundBlock
              backgroundImg={secondBackground}
          >
              <Header size="l" white>
                  Изучайте английский с персональным сайтом помощником
              </Header>
              <Paragraph white>
                  Начните прямо сейчас
              </Paragraph>
              <Button>
                  Начать бесплатный урок
              </Button>
          </BackgroundBlock>
          <Footer/>
      </>
  );
  }
}

export default App;