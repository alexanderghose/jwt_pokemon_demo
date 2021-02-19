import logo from './logo.svg';
import './App.css';
import React from 'react'

class App extends React.Component {
  state = {
    jwt: "",
    pokemon: [],
    register_email: "",
    register_password: "",
    login_email: "",
    login_password: "",
  }
  login = async () => {
    try {
      let endpoint="/api/handle_login"
      let fetchRes = await fetch(endpoint, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.login_email,
          password: this.state.login_password,
        })
      })
      let result = await fetchRes.json()
      this.setState({
        jwt: result
      })
    } catch (err) {
      alert("register failed")
      console.log(err)
    }
  }
  register = async () => {
    try {
      let endpoint="/api/handle_register"
      let fetchRes = await fetch(endpoint, {
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.register_email,
          password: this.state.register_password,
        })
      })
      let result = await fetchRes.json()
      alert("register successful")
    } catch (err) {
      alert("register failed")
      console.log(err)
    }
  }
  getPokemon = async () => {
    let endpoint = "/api/allPokemon"
    let fetchRes = await fetch(endpoint, {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        jwt: this.state.jwt,
      })
    })
    let result = await fetchRes.json()
    this.setState({
      pokemon: JSON.stringify(result)
    })
  }
  
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Pokemon JWT Demo
        </header>
        <section className="register">
          Register:<br />
          <input name='register_email' value={this.state.register_email} placeholder='Email' onChange={this.handleChange} />
          <input name='register_password' value={this.state.register_password} placeholder='Password' onChange={this.handleChange} />
          <button onClick={()=>this.register()}>Register</button>
        </section>
        <section className="login">
          <label>Login:</label><br />
          <input name='login_email' value={this.state.login_email} placeholder='Email' onChange={this.handleChange} />
          <input name='login_password' value={this.state.login_password} placeholder='Password' onChange={this.handleChange} />
          <button onClick={()=>this.login()}>Login</button>
        </section>
        <hr />
        <button onClick={()=>this.getPokemon()}>Get Pokemon From Server</button>
        <hr />
        <header className="App-header">
          pokemon: {this.state.pokemon}<br />
          jwt: {this.state.jwt}
        </header>
      </div>
    );
  }
}

export default App;
