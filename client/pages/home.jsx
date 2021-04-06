import React from 'react';

export default function Home(props) {
  return (
    <header>
      <i className="fas fa-tv fa-2x tv-icon"></i>
      <h1> {props.text} </h1>
    </header>
  );
}
