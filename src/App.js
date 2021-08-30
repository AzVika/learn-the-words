import React from 'react';

import { ClockCircleOutlined, HomeOutlined, SmileOutlined } from '@ant-design/icons';

import BackgroundBlock from './components/BackgroundBlock';
import Button from './components/Button';
import CardList from './components/CardList';
import Footer from './components/Footer';
import Header from './components/Header';
import Paragraph from './components/Paragraph';
import Section from './components/Section';

import { wordsList } from './wordsList';

import firstBackground from './assets/background.jpg';
import secondBackground from './assets/back2.jpg';

import s from './App.module.scss';


function App() {
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

                <CardList 
                    items={wordsList}
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

export default App;