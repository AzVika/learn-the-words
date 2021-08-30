import React, { Component } from 'react';
import Card from '../Card';

import s from './CardList.module.scss';

class CardList extends Component {

    render() {
        const { items = [], onDeletedItem } = this.props;
        
        return (
            <>
                <div className={s.root}>
                    {
                        items.map(({ eng, rus, id }) => (
                            <Card
                                key={id}
                                eng={eng}
                                rus={rus}
                                onDeleted={() => onDeletedItem(id)}
                            />
                        ))
                    }
                </div>
            </>
        );
    }
}

export default CardList;
