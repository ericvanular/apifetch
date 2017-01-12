import React, { Component } from 'react';
import fetch from 'isomorphic-fetch'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddit: '',
      posts: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    e.preventDefault();
    this.setState({
      subreddit: e.target.value
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    fetch(`https://www.reddit.com/r/${this.state.subreddit}.json`)
    .then(response => {return response.json()})
    .then(json => {
      return this.setState({ posts: json.data.children.map(child => child.data.url)  })
    })
    .catch(error => {throw error});
  }
  render() {
    return (
      <div>
          <h2>Welcome to the API fetch machine</h2>
          <hr/>
          <form>
            <input
              type="textarea"
              placeholder="Type here to chat!"
              value={this.state.subreddit}
              onChange={this.handleChange}
            />
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
          <hr/>
          <ul>
            {this.state.posts.map((post,i) =>
              <li key={i}>{post}</li>
            )}
          </ul>
          <hr/>
          To get started, type in a subreddit.
      </div>
    );
  }
}

export default App;
