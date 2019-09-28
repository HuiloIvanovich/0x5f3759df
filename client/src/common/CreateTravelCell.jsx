import React from 'react';
import { Div, Link } from '@vkontakte/vkui';
import Icon24AddOutline from '@vkontakte/icons/dist/24/add_outline';


export default class CreateTravelCell extends React.Component{
  constructor(props){
    super(props);
  }

  createTravelHandler = (e) => {
    console.log('create pressed');
    this.props.clickHandler(e);
  }

  render() {
    let styles = { outer: {width:'90%',
                           height: '15%',
                           background: 'linear-gradient(to right, #4d7198, #68b)',
                           borderRadius: '8px',
                           margin: '10px auto'
                          },
                link: {verticalAlign: 'middle',
                       display: 'inline-flex'
                      },
                btn: {},
                text: {}};

    return(
      <Div style={styles.outer}>
        <Div style={styles.link} onClick={this.createTravelHandler}>
          <Icon24AddOutline/>
          <Div style={{padding: "5px 20px"}}>CreateTravelCell</Div>
        </Div>
      </Div>
    )
  }
}
