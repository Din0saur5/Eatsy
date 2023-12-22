# Welcome to Eatsy! 🍳🥗

Eatsy is a **vibrant** and **user-friendly culinary platform** where food enthusiasts can explore, create, and share their favorite recipes. Our website offers a _diverse range_ of culinary delights, catering to various cuisines, dietary preferences, and meal types. Whether you're an **experienced chef** or a **beginner** in the kitchen, Eatsy provides an interactive and engaging environment for all.

## Explore a World of Flavors 🌍🍜

- 📚 **Browse Recipes**: Effortlessly explore a plethora of recipes, each with vivid images and detailed instructions.
- ⏱ **Preparation Times**: Know exactly how long it will take to prepare each dish.

## Engage with the Community 👨‍🍳👩‍🍳

- 📝 **Post and Edit Recipes**: Share your culinary creations and tweak them as you go.
- 💬 **Reviews and Ratings**: Engage with other food lovers through reviews and ratings.

## Why Eatsy? 🌟

- **Personalized Experience**: Curate your collection of favorite recipes.
- **User-Friendly Interface**: Navigate through our platform with ease and joy.
- **Connect and Share**: Join a community of like-minded food lovers.

---

🔗 **Join Eatsy today** and dive into a world where cooking is not just about food, but an adventure in taste, creativity, and sharing. _Bon Appétit!_


# Recipe Management System API Documentation

## Overview
This documentation details the updated API endpoints for the Recipe Management System, which includes operations related to recipes, ingredients, users, reviews, and sessions.

## Endpoints

### General

#### `GET /`
- **Description**: Returns a welcome message and links to available routes.
- **Response**: HTML content.

### User Management

#### `POST /signup`
- **Description**: Registers a new user.
- **Request Body**: `username`, `email`, `password`, `first_name`, `last_name`.
- **Response**: User details or error message.

#### `GET /check_session`
- **Description**: Checks the current user session.
- **Response**: User details or error message.

#### `POST /login`
- **Description**: Logs in a user.
- **Request Body**: `username`, `password`.
- **Response**: User details or error message.

#### `DELETE /logout`
- **Description**: Logs out the current user.
- **Response**: Success or error message.

#### `GET /users`
- **Description**: Retrieves all users.
- **Response**: List of users.

#### `GET /users/<uuid:id>`
- **Description**: Retrieves a user by their UUID.
- **Response**: User details or error message.

#### `PATCH /users/<uuid:id>`
- **Description**: Updates user details.
- **Request Body**: User attributes.
- **Response**: Updated user details or error message.

#### `DELETE /users/<uuid:id>`
- **Description**: Deletes a user.
- **Response**: Success or error message.

### Recipe Management

#### `GET /recipes`
- **Description**: Retrieves all recipes.
- **Response**: List of recipes.

#### `POST /recipes/create`
- **Description**: Creates a new recipe.
- **Request Body**: Recipe details.
- **Response**: Created recipe details or error message.

#### `GET /recipes/<uuid:id>`
- **Description**: Retrieves a recipe by its UUID.
- **Response**: Recipe details or error message.

#### `PATCH /recipes/change/<uuid:id>`
- **Description**: Updates a recipe.
- **Request Body**: Recipe attributes.
- **Response**: Updated recipe details or error message.

#### `DELETE /recipes/change/<uuid:id>`
- **Description**: Deletes a recipe.
- **Response**: Success or error message.

### Ingredient Management

#### `GET /recipes/ingredient/<string:ingredient>`
- **Description**: Retrieves recipes with a specific ingredient.
- **Response**: List of recipes or error message.

#### `GET /ingredients`
- **Description**: Retrieves all ingredients.
- **Response**: List of ingredients.

#### `POST /ingredients`
- **Description**: Adds a new ingredient.
- **Request Body**: Ingredient details.
- **Response**: Created ingredient details or error message.

#### `DELETE /ingredients/<uuid:id>`
- **Description**: Deletes an ingredient.
- **Response**: Success or error message.

#### `POST /ingredients/<uuid:id>`
- **Description**: Adds an ingredient to a recipe.
- **Request Body**: Ingredient details.
- **Response**: Created ingredient details or error message.

### Review Management

#### `GET /reviews`
- **Description**: Retrieves all reviews.
- **Response**: List of reviews.

#### `POST /reviews`
- **Description**: Adds a new review.
- **Request Body**: Review details.
- **Response**: Created review details or error message.

#### `PATCH /reviews/<uuid:id>/<uuid:user_id>`
- **Description**: Updates a review.
- **Request Body**: Review attributes.
- **Response**: Updated review details or error message.

#### `DELETE /reviews/<uuid:id>/<uuid:user_id>`
- **Description**: Deletes a review.
- **Response**: Success or error message.

### Additional Functionalities

#### `GET /recipes/names`
- **Description**: Retrieves recipe names alphabetically.
- **Response**: Sorted recipe names.

#### `GET /recipes/cuisine/<string:cuisine_type>`
- **Description**: Retrieves recipes by cuisine type.
- **Response**: List of recipes or error message.

#### `GET /recipes/by-cuisine`
- **Description**: Retrieves recipes organized by cuisine.
- **Response**: Recipes grouped by cuisine.

#### `GET /recipes/meal_type/<string:meal_type>`
- **Description**: Retrieves recipes filtered by meal type.
- **Response**: List of recipes or error message.

#### `GET /recipes/random`
- **Description**: Retrieves three random recipes.
- **Response**: List of random recipes or error message.

#### `POST /favorites/<uuid:rec_id>/<uuid:user_id>`
- **Description**: Manages favorites.
- **Request Body**: `rec_id`, `user_id`.
- **Response**: Updated favorites or error message.

#### `GET /rbu/<uuid:user_id>`
- **Description**: Retrieves recipes created by a specific user.
- **Response**: List of recipes or error message.

#### `GET /favs/<uuid:user_id>`
- **Description**: Retrieves favorite recipes of a user.
- **Response**: List of favorite recipes or error message.

### Server Configuration
- The server runs on the port, host, and debug mode as per environment variables.
- It starts when the script is executed as the main module.
