import React from 'react';
import SearchForm from './search';

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = { username: null, password: null, signedIn: false };
    this.startSignIn = this.startSignIn.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  render() {
    if (this.state.signedIn === true) {
      return <div>
        <header>
          <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
          <h1 className="header-text" onClick={this.props.goHome}> TV Diary </h1>
          <div className="search-form-header">
            <SearchForm onSubmit={this.props.setSearchResults} />
          </div>
        </header>
        <main>
          <div className="search-form">
            <SearchForm onSubmit={this.props.setSearchResults} />
          </div>
          {this.props.logonFailed === true &&
            <div className="registration">
              <h1 className="registration-header">Incorrect Username and Password</h1>
              <form>
                <h2 className="registration-fields">Username</h2>
                <input type="text" id="username" name="username" onChange={this.setUsername}></input>
                <h2 className="registration-fields">Password</h2>
                <input type="password" id="password" name="password" minLength="8" required onChange={this.setPassword}></input>
                <div className="registration-button-holder">
                  <button onClick={this.props.goHome} type="button">Cancel</button>
                  <button onClick={this.startSignIn} type="submit">Sign In</button>
                </div>
              </form>
            </div>
          }
          {this.props.logonFailed === false &&
            <div className="registration">
              <h1 className="registration-header">Congrats you are signed in</h1>
              <h2 className="registration-header">Click the TV in the top left to navigate the site</h2>
            </div>
          }
        </main>
        <footer>

        </footer>
      </div>;
    }
    return <div>
      <header>
        <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
        <h1 className="header-text" onClick={this.props.goHome}> TV Diary </h1>
        <div className="search-form-header">
          <SearchForm onSubmit={this.props.setSearchResults} />
        </div>
      </header>
      <main>
        <div className="search-form">
          <SearchForm onSubmit={this.props.setSearchResults} />
        </div>
        <div className="registration">
          <h1 className="registration-header">Sign In</h1>
          <form>
            <h2 className="registration-fields">Username</h2>
            <input type="text" id="username" name="username" onChange={this.setUsername}></input>
            <h2 className="registration-fields">Password</h2>
            <input type="password" id="password" name="password" minLength="8" required onChange={this.setPassword}></input>
            <div className="registration-button-holder">
              <button onClick={this.props.goHome} type="button">Cancel</button>
              <button onClick={this.startSignIn} type="submit">Sign In</button>
            </div>
          </form>
        </div>;
        </main>
      <footer>

      </footer>
    </div>;
  }

  setUsername(event) {
    this.setState({ username: event.target.value });
  }

  setPassword(event) {
    this.setState({ password: event.target.value });
  }

  startSignIn() {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.signIn(user);
    this.setState({ signedIn: true });
  }
}

export default SignIn;
