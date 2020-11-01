import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
import { render } from '@testing-library/react';

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesConfig} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*<FaceRecognition /> */}
      </div>
    );
  }
} 
export default App;
