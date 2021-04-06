import React from 'react';
import SearchFrom from './search';

export default function Home(props) {
  return (
    <div>
      <header>
        <i className="fas fa-tv fa-2x tv-icon"></i>
        <h1> {props.text} </h1>
      </header>
      <main>
        <SearchFrom />
        <h1 className="main-header">Popular Shows</h1>
        <div className="image-holder-row">
          <img src="/images/683813.jpg" alt="The Mandalorian" />
          <img src="/images/746929.jpg" alt="Superman and Lois" />
        </div>
        <div className="image-holder-row">
          <img src="/images/739854.jpg" alt="The Falcon and The Winter Soldier" />
          <img src="/images/679902.jpg" alt="The Simpsons" />
        </div>
      </main>
      <footer>

      </footer>
    </div>
  );
}
