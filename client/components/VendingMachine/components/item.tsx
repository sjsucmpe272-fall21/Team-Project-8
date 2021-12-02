import React from 'react';
import { Card, CardTitle, CardText, Button } from 'reactstrap';

import { VendingTypes } from '../../../../shared/VendingTypes';
import { selectItem, removeItem } from '../actions';

import './item.scss';

interface Props {
  item: VendingTypes.Item;
}

export  class Item extends React.Component<Props> {
  render () {
    const { id, name, price, count } = this.props.item

    return (
      <Card className="text-center item-card">
        <CardTitle>{ name }</CardTitle>
        <CardText>Price: <b>€{ price }</b></CardText>
        { ! count && <Button onClick={() => selectItem(id) }>Select</Button> }
        { count && (
          <div>
            <CardText>Count: { count }</CardText>
            <Button onClick={ () => removeItem(id) }>Remove</Button>
          </div>
        )}
      </Card>
    )
  }
}