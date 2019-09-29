import React from 'react';
import { Div } from '@vkontakte/vkui';
import Plane from './icons/IconPlane.png';


export default class FlightPreview extends React.Component{
  constructor(props){
    super(props);
  }


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
    let from = this.props.from;
    let to = this.props.to;
    return(
      <Div style={styles.outer} onClick={this.openTravelHandler}>
        <Div style={Object.assign({}, styles.shevrons, styles.leftShevron)}>
          <img style={styles.img} src={Plane} />
        </Div>
        <Div style={Object.assign({}, styles.shevrons, styles.rightShevron)}>
          <table style={{width: '100%', height: '100%', align: 'center'}}>
            <tr>
            <td>{from.city}, {from.country}</td>
            <td></td>
            <td>{to.city}, {to.country}</td>
            </tr>
            <tr>
              <td>{from.iata}</td>
              <td></td>
              <td>{to.iata}</td>
            </tr>
            <tr>
              <td>{this.props.price} руб.</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{from.date}</td>
              <td></td>
              <td>{to.date}</td>
            </tr>
          </table>
        </Div>
      </Div>
    );
  }
}
