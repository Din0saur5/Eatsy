import React from 'react'
import { Link } from 'react-router-dom'

const RecipeItem = (recipe) => {
    const {id} = recipe
  return (
    <div>
      <Link to={`/recipe/${id}`}  >link</Link> 
    </div>
  )
}

export default RecipeItem
