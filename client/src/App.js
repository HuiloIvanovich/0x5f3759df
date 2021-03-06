import React from 'react';
// var moment = require('moment');
import { connect as reduxConnect } from "react-redux";
import { changeStoryAction } from './redux/actions';
import connect from '@vkontakte/vkui-connect';
import '@vkontakte/vkui/dist/vkui.css';

import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';
import Icon24Newsfeed from '@vkontakte/icons/dist/24/newsfeed';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import Icon24LikeOutline from '@vkontakte/icons/dist/24/like_outline';
import Icon28InfoOutline from '@vkontakte/icons/dist/28/info_outline';

import { View, Panel, PanelHeader, HeaderButton, Epic } from '@vkontakte/vkui';
import { Div, List, Button, Group, Tabbar, TabbarItem } from '@vkontakte/vkui';
import { FormLayout, FormLayoutGroup, Input, Checkbox, RangeSlider } from '@vkontakte/vkui';
import { Gallery, Footer, FixedLayout, Tabs, TabsItem } from '@vkontakte/vkui';

import TravelCell from './common/TravelCell.jsx';
import CreateTravelCell from './common/CreateTravelCell.jsx';
import HelperIcon from './common/HelperIcon.jsx';
import FlightPreview from './common/FlightPreview.jsx';
import HotelPreview from './common/HotelPreview.jsx';

import citiesMap from './assets/citiesMap.json';
import countriesMap from './assets/countriesMap.json';

import DateRangePicker from 'react-daterange-picker'
import 'react-daterange-picker/dist/css/react-calendar.css'

import IconWeather from './common/icons/IconWeather.png';
import IconClothes from './common/icons/IconClothes.png';

