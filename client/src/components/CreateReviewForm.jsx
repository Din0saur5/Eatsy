import React, { useEffect, useState } from "react";
import {Button} from 'flowbite-react'

const CreateReviewForm = ({handleClose, user_id, recipe_id}) => {
    const [formData, setFormData] = useState({
        title: '',
        comment: '',
        rating: 0,
        user_id: user_id,
        recipe_id: recipe_id
    })
    const [isFormValid, setIsFormValid] = useState(false)
    useEffect(() => {
        setIsFormValid(formData.rating > 0 && formData.rating < 6)
    }, [formData])
    
    const handleSubmit = async (e) => {
        console.log(formData)
        e.preventDefault()
        console.log(formData)
        if (!isFormValid) return
        const server = import.meta.env.VITE_BACK_END_SERVE
        try {
            const response = await fetch(`${server}/reviews`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Handle response
            const data = await response.json()
            console.log(data)
            handleClose()
        } catch (error) {
            console.error('Error:', error);
        }
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const ratingChange = (e) => {
        setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) })
    }
    let stars = ''
    for (let i = 0; i < formData.rating; i++) {
        stars += "⭐"
      }
    return (
        <div>
            <h3>Create Review</h3>
            <form onSubmit={handleSubmit}>
                <label>Title (optional)</label><br/>
                <input 
                    type="text" 
                    name="title" 
                    onChange={handleChange} /><br/>
                <label>Comment (optional)</label><br/>
                <input 
                    type="text" 
                    name="comment" 
                    onChange={handleChange} /><br/>
                <label>Rating</label><br/>
                <input 
                    type="number" 
                    name="rating" 
                    onChange={(e) => ratingChange(e)}
                    min={1}
                    max={5} />
                    {stars}
                    <br/>
            <div className='flex flex-row justify-between'> 
            <Button  disabled={!isFormValid} gradientMonochrome="success"  className={`mt-4 px-4 py-2 ${isFormValid ? '': 'bg-gray-500 text-gray-200'}` } type="submit">Create Review</Button>
            <Button gradientMonochrome="failure" onClick={handleClose} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</Button>
            </div>
            </form>
        </div>
    )
}

export default CreateReviewForm