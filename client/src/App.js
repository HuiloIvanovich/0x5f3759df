import React from 'react';
import { connect as reduxConnect } from "react-redux";
import { changeStoryAction } from './redux/actions';

import connect from '@vkontakte/vk-connect';
import { Root, View, Panel } from '@vkontakte/vkui';
import { PanelHeader, HeaderButton } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import '@vkontakte/vkui/dist/vkui.css';
//import { Group, List, Cell, Gallery, Header, Link, Div } from '@vkontakte/vkui';
//import { FormLayout, FormLayoutGroup, Input, RangeSlider, Checkbox, Button }from '@vkontakte/vkui';
import { Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import Icon24Newsfeed from '@vkontakte/icons/dist/24/newsfeed';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';
import Icon24UserOutline from '@vkontakte/icons/dist/24/user_outline';

// import TravelPreview from './components/TravelPreview';
import { Link } from '@vkontakte/vkui';
// import PopularView from './views/Popular.jsx';
// import MyTravel from './views/MyTravel.jsx';




class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
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
		//let prev = this.state[viewName];
		//this.setState({ [viewName]: { ...prev, activePanel: panelName }});//this.state.[[viewName]] : panelName} });
	};

	onStoryChange = (e) => {
		console.log("click story " + e.currentTarget.dataset.story);
		this.props.dispatch(changeStoryAction({newStoryName: e.currentTarget.dataset.story }));
	}

	render() {
		return (
			<Epic activeStory={this.props.activeStory} tabbar={
	        <Tabbar>
	          <TabbarItem
	            onClick={this.onStoryChange}
	            selected={this.props.activeStory === 'popular'}
	            data-story="popular"
	          ><Icon24Newsfeed /></TabbarItem>
						<TabbarItem
	            onClick={this.onStoryChange}
	            selected={this.props.activeStory === 'myTravel'}
	            data-story="myTravel"
	          ><Icon24Globe /></TabbarItem>
						<TabbarItem
	            onClick={this.onStoryChange}
	            selected={this.props.activeStory === 'myTravels'}
	            data-story="myTravels"
	          ><Icon24LikeOutline /></TabbarItem>
						<TabbarItem
	            onClick={this.onStoryChange}
	            selected={this.props.activeStory === 'Profile'}
	            data-story="Profile"
	          ><Icon24UserOutline /></TabbarItem>
					</Tabbar>
				}>
				<View id="popular" activePanel={'popular__home'}>
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
				<View id="myTravel" activePanel={'myTravel__home'}>
			    <Panel id="myTravel__home">
						<PanelHeader left={<HeaderButton>
																<Icon24Back onClick={()=>{ this.go('popular', 'popular__home') }}/>
															</HeaderButton>}>
							Моё путешествие
						</PanelHeader>
						У вас пока ни одного путешествия
					</Panel>
			  </View>
				<View id="myTravels" activePanel={'myTravels__home'}>
			    <Panel id="myTravels__home">
						<PanelHeader left={<HeaderButton>
																<Icon24Back onClick={()=>{ this.go('popular', 'popular__home') }}/>
															</HeaderButton>}>
							Мои путешествия
						</PanelHeader>
						Тут будет лист путешествий
					</Panel>
			  </View>
				<View id="Profile" activePanel={'Profile__home'}>
			    <Panel id="Profile__home">
						<PanelHeader left={<HeaderButton>
																<Icon24Back onClick={()=>{ this.go('popular', 'popular__home') }}/>
															</HeaderButton>}>
							Мой профиль
						</PanelHeader>
						Тут будет профиль
					</Panel>
			  </View>
			</Epic>
		);
	}
}


const mapStateToProps = function(state) {
	console.log('st', state.activeStoryReducer);
  let epicState = state.activeStoryReducer.activeStory;
  return {
    activeStory: epicState
  }
}

export default reduxConnect(
  mapStateToProps
)(App);
