import { FaHeart, FaRegHeart } from 'react-icons/fa';
import React, { useState } from 'react';

const LikeButton = ({ user_id, recipe_id, favorited }) => {
    const [favorite, setFavorited] = useState(favorited);
    
    const onLike = async () => {
        if (!user_id) {
            alert("Please sign in to like recipes");
            return;
        }
        const server = import.meta.env.VITE_BACK_END_SERVE;
        try {
            const response = await fetch(`${server}/favorites/${recipe_id}/${user_id}`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                alert("Sorry, there was a server error");
                return;
            }
            setFavorited(prev => !prev);
        } catch (err) {
            alert("Sorry, there was a client error");
        }
    };

    return (
        <button 
            className="p-2 text-white bg-green-500 hover:bg-green-700 rounded"
            onClick={onLike}>
            {favorite ? <FaHeart /> : <FaRegHeart />}
        </button>
    );
}

export default LikeButton;
