import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { tsConstructorType } from '@babel/types';


class App extends React.Component {

  constructor(){
    super()
    this.state = {
      api: 'https://swapi.co/api/people/',
      starWarsData:[],
      index: null,
      person: []
    }

    this.changeHash = this.changeHash.bind(this); 
  }

  async componentDidMount () {
    try{
        const starWarsData = await axios.get('https://swapi.co/api/people/');
        const result = starWarsData.data.results;
        this.setState({starWarsData:result});
  
        window.addEventListener('hashchange',this.changeHash)
    }
    catch (err) {console.log('error message')}
  }

  render(){

    if(window.location.hash==='#hide'){
      console.log('hidden');
      return( <div id="container">
                <h1>Star Wars: React Style</h1>
                  <div id="data">
                    <div id='names'>
                    {this.state.starWarsData.map((item, idx) => <ul key = {item.name}><a href={'#'+idx}><li key = {item.name} id="nameList">{item.name}</li></a></ul>)}
                    </div>
                  </div>
              </div>
              )  
      }
        return( <div id="container">
                  <h1>Star Wars: React Style</h1>
                    <div id="data">
                      <div id='names'>
                      {this.state.starWarsData.map((item, idx) => <ul key = {item.name}><a href={'#'+idx}><li key = {item.name} id="nameList">{item.name}</li></a></ul>)}
                      </div> 
                      <ContactList person={this.state.person}/>
                  </div>
                </div>
               )     
  }

  changeHash(e) {
      this.state.index = Number(window.location.hash.substring(1));
      this.setState({person:this.state.starWarsData[this.state.index]});
    }
}

const ContactList = (props) =>{
     return (<div id="details">
                <a href='#hide' id='hideDetails'>Hide Details</a>
                <h2 id="detailsHeader">Details For {props.person.name}</h2>
                <div id="detailList">
                    <li>Name: {props.person.name}</li>
                    <li>Hair: {props.person.hair}</li>
                    <li>Hair Color: {props.person.hair_color}</li>
                    <li>Height: {props.person.height}</li>
                    <li>Eye Color: {props.person.eye_color}</li>
                    <li>Birth Year: {props.person.birth_year}</li>
                    <li>Home World: {props.person.homeworld}</li>
                </div>
             </div>)
}

export default App;
