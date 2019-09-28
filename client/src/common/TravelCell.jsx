import React from 'react';
import { Div } from '@vkontakte/vkui';

export default class CreateTravelCell extends React.Component{


  openTravelHandler = (e) => {
    console.log("open clicked");
    this.props.clickHandler(e);
  }

  render() {
    let styles = {outer: {width:'90vw',
                           height: '10vh',
                           background: 'url(https://photo.hotellook.com/static/cities/390x120/LED.jpg)',
                           backgroundSize: 'cover',
                           position: 'relative',
                           borderRadius: '8px',
                           margin: '10px auto'
                          },
                  link: {verticalAlign: 'middle',
                         display: 'inline-flex'
                        },
                  shadow: {background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))',
                           position: 'absolute',
                           width: '100%',
                           height:'100%',
                           padding: 0,
                           left: 0,
                           top: 0,
                           overflow: 'hidden',
                           borderRadius: '8px'
                          },
                  text: {padding: 0,
                         margin: 0,
                         color: 'white',
                         filter: 'brightness(1.0)'}};
    console.log(this.props.data);

    return(
      <Div style={styles.outer} onClick={this.openTravelHandler}>
        <Div style={styles.shadow}></Div>

        <Div style={styles.text}>{this.props.data.city.iata},{this.props.data.country.iata}</Div>
        <Div style={styles.text}>{this.props.data.dateFrom}-{this.props.data.dateTo}</Div>
        <Div style={styles.text}>Cost:{this.props.data.cost}></Div>
        <Div style={Object.assign({float: 'right'},styles.text)}>friends: ooo</Div>
      </Div>
    )
  }
}
