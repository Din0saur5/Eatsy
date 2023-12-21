// src/App.js
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button } from 'flowbite-react';

const Review = ({ review, handleDelete }) => {
  const [userData, setUserData] = useOutletContext()
  let stars = ""
  for (let i = 0; i < review.rating; i++) {
    stars += "⭐"
  }
  let deleteButton = ""
  if(userData && userData.id === review.user_id) {
    deleteButton = <Button gradientMonochrome="failure" onClick={handleDelete} className="m-2 p-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</Button>
  }
  return (
    <div className='bg-white p-6 rounded-lg m-6'>
      <h3>{stars}</h3>
      <div className='flex flex-row justify-between'>
        <h4>{review.title}</h4>
        <p>{review.user.username}</p>
      </div>
        <hr />
        <div className='flex flex-row justify-between'>
          <p>{review.comment}</p>
          {deleteButton}
        </div>
      </div>
  );
};

export default Review;
