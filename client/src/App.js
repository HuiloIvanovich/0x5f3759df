import React from 'react';
import { connect as reduxConnect } from "react-redux";
import { changeStoryAction } from './redux/actions';

import connect from '@vkontakte/vk-connect';
import { View, Panel } from '@vkontakte/vkui';
import { PanelHeader, HeaderButton } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import '@vkontakte/vkui/dist/vkui.css';

import { Epic, Tabbar, TabbarItem } from '@vkontakte/vkui';
import Icon24Newsfeed from '@vkontakte/icons/dist/24/newsfeed';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';

import { Div, List, Button, Group } from '@vkontakte/vkui';
import { FormLayout, FormLayoutGroup, Input, Checkbox, RangeSlider } from '@vkontakte/vkui';

import TravelCell from './common/TravelCell.jsx';
import CreateTravelCell from './common/CreateTravelCell.jsx';
import HelperIcon from './common/HeaderIcon.jsx';

import api from './api.js';
const BASE_URL = 'http://95.213.39.142:5000/';
//'https://vk-hackathon.herokuapp.com/';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMTIzIn0sImlhdCI6MTU2OTYxMDIxNywiZXhwIjoxNTY5OTcwMjE3fQ.HFvdaNNdpZQhZaaFsXACBvlfydlMxlC-nNcKJgON2ZQ',
			actualTravelExists: null,
			actualTravel: null,
			fetchedUser: null,
			myTravel: {activePanel: 'myTravel__home'},
			choosenMyTravel: {},
			myTravels: [
			 	{ userID: "userID",
				  data: {
				    name: 'str',
				    cost: 'num',
				    dateFrom: 'dd-mm-yyyy',
				    dateTo: 'dd-mm-yyyy',
				    visa: 'str',
				    country: 'str',
				    city: 'str',
				    backgroundImg: 'https://pbs.twimg.com/media/D168StiW0AAi0d6.jpg'
				 	}
				}
			],
			createTravelFields: {
				name: '',
				costMin: 10,
				costMax: 200,
				dateFrom: '',
				dateTo: '',
				autocomplete: [],
				search: '',
				shengen: false
			},
			createTravel: {
				name: '',
				minCost: null,
				maxCost: null,
				dateFrom: null,
				dateTo: null,
				visa: false,
				country: null,
				city: null
			},
			popularTravels: [],
			dailyTravel: null
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

		//api('get', 'http://autocomplete.travelpayouts.com/places2?term=Сан&locale=ru&types[]=country', {}, {}, (r=> console.log(r)));

		api('get', BASE_URL+'api/users/auth',
				{ headers: {'Content-Type': 'application/json'},
					params:  { 'user_id': '123', 'params': '456' }},
				{},
				(res => {
					const token = res.data.token;
	        this.setState({ jwtToken: token }, () => {
						// Got jwt token
						let config = { headers: { 'x-auth-token': this.state.jwtToken } };
						// Get my travels
						api('get', BASE_URL+`api/travels/my`, config, {}, (res) => {
								let arr = [];
								for (let tr in res.data){
									arr.push(res.data[tr]);
									console.log('tr', res.data[tr]);
								}
				        // const travels = res.data;
				        this.setState({ myTravels: arr });
						});
						api('get', BASE_URL+`api/travels/popular`, {}, {}, (res) => {
							console.log("got popular travels: ", res.data);
							this.setState({popularTravels: res.data});
						});
						api('get', BASE_URL+`api/travels/daily`, {}, {}, (res) => {
							console.log("got daily travel: ", res.data);
							this.setState({dailyTravel: res.data});
						});
					})
				})
			);
	}

	handleChange = {
		country: (e) => {
			let val = e.target.value;
			console.log("in", val);
			this.setState({createTravelFields: {
											...this.state.createTravelFields,
											search: val
											}
			});
			this.autocompleteCounty(val);
		},

		field: (fieldName, e) => {
			this.setState({createTravelFields: {
											...this.state.createTravelFields,
											[fieldName]: e.target.value
											}
			});
		}
	}

	handleSendNewTravel = (e) => {
		// TODO validation
		let send_obj = {};
		for (let key in this.state.createTravelFields){
			let val = this.state.createTravelFields[key];
			if (val == null ||
				 	val.length === 0){
					if (key === 'autocomplete')
						continue;
					return;
			}else{
				if ('dateTo'.includes(key)){
					let date = val.split('.');
					if (date.length !== 3){
						return;
					}else{
						if (1){}
					}
				}else{
					send_obj[key] = this.state.createTravelFields[key];
				}
			}
		}
		console.log("sending ", send_obj);
		api('post', 'api/travels/custom',
				send_obj,
				{ headers: {'x-auth-token': this.state.jwtToken} },
				(res) => {
					console.log('travels: ', res);
				}
		)
	}


	autocompleteCounty = (countryName) => {
		// let query = `http://autocomplete.traSearchvelpayouts.com/places2?term=${countryName}&locale=ru&types[]=country`;
		// console.warn(query);
		// axios.get(encodeURI(query),
		// 					{})
		// .then(res => {
		// 	let suggestions = [];
		// 	for (let i in res.data){
		// 		suggestions.push(res.data[i].name);
		// 	}
		// 	console.log("suggs", suggestions);
		// 	this.setState({ createTravelFields: { ...this.state.createTravelFields, createTravelAutocomplete: suggestions}})
		// });
	}

	go = (viewName, panelName) => {
		let prev = this.state[viewName];
		this.props.dispatch(changeStoryAction({newStoryName: viewName}))
		this.setState({ [viewName]: { ...prev, activePanel: panelName }});//this.state.[[viewName]] : panelName} });
	};

	onStoryChange = (e) => {
		console.log("click story " + e.currentTarget.dataset.story);
		this.props.dispatch(changeStoryAction({newStoryName: e.currentTarget.dataset.story }));
	}

	dateActual = (dateFrom, dateTo) => {
		return false;
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
	          ><Icon28InfoOutline /></TabbarItem>
					</Tabbar>
				}>
				<View id="popular" activePanel={'popular__home'}>
			    <Panel id="popular__home">
						<PanelHeader left={<HeaderButton><Icon24Cancel/></HeaderButton>}>Популярные путешествия</PanelHeader>
						<Group title="Создайте своё путешествие">
							<CreateTravelCell clickHandler={()=>{this.go('myTravel', 'myTravel__create')}}/>
						</Group>
						{
							this.state.dailyTravel &&
							<Group title="Выберите путешествие дня">
								<TravelCell data={this.state.dailyTravel} />
							</Group>
						}
						{
							this.state.popularTravels.length !== 0 &&
							<Group title="Отправьтесь в одно из популярных путешествий">
								<List>
									{this.state.popularTravels.map((travel) => {
											return <TravelCell data={travel} />
										})
									}
								</List>
							</Group>
						}
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
				<View id="myTravel" activePanel={this.state.myTravel.activePanel}>
			    <Panel id="myTravel__home">
						<PanelHeader left={<HeaderButton>
																<Icon24Back onClick={()=>{ this.go('myTravel', 'myTravel__home') }}/>
															</HeaderButton>}>
							Моё путешествие
						</PanelHeader>
						<CreateTravelCell clickHandler={()=>{this.go('myTravel', 'myTravel__create')}}/>
						{this.state.myTravels.map((travel) => {
								if (this.dateActual(travel.data.dateFrom, travel.data.dateTo)){
									return <TravelCell data={travel.data} clickHandler={()=>{
										console.log("clcl");
										this.go('myTravel', 'myTravel__choosen');
										this.setState({choosenMyTravel: travel});
									}}/>
								}else{
									return null;
								}
							})
						}
					</Panel>
					<Panel id="myTravel__choosen">
						<PanelHeader left={<HeaderButton>
																<Icon24Back onClick={()=>{ this.go('myTravel', 'myTravel__home') }}/>
															</HeaderButton>}/>
							<Div>podrobno</Div>
							<Div>Name=>{
								this.state.choosenMyTravel.data &&
								this.state.choosenMyTravel.data.name
								}
							</Div>
							<Div style={{display: 'inline-flex'}}>
								<HelperIcon name="weather" clickHandler={()=>{ this.go('myTravel', 'myTravel__choosen'); this.setState({helperName: 'weather'}); }}/>
								<HelperIcon name="clothes" clickHandler={()=>{ this.go('myTravel', 'myTravel__choosen'); this.setState({helperName: 'clothes'}); }}/>
							</Div>
							<Div style={{display: 'inline-flex'}}>
								<HelperIcon name="culture" clickHandler={()=>{ this.go('myTravel', 'myTravel__choosen'); this.setState({helperName: 'culture'}); }}/>
							</Div>
					</Panel>
					<Panel id='myTravel__helper'>
						<PanelHeader left={<HeaderButton>
															 	<Icon24Back onClick={()=>{ this.go('myTravel', 'myTravel__choosen') }}/>
															 </HeaderButton>}>
							Помощник {this.state.helperName}
						</PanelHeader>
					</Panel>
					<Panel id="myTravel__create">
						<PanelHeader left={<HeaderButton>
																<Icon24Back onClick={()=>{ this.go('myTravel', 'myTravel__home') }}/>
															</HeaderButton>}>
							Новое путешествие
						</PanelHeader>
						<FormLayout>
							<FormLayoutGroup top="Название путешествия">
								<Input value={this.state.createTravelFields.name} onChange={(e) => this.handleChange.field('name', e)}/>
							</FormLayoutGroup>
							<FormLayoutGroup top="Сколько денег не жалко?">
								<Div style={{display: 'inline-flex'}}>
								 10<RangeSlider
								 	style={{width: '65vw'}}
	                top="Uncontrolled"
	                min={10}
	                max={200}
	                step={10}
	                defaultValue={[this.state.createTravelFields.costMin, this.state.createTravelFields.costMax]}
	               />200
								</Div>
							</FormLayoutGroup>
							<FormLayoutGroup top="Даты">
								date1
								<Input value={this.state.createTravelFields.dateFrom}
											 onChange={e => { this.handleChange.field('dateFrom', e) }}/>
								date2
								<Input value={this.state.createTravelFields.dateto}
											 onChange={e => { this.handleChange.field('dateTo', e) }}/>
							</FormLayoutGroup>
							<FormLayoutGroup top="Место">
								Знаю, куда
								<Div>
									<Input value={this.state.createTravelFields.search}
												 onChange={this.handleChange.country} />
					          { this.state.createTravelFields.autocomplete.length &&
											<List>
												{
													this.state.createTravelFields.autocomplete.map(suggest => {
														return <Div onClick={(e) => this.handleChange.country({target:{value: suggest}})}>{suggest}</Div>
													})
												}
											</List>
									  }
								</Div>
								или <br/> <br/>
								<Checkbox value={this.state.createTravelFields.shengen}
													onChange={(e) => this.handleChange.field('shengen', e)}>Есть шенгенская виза</Checkbox>
							</FormLayoutGroup>
						</FormLayout>
						<Button size="xl" onClick={this.handleSendNewTravel}>Собрать</Button>
					</Panel>
			  </View>
				<View id="myTravels" activePanel={'myTravels__home'}>
			    <Panel id="myTravels__home">
						<PanelHeader left={<HeaderButton>
																<Icon24Cancel onClick={()=>{ }}/>
															</HeaderButton>}>
							Мои путешествия
						</PanelHeader>
						Тут будет лист путешествий
						{ this.state.myTravels.length &&
							this.state.myTravels.map((travel) => {
								return <TravelCell data={travel.data} clickHandler={()=>{
									console.log("clcl");
								}}/>
							})
						}
						{
							!this.state.myTravels.length &&
							<Div>Тут ещё ничего нет. Создайте первое)</Div>
						}
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
