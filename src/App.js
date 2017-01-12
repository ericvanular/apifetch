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
      return this.setState({ posts: json.data.children.map(child => child.data)  })
    })
    .catch(error => {throw error});
    this.setState({
      subreddit: ''
    })
  }
  render() {
    return (
      <div style={{margin: 10, padding: 10}}>
          <h2>Welcome to the Reddit API Fetch machine</h2>
          <span>To get started, type in a subreddit name (i.e. worldnews, hockey, etc).</span>
          <hr/>
          <form>
            <input
              style={{'width': 300}}
              type="textarea"
              placeholder="Enter the name of a subreddit"
              value={this.state.subreddit}
              onChange={this.handleChange}
            />
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
          <hr/>
          <ul>
            {this.state.posts.length ?
              this.state.posts.map((post,i) =>
              <li key={i}><a href={`${post.url}`}>{post.title}</a></li> ) :
              <span>No posts here yet!</span>
            }
          </ul>
          <hr/>
      </div>
    );
  }
}

export default App;
