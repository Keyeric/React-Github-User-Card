import React, {Component} from 'react';
import {BrowserRouter as Router, Link} from 'react-router-dom';
import axios from 'axios';
import './index.css';

class App extends Component {
  state = {
    user: [],
    followers: [],
    error: ''
  };

  componentDidMount() {
    axios.all([
      axios.get("https://api.github.com/users/Keyeric"),
      axios.get("https://api.github.com/users/Keyeric/followers")
    ])
      .then(axios.spread((res1, res2) => {
          this.setState({
              user: res1.data,
              followers: res2.data
            })
        }))
        .catch(err => console.log("We broke something, somewhere...", err));
  }

  render() {
    return (
        <Router>
      <div className="App">
        <h1>Github Spotlight</h1>

        <div class="usercard" key={this.state.user.id}>
            <img src={this.state.user.avatar_url} alt="Key's Github picture"/>
            <h2>{this.state.user.name}</h2>
            <p>Followers: {this.state.user.followers}</p>
            <p>Following: {this.state.user.following}</p>
        </div>

        <>
            {this.state.followers.map(person => (
            <div class="usercard" key={person.id}>
                <img src={person.avatar_url} alt={person.name}/>
                <h2>{person.name}</h2>
                <h3>{person.login}</h3>
                <Link to= {person.html_url} />
            </div>
            ))}
        </>
      </div>
      </Router>
    );
  }
}

export default App;
