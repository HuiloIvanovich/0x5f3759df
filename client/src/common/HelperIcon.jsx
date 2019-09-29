import React from 'react';
import { Div } from '@vkontakte/vkui';

export default function HelperIcon(props) {
  let styles = {outer: {backgroundColor: '#0ff',
                        width: '35vw',
                        height: '35vw',
                        margin: '7.5vw',
                        padding: 0,
                        borderRadius: '14px'},
                img: {display: 'block',
                      margin: 'auto',
                      marginTop: '5vw',
                      width: '50%', height: '50%'},
                describe: {margin: 'auto',
                           textAlign: 'center'}};
  return <Div style={styles.outer} onClick={props.clickHandler}>
    <img style={styles.img} src={props.src} />
    <Div style={styles.describe}>{props.name[0].toUpperCase()+props.name.slice(1, props.name.length).toLowerCase()}</Div>
  </Div>
}
