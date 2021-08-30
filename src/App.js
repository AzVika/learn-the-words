import React, { Component } from 'react';

import { ClockCircleOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons';

import BackgroundBlock from './components/BackgroundBlock';
import Button from './components/Button';
import CardList from './components/CardList';
import Footer from './components/Footer';
import Header from './components/Header';
import Paragraph from './components/Paragraph';
import Section from './components/Section';

import firstBackground from './assets/background.jpg';
import secondBackground from './assets/back2.jpg';

import s from './App.module.scss';

const wordsList = [
  {
      id: '1',
      eng: 'between',
      rus: 'между'
  },
  {
      id: '2',
      eng: 'high',
      rus: 'высокий'
  },
  {
      id: '3',
      eng: 'really',
      rus: 'действительно'
  },
  {
      id: '4',
      eng: 'something',
      rus: 'что-нибудь'
  },
  {
      id: '5',
      eng: 'most',
      rus: 'большинство'
  },
  {
      id: '6',
      eng: 'another',
      rus: 'другой'
  },
  {
      id: '7',
      eng: 'much',
      rus: 'много'
  },
  {
      id: '8',
      eng: 'family',
      rus: 'семья'
  },
  {
      id: '9',
      eng: 'own',
      rus: 'личный'
  },
  {
      id: '10',
      eng: 'out',
      rus: 'из/вне'
  },
  {
      id: '11',
      eng: 'leave',
      rus: 'покидать'
  },
  {
      id: '12',
      eng: 'width',
      rus: 'широкий'
  },
];


class App extends Component {

  state = {
    wordArr: wordsList,
    value: '',
    label: ''
  }

  inputRef = React.createRef();

  handleDeletedItem = (id) => {
    this.setState( ({ wordArr }) => {
      const idx = wordArr.findIndex(item => item.id === id);
      const newWordArr = [
        ...wordArr.slice(0, idx),
        ...wordArr.slice(idx + 1)
      ]
      return {
        wordArr: newWordArr
      }
    });
  }

  handleImputChange = (e) => {
    this.setState({
        value: e.target.value
    })
    console.log(e.target.value);
  }

  handeSubmitForm = (e) => {
      e.preventDefault();
      this.setState( ({value}) => {
          return {
              label: value,
              value: ''
          }
      });
  }

  render() {
    const { wordArr } = this.state;

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

              <div>{this.state.label}</div>
              <form 
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
              </form>

              <CardList 
                  items={wordArr}
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