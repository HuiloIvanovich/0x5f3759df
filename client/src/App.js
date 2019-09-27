import React from 'react';
import connect from '@vkontakte/vk-connect';
import { Root, View, Panel } from '@vkontakte/vkui';

import { PanelHeader, HeaderButton } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

import { Group, List, Cell, Gallery, Header, Link, Div } from '@vkontakte/vkui';
import { FormLayout, FormLayoutGroup, Input, RangeSlider, Checkbox, Button }from '@vkontakte/vkui';

import TravelPreview from './components/TravelPreview';
import PopularView from './views/popular.jsx';

import '@vkontakte/vkui/dist/vkui.css';


class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			popular: {
				activeView: 'popular',
				activePanel: 'popular__home'
			},
			fetchedUser: null
		};
	}

	componentDidMount() {
		connect.subscribe((e) => {
			switch (e.detail.type) {
				case 'VKWebAppGetUserInfoResult':
					this.setState({ fetchedUser: e.detail.data });
					break;
				default:
					console.log(e.detail.type);
			}
		});
		connect.send('VKWebAppGetUserInfo', {});
	}

	go = (viewName, panelName) => {
		let prev = this.state[viewName];
		this.setState({ [viewName]: { ...prev, activePanel: panelName }});//this.state.[[viewName]] : panelName} });
	};

	render() {
		// <View activePanel={this.state.activePanel}>
		// 	<Home id="home" fetchedUser={this.state.fetchedUser} go={this.go} />
		// 	<Persik id="persik" go={this.go} />
		// </View>
		return (
			<PopularView />
		);
	}
}

export default App;
