import React from 'react';
import ReactStars from 'react-stars';

class StarRatings extends React.Component {

  ratingChanged(newRating) {
    console.log(newRating);
  }

  render() {
    return <ReactStars count={5} onChange={this.ratingChanged} size={60} color2={'#ffd700'} />
  }

}

export default StarRatings;