import api from './api.js';
const BASE_URL = 'http://95.213.39.142:5000/';
// const BASE_URL = 'http://172.20.40.70:5000/';
// const BASE_URL = '/';

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
			myTravels: [],
			search: {text: '',
							 autocomplete: []
			},
			createTravelFields: {
				users: { user: 123},
				name: 'Отличный отдых',
				budgetMin: 10,
				budgetMax: 200,
				dateFrom: null,
				dateTo: null,
				// country: null,
				// city: null
				shengen: false
			},
			createTravel: {
				name: '',
				minBudget: null,
				maxBudget: null,
				dateFrom: null,
				dateTo: null,
				visa: false,
				country: null,
				city: null
			},
			popularTravels: [],
			dailyTravel: null,
			calendar: false,

			suggestedTrips: [],
			activeSuggestedTripIndex: null,
			currentShowHotelIndex: null,

			edit: {mode: "public"},
			helpers: {current: "weater"}
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

		console.log("citiesMap:", citiesMap);
		console.log("countriesMap:", countriesMap);
		api('get', 'http://autocomplete.travelpayouts.com/places2?term=Сан&locale=ru&types[]=country', {}, {}, (r => {
			console.log('suggest', r);
		}));
		api('get', BASE_URL+'api/users/auth',
				{ headers: {'Content-Type': 'application/json'},
					params:  {'user_id': '123', 'params': '456' }},
				{},
				(res => {
					const token = res.data.token;
	        this.setState({ jwtToken: token }, () => {
						// Got jwt token
						let config = { headers: { 'x-auth-token': this.state.jwtToken } };
						// Get my travels
						api('get', BASE_URL+`api/travels/my`, {}, config, (res) => {
								let arr = [];
								for (let tr in res.data){
									arr.push(res.data[tr]);
								}
				        this.setState({ myTravels: arr });
						});
						api('get', BASE_URL+`api/travels/popular`, {}, config, (res) => {
							if (Object.keys(res.data).length)
								this.setState({popularTravels: res.data});
						});
						api('get', BASE_URL+`api/travels/daily`, {}, config, (res) => {
							if (Object.keys(res.data).length)
								this.setState({dailyTravel: res.data[0]});
						});

						setTimeout(()=>{
							console.log("My:", this.state.myTravels);
							console.log("Popular:", this.state.popularTravels);
							console.log("Daily:", this.state.dailyTravel);
						}, 1000);
					})
				})
			);
	}

	iata2name = (iata) => {
		for (let i in citiesMap){
			if (citiesMap[i].code == iata)
				return citiesMap[i].name;
		}
		return '';
	}
	iata2county = (iata)=>{
		for (let i in citiesMap){
			if (citiesMap[i].code == iata){
				let country_code = citiesMap[i].country_code;
				for (let j in countriesMap){
					if (countriesMap[j].code == country_code)
						return countriesMap[j].name;
				}
			}
		}
		return '';
	}

	handleChange = {
		country: (e) => {
			let val = e.target.value;
			console.log("in", val);
			this.setState({search: {
											...this.state.search,
											text: val
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
		},
		fieldVal: (fieldName, val) => {
			this.setState({createTravelFields: {
											...this.state.createTravelFields,
											[fieldName]: val
											}
			});
		}
	}

	handleSendNewTravel = (e) => {
		console.log("enter");
		for (let key in this.state.createTravelFields){
			let val = this.state.createTravelFields[key];
			console.log("key ", key, val);
			if (val == null){
					return;
					console.log('oh no')
			}
		}
		let send_obj = Object.assign({}, this.state.createTravelFields);
		console.log("sending", send_obj);
		api('get', BASE_URL+'api/travels/custom',
				{ params: {
					budgetMin: send_obj.budgetMin,
					budgetMax: send_obj.budgetMax,
					dateFrom: send_obj.dateFrom,
					dateTo: send_obj.dateTo,
					origin: "MOW",
					visas: send_obj.shengen? [ 'shengen' ] : [],
					airlines: []}},
				{ headers: {'x-auth-token': this.state.jwtToken} },
				(res) => {
					console.log('travels response: ', res);
					this.go('myTravel', 'myTravel__create__2');
					this.setState({suggestedTrips: res.data,
												 activeSuggestedTripIndex: 0,
											   currentShowHotelIndex: 0})
				}
		)
	}

	handleCreateCustomTravel = (e) => {
		let currFlight = this.state.suggestedTrips[this.state.activeSuggestedTripIndex].flight;
		let hotelID = this.state.currentShowHotelIndex;
		let currHotel = this.state.suggestedTrips[this.state.activeSuggestedTripIndex].hotels[hotelID];
		let cost = currFlight.price + parseInt(currHotel.priceAvg);

		// Prepare flights data
		let flight = {};
		flight.dateFrom = currFlight.departure_at;
		flight.dateTo = currFlight.return_at;
		flight.cityFrom = {iata: currFlight.origin,
											 name: this.iata2name(currFlight.origin)};
	  flight.cityTo = {iata: currFlight.destination,
										 name: this.iata2name(currFlight.destination)};
		flight.countryTo = {iata: currFlight.destination,
												name: this.iata2county(currFlight.destination)};
		flight.class = '1st';
		flight.price = currFlight.price;
		flight.airline = currFlight.airline;

		// Prepare hotel data
		let hotel = {};
		hotel.dataFrom= currFlight.departure_at;
		hotel.dataTo= currFlight.return_at;
		hotel.price = currHotel.priceAvg;
		hotel.stars = currHotel.stars;
		hotel.city = flight.cityTo;
		hotel.country = flight.countryTo;

		let finalJSON = {
		 users: [{
			 user: {
				 id: this.state.fetchedUser? this.state.fetchedUser.id : 123,
				 isAdmin: true
			 }
		 }],
		 name: this.state.createTravelFields.name,
		 cost: cost,
		 minBudget: this.state.createTravelFields.budgetMin,
		 maxBudget: this.state.createTravelFields.budgetMax,
		 dateFrom: this.state.createTravelFields.dateFrom,
		 dateTo: this.state.createTravelFields.dateTo,
		 visas: [{visatype: "shengen"}],
		 countryFrom: {
			 iata: "RUS",
			 name: "Russia"
		 },
		 flight: flight,
		 hotel: hotel,
		 backgroundImage: "emptyUseless"
		}
		console.log("send create custom with data", finalJSON);
		api('post', BASE_URL+'api/travels/new',
				{travel: finalJSON},
				{ headers: {'x-auth-token': this.state.jwtToken} },
				(res) => {
					console.log("travel/new res is ", res)
					this.setState({myTravels: this.state.myTravels.concat(res.data)})
				}
		);
	}

	edit = {
		choose: (mode) => {
			this.setState({
				edit: {...this.state.edit, mode:  mode}
			})
		}
	}
	helpers = {
		choose: (name) => {
			this.setState({
				helpers: {...this.state.helpers, current:  name}
			})
		}
	}

	autocompleteCounty = (countryName) => {
		// let query = `http://autocomplete.traSearchvelpayouts.com/places2?term=${countryName}&locale=ru&types[]=country`;
		// console.warn(query.toJSON());
		// let config = { headers: { 'x-auth-token': this.state.jwtToken } }
		// api('get', query, {}, config)
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
		return true;
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
											return <TravelCell key={travel._id} data={travel} />
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
								if (this.dateActual(travel.dateFrom, travel.dateTo)){
									return <TravelCell data={travel} clickHandler={()=>{
										console.log("clcl", travel);
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
															</HeaderButton>}>
							Ваш помощник
						</PanelHeader>
						<Div>Путешествие {
							this.state.choosenMyTravel.name &&
							this.state.choosenMyTravel.name
							}
						</Div>
						<Div style={{display: 'inline-flex', margin: 0, padding: 0}}>
							<HelperIcon name="weather" src={IconWeather} clickHandler={()=>{ this.go('myTravel', 'myTravel__helpers') ;this.helpers.choose('weather') }}/>
							<HelperIcon name="clothes" src={IconClothes} clickHandler={()=>{ this.go('myTravel', 'myTravel__helpers'); this.helpers.choose('clothes') }}/>
						</Div>
						<Div style={{display: 'inline-flex', margin: 0, padding: 0}}>
							<HelperIcon name="culture" clickHandler={()=>{ this.go('myTravel', 'myTravel__helpers'); this.setState({helperName: 'culture'}); }}/>
						</Div>
						<FixedLayout vertical="bottom">
              <Tabs>
                <TabsItem
                  onClick={() => this.edit.choose('public')}
                  selected={this.state.edit.mode === 'public'}
                >Общее</TabsItem>
                <TabsItem
                  onClick={() => this.edit.choose('private')}
                  selected={this.state.edit.mode === 'private'}
                >Личное</TabsItem>
              </Tabs>
            </FixedLayout>
					</Panel>
					<Panel id='myTravel__helpers'>
						<PanelHeader left={<HeaderButton>
															 	<Icon24Back onClick={()=>{ this.go('myTravel', 'myTravel__choosen') }}/>
															 </HeaderButton>}>
							Помощник {this.state.helpers.current}
						</PanelHeader>
					</Panel>
					<Panel id="myTravel__create">
						<PanelHeader left={<HeaderButton>
																<Icon24Back onClick={()=>{ this.go('myTravel', 'myTravel__home') }}/>
															</HeaderButton>}>
							Новое путешествие
						</PanelHeader>
						<FormLayout>
							<FormLayoutGroup  top="Название путешествия">
								<Input value={this.state.createTravelFields.name} onChange={(e) => this.handleChange.field('name', e)}/>
							</FormLayoutGroup>
							<FormLayoutGroup style={{paddingTop: 0, paddingBottom: 0}} top="На какую сумму ищем?">
								<Div style={{display: 'inline-flex'}}>
								 {this.state.createTravelFields.budgetMin}k
								 <RangeSlider
								 	style={{width: '60vw'}}
	                top="Uncontrolled"
	                min={10}
	                max={200}
	                step={5}
									onChange={ pair => { this.handleChange.fieldVal('budgetMin', pair[0]);
																		   this.handleChange.fieldVal('budgetMax', pair[1]);}}
	                defaultValue={[this.state.createTravelFields.budgetMin, this.state.createTravelFields.budgetMax]}
	               />
								 {this.state.createTravelFields.budgetMax}k
								</Div>
							</FormLayoutGroup>
							<FormLayoutGroup style={{paddingTop: 0, paddingBottom: 0}} top="Даты">
								<DateRangePicker
				          onSelect={(dates) => {
										this.setState({calendar:dates});
										this.setState({createTravelFields: {
											...this.state.createTravelFields,
											dateFrom: dates.start._d.toJSON().slice(0, 10),
											dateTo: dates.end._d.toJSON().slice(0, 10)
										}});
								  }}
				          value={this.state.calendar}
								/>
							</FormLayoutGroup>
							<FormLayoutGroup style={{paddingTop: 0, paddingBottom: 0}} top="Место">
								<Div>
									<Input value={this.state.search.text}
												 onChange={this.handleChange.country} />
					          { this.state.search.autocomplete.length !== 0 &&
											<List>
												{
													this.state.createTravelFields.autocomplete.map(suggest => {
														return <Div onClick={(e) => this.handleChange.country({target:{value: suggest}})}>{suggest}</Div>
													})
												}
											</List>
									  }
								</Div>
								<br/>
								<Checkbox value={this.state.createTravelFields.shengen}
													onChange={(e) => this.handleChange.field('shengen', e)}>Есть шенгенская виза</Checkbox>
							</FormLayoutGroup>
						</FormLayout>
						<Button size="xl" onClick={this.handleSendNewTravel}>Собрать</Button>
					</Panel>
					<Panel id="myTravel__create__2">
						<PanelHeader left={<HeaderButton>
																<Icon24Back onClick={()=>{ this.go('myTravel', 'myTravel__create') }}/>
															</HeaderButton>}>
							Подбираем подходящее
						</PanelHeader>
						<Group title="Авиабилеты">
							<Gallery
								slideWidth="100%"
								align="center"
								style={{height: '19vh'}}
								bullets='dark'
								onChange={(num) => { console.log('new flight is ', num); this.setState({activeSuggestedTripIndex: num, currentShowHotelIndex: 0}) }}>
								{
									this.state.suggestedTrips.length !== 0 &&
									this.state.suggestedTrips.map((trip) => {
										return <FlightPreview from={{iata: trip.flight.origin,
																								 date: trip.flight.departure_at.slice(0, 10),
																								 country: this.iata2county(trip.flight.origin),
																								 city: this.iata2name(trip.flight.origin)}}
																					to={{iata: trip.flight.destination,
																							 date: trip.flight.departure_at.slice(0, 10),
																							 country: this.iata2county(trip.flight.destination),
																							 city: this.iata2name(trip.flight.destination)}}
																					price={trip.flight.price}>
													</FlightPreview>
									})
								}
							</Gallery>
						</Group>
						<Group title="Доступные по прилёту отели">
						<Gallery
							slideWidth="100%"
							align="center"
							style={{height: '19vh'}}
							bullets='dark'
							slideIndex={this.state.currentShowHotelIndex}
							onChange={(num)=> { this.setState({currentShowHotelIndex: num})}}>
							{
								this.state.activeSuggestedTripIndex !== null &&
								this.state.suggestedTrips[this.state.activeSuggestedTripIndex].hotels.length !== 0 &&
								this.state.suggestedTrips[this.state.activeSuggestedTripIndex].hotels.map((hotel) => {
									return <HotelPreview name={hotel.hotelName}
																			 country={hotel.location.country}
																			 city={hotel.location.name}
																			 price={hotel.priceAvg}
																			 stars={hotel.stars}></HotelPreview>
								})
							}
						</Gallery>
						</Group>
						<Button size="xl" onClick={this.handleCreateCustomTravel}>Вперёд!</Button>
					</Panel>
			  </View>
				<View id="myTravels" activePanel={'myTravels__home'}>
			    <Panel id="myTravels__home">
						<PanelHeader left={<HeaderButton>
																<Icon24Cancel onClick={()=>{ }}/>
															</HeaderButton>}>
							Мои путешествия
						</PanelHeader>
						{ this.state.myTravels.length &&
							this.state.myTravels.map((travel) => {
								return <TravelCell key={travel._id} data={travel} clickHandler={()=>{
									console.log("clcl");
								}}/>
							})
						}
						{
							this.state.myTravels.length !== 0 &&
							<Footer>{this.state.myTravels.length} путешествия</Footer>
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
  let epicState = state.activeStoryReducer.activeStory;
  return {
    activeStory: epicState
  }
}

export default reduxConnect(
  mapStateToProps
)(App);
