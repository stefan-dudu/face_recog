import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesConfig = {
particles: {
  number: {
    value: 90,
      line_linked: {
        shadow: {
          enable: true,
          color: "#3CA9D1",
    		  blur: 5
          }
    }
  }
 }
}

const app = new Clarifai.App({
 apiKey: '1ec4031a38cb43d1bb99d5eed1740991'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ''
    }
  }

  onInputChange = (event) => {
    console.log(event.target.value)
  }

  onButtonSubmit = () => {
    console.log('click have been pressed');
    app.models
      .initModel({
        id: Clarifai.FACE_DETECT_MODEL,
      })
      .then((faceDetectModel) => {
        return faceDetectModel.predict(
          "https://media.allure.com/photos/5ea70894ad6aae0008773b2d/1:1/w_1763,h_1763,c_limit/51faces-Social.jpg"
        );
      })
      .then((response) => {
        console.log(response);
      });
  }
  
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesConfig} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange= {this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        {<FaceRecognition />}
      </div>
    );
  }
} 
export default App;
