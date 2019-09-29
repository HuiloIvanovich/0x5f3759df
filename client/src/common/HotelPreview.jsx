import React from 'react';
import { Div } from '@vkontakte/vkui';
import Hotel from './icons/IconHotel.png';


export default class HotelPreview extends React.Component{
  render(){
    let styles={outer:{width:'90vw',
                       height: '15vh',
                       margin: '15px',
                       position: 'relative',
                       borderRadius: '14px',
                       margin: '10px auto',
                       border: "1px solid black",
                       overflow: 'hidden',
                       padding: 0
                },
                shevrons:{
                  height: '100%',
                  left: 0, top: 0,
                  padding: 0,
                  margin: 0
                },
                leftShevron: {display: 'flex',
                              alignItems: 'center',
                              width: '15%',
                              position: 'absolute',
                              },
                rightShevron: {position: 'relative',
                               width: '85%',
                               float: 'right'},
                img: {width: '100%',
                      verticalAlign: 'middle',
                      left: 0, top: 0}};

    return(
      <Div style={styles.outer}>
        <Div style={Object.assign({}, styles.shevrons, styles.leftShevron)}>
          <img style={styles.img} src={Hotel} />
        </Div>
        <Div style={Object.assign({}, styles.shevrons, styles.rightShevron)}>
          <p>{this.props.name}</p>
          <p>{this.props.city}, {this.props.country}</p>
          <p>{parseInt(this.props.price)}, {this.props.stars}*</p>
        </Div>
      </Div>
    );
  }
}
