import React from 'react';
import { Root, View, Panel } from '@vkontakte/vkui';

import { PanelHeader, HeaderButton } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import { Group, List, Cell, Gallery, Header, Link, Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';


export default class MyTravel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
			popular: {
				activeView: 'myTravel',
				activePanel: 'myTravel__home'
			}
		};
  }

  go = (viewName, panelName) => {
		let prev = this.state[viewName];
		this.setState({ [viewName]: { ...prev, activePanel: panelName }});//this.state.[[viewName]] : panelName} });
	};

  render(){
    return (
      <Root activeView={this.state.popular.activeView}>
				<View id="myTravel" activePanel={this.state.popular.activePanel}>
			    <Panel id="myTravel__home">
						У вас пока ни одного путешествия
					</Panel>
			  </View>
			</Root>
    );
  }
}
