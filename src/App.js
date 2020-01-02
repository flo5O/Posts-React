import React, { Component } from 'react'
import ReactDom from 'react-dom'

const BASE_URL = "https://jsonplaceholder.typicode.com/posts"
export default class App extends Component {

  state = {
    isLoading: false,
    error: null,
    posts: []
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(BASE_URL)
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw Error("Error fetching posts!")
        }
      })
      .then(posts => {
        //console.log(posts)
        this.setState({ posts: posts, isLoading: false })
      })
      .catch(error => this.setState({ error }))
  }
  render() {
    const { posts, error, isLoading } = this.state
    if (error) {
      return <p style={{ color: 'red' }}>{this.state.error.message}</p>
    }
    if (isLoading) {
      return <p>Loading Posts...</p>
    }
    return (
      <div>
        <h1>Posts</h1>
        {posts.map(post => (
          <div>
            <h3>{post.title}</h3>
            <body>{post.body}</body>
          </div>
        ))}

      </div>
    )
  }
}
