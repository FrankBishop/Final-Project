import React from 'react';
import SearchForm from './search';

class SignUp extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = { openModal: false, episodeToDelete: null, logModalOpen: false, episodeToLog: null };
  // }

  render() {
    return <div>
      <header>
        <i onClick={this.props.menu} className="fas fa-tv fa-2x tv-icon"></i>
        <h1 className="header-text"> TV Diary </h1>
        <div className="search-form-header">
          <SearchForm onSubmit={this.props.setSearchResults} />
        </div>
      </header>
      <main>
        <div className="search-form">
          <SearchForm onSubmit={this.props.setSearchResults} />
        </div>
        <div className="registration">
          <h1 className="registration-header">Register</h1>
          <form>
            <h2 className="registration-fields">Username</h2>
            <input type="text" id="username" name="username"></input>
            <h2 className="registration-fields">Password</h2>
            <input type="password" id="password" name="password" minLength="8" required></input>
            <div className="registration-button-holder">
              <button>Cancel</button>
              <button>Sign Up</button>
            </div>
          </form>
        </div>;
        </main>
      <footer>

      </footer>
    </div>;
  }
}

export default SignUp;
