import React from 'react';
import { Div } from '@vkontakte/vkui';

export default class CreateTravelCell extends React.Component{


  openTravelHandler = (e) => {
    console.log("open clicked");
    this.props.clickHandler(e);
  }

  render() {
    let iata = this.props.data.flight.cityTo.iata;
    let styles = {outer: {width:'90vw',
                           height: '13vh',
                           background: `url(https://photo.hotellook.com/static/cities/320x150/${iata}.jpg)`,
                           backgroundSize: 'cover',
                           position: 'relative',
                           borderRadius: '14px',
                           margin: '10px auto'
                          },
                  link: {verticalAlign: 'middle',
                         display: 'inline-flex'
                        },
                  shadow: {background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4))',
                           position: 'absolute',
                           width: '100%',
                           height:'100%',
                           padding: 0,
                           left: 0,
                           top: 0,
                           overflow: 'hidden',
                           borderRadius: '14px'
                          },
                  text: {padding: 0,
                         margin: 0,
                         color: 'white',
                         filter: 'brightness(1.0)'}};
    console.log('data:', this.props.data);

    return(
      <Div style={styles.outer} onClick={this.openTravelHandler}>
        <Div style={styles.shadow}></Div>

        <Div style={styles.text}>{this.props.data.city},{this.props.data.country}</Div>
        <Div style={styles.text}>{this.props.data.dateFrom}-{this.props.data.dateTo}</Div>
        <Div style={styles.text}>Cost:{this.props.data.cost}></Div>
        <Div style={Object.assign({float: 'right'},styles.text)}>friends: ooo</Div>
      </Div>
    )
  }
}
