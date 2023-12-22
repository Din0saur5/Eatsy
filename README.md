# Recipe Management System API Documentation

## Overview
This documentation details the API endpoints for the Recipe Management System, handling operations related to recipes, ingredients, users, reviews, and sessions.

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

#### `PATCH /ingredients/<uuid:id>`
- **Description**: Updates an ingredient.
- **Request Body**: Ingredient attributes.
- **Response**: Updated ingredient details or error message.

#### `DELETE /ingredients/<uuid:id>`
- **Description**: Deletes an ingredient.
- **Response**: Success or error message.

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

#### `POST /favorites/<uuid:rec_id>/<uuid:user_id>`
- **Description**: Manages favorites.
- **Request Body**: `rec_id`, `user_id`.
- **Response**: Updated favorites or error message.

### Server Configuration
- The server runs on the port, host, and debug mode as per environment variables.
- It starts when the script is executed as the main module.
