// src/App.js
import React from 'react';

const Review = ({ review }) => {
  let stars = ""
  for (let i = 0; i < review.rating; i++) {
    stars += "⭐"
  }
  return (
    <div key={review.id} className='bg-white p-6 rounded-lg m-6'>
      <h3>{stars}</h3>
      <div className='flex flex-row justify-between'>
        <h4>{review.title}</h4>
        <p>{review.user.username}</p>
      </div>
        <hr />
        <p>{review.comment}</p>
      </div>
  );
};

export default Review;
