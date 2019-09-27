import React from 'react';
import { Root, View, Panel } from '@vkontakte/vkui';

import { PanelHeader, HeaderButton } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import { Group, List, Cell, Gallery, Header, Link, Div } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';


export default class PopularView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
			popular: {
				activeView: 'popular',
				activePanel: 'popular__home'
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
				<View id="popular" activePanel={this.state.popular.activePanel}>
			    <Panel id="popular__home">
						<PanelHeader left={<HeaderButton><Icon24Cancel/></HeaderButton>}>Популярные путешествия</PanelHeader>
						<Link onClick={ () => { this.go('popular', 'popular__dayly'); }} >
							Go to travel of the day
						</Link>
						<br/>
						<Link onClick={ () => { this.go('popular', 'popular__list'); }}>
							Go to popular travels list
						</Link>
					</Panel>
					<Panel id="popular__dayly">
						<PanelHeader left={<HeaderButton>
																<Icon24Back onClick={()=>{ this.go('popular', 'popular__home') }}/>
															</HeaderButton>}>
							Путешествие дня
						</PanelHeader>
					</Panel>
					<Panel id="popular__list">
						<PanelHeader left={<HeaderButton>
																<Icon24Back onClick={()=>{ this.go('popular', 'popular__home') }}/>
															</HeaderButton>}>
							Популярные (список)
						</PanelHeader>
					</Panel>
			  </View>
			</Root>
    );
  }
}
