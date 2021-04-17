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
        <div>
          <h1>Register</h1>;
           <form>
            <h2>Username</h2>
            <input type="text" id="username" name="username"></input>
              <h2>Password</h2>
              <input type="password" id="password" name="password" minlength="8" required></input>
                <button>Cancel</button>
                <button>Sign Up</button>
          </form>
        </div>;
        </main>
          <footer>

          </footer>
        </div>;
  }
}

export default SignUp;
