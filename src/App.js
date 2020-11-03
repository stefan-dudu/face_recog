import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import './App.css';
 
const app = new Clarifai.App({
  apiKey: '1ec4031a38cb43d1bb99d5eed1740991'
 });
const particlesOptions = {
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
  constructor() {
    super();
    this.state={
      input:'',
      imageUrl: '',
      box: {},
      route: 'SignIn'
    }
  }
 
  calculateFaceLocation =(data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number (image.height);
    return {
      leftCol: clarifaiFace.left_col*width,
      topRow: clarifaiFace.top_row*height,
      rightCol:width-(clarifaiFace.right_col*width),
      bottomRow: height - (clarifaiFace.bottom_row*height),
    }
  }
 
  displayFaceBox =(box) => {
    console.log(box);
    this.setState({box: box})
  }
  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }
  
onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify({
            //   id: this.state.user.id
            // })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = () => {
    this.setState({route: 'home'});
  }

  render() {
  return (
    <div className="App">
    <Particles className='particles'params={particlesOptions}/>
    <Navigation/>
    { this.state.route === 'SignIn' 
      ? <SignIn onRouteChange = {this.onRouteChange}/>
      : <div>
          <Logo />
          <Rank/>
          <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/> 
          <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
        </div>
      }
    </div>
  );
}
}
 
export default App;