import React from 'react';
import connect from '@vkontakte/vk-connect';
import { Div, Cell } from '@vkontakte/vkui';


export default function(props) {
  return(
    <Div style={{display: 'inline-flex', backgroundColor: props.col, padding: 0}}>
      <Div style={{width: "60%"}}>
        <img style={{height: "100%"}} src={props.pic} />
      </Div>
      <Div>
        <Cell description={props.country}>{props.city}</Cell>
        <Cell>{props.date.from} - {props.date.to}</Cell>
        <Cell>{props.price}</Cell>
      </Div>
    </Div>
  );
}
