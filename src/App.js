import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
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
    value: 85,
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

const initalState = {
      input:'',
      imageUrl: '',
      box: {},
      route: 'SignIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends Component {
  constructor() {
    super();
    this.state= initalState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email:  data.email,
      entries: data.entries,
      joined: data.joined
    }})
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
          fetch('https://mysterious-falls-75292.herokuapp.com', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initalState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, route, imageUrl, box} = this.state;
  return (
    <div className="App">
    <Particles className='particles'params={particlesOptions}/>
    <Navigation isSignedIn={isSignedIn} onRouteChange = {this.onRouteChange}/>
    {route === 'home' 
    //if this.state.route is home display home items
      ? <div>
          <Logo />
          <Rank
            name={this.state.user.name}
            entries={this.state.user.entries}  
          />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit}
            /> 
          <FaceRecognition box={box} imageUrl={imageUrl} />
        </div>
    //else display this - register forum
      :(
        route === 'SignIn' 
        ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
      )
      }
    </div>
  );
}
}
 
export default App;