import React from 'react';
import { Div, Counter } from '@vkontakte/vkui';

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
                  text: {paddingTop: 4,
                         paddingBottom: 0,
                         margin: 0,
                         color: 'white',
                         filter: 'brightness(1.0)'}};
    let dateFrom = this.props.data.dateFrom.slice(0, 10).split('-');
    let dateTo = this.props.data.dateFrom.slice(0, 10).split('-');
    dateFrom = dateFrom[2] + '.' + dateFrom[1] + '.' + dateFrom[0].slice(0, 2);
    dateTo = dateTo[2] + '.' + dateTo[1] + '.' + dateTo[0].slice(0, 2);
    return(
      <Div style={styles.outer} onClick={this.openTravelHandler}>
        <Div style={styles.shadow}></Div>
        <Div style={styles.text}>Путешествие {this.props.data.name}</Div>
        <Div style={styles.text}>{this.props.data.flight.cityTo.name}, {this.props.data.flight.countryTo.name}</Div>
        <Div style={styles.text}>{dateFrom} - {dateTo}</Div>
        <Div style={styles.text}>{this.props.data.cost} руб.</Div>
        { this.props.data.users.length !== 1 &&
          <Div style={Object.assign({float: 'right', display: 'inline-flex'}, styles.text)}>
            friends<Counter style={{marginLeft: '5px'}}>{this.props.data.users.length-1}</Counter>
          </Div>
        }
      </Div>
    )
  }
}
