
#!/usr/bin/env python3
import os
from dotenv import load_dotenv

load_dotenv()
from random import randint, choice as rc
import requests
import json
from faker import Faker
# Local imports
from app import app
from config import db
from models import Recipe, User, Review, Ingredient

fake = Faker()

def fetch_and_parse_data(api_url):
    try:
        # Make a GET request to the API
        response = requests.get(api_url)

        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Parse the JSON data
            data = response.json()

            # Return the parsed data
            return data

        else:
            print(f"Error: {response.status_code} - {response.text}")

    except Exception as e:
        print(f"An error occurred: {e}")

    # Return None in case of errors
    return None

def get_recipes(parsed_data):
    users = User.query.all()
    ingredients = []
    # Example: Create Python objects from the parsed data
    for item in parsed_data['hits']:
        recipe = Recipe(
            name = item['recipe']['label'],
            image = item['recipe']['image'],
            description = item['recipe'].get('summary', ''),
            steps = item['recipe']['instructionLines'],
            tags = item['recipe'].get('tags', []),
            cuisine = item['recipe']['cuisineType'][0],
            meal_type = item['recipe']['mealType'][0],
            dish_type = item['recipe']['dishType'][0],
            time = item['recipe']['totalTime'],
            user_id = rc(users).id
        )
        db.session.add(recipe)
        db.session.commit()
        ingredientArray = item['recipe']['ingredients']
        for ingredient in ingredientArray:
            ingredient = Ingredient(
                text = ingredient['text'],
                recipe_id = recipe.id,
                food = ingredient['food'],
                quantity = ingredient['quantity'],
                unit = ingredient['measure']
            )
            ingredients.append(ingredient)
    db.session.add_all(ingredients)
    db.session.commit()

def fake_reviews():
    users = User.query.all()
    recipes = Recipe.query.all()
    reviews = []
    for i in range(30):
        review = Review(
            rating = randint(1,5),
            title = fake.sentence(),
            comment = fake.paragraph(),
            created = fake.date_time_this_year(),
            recipe_id = rc(recipes).id,
            user_id = rc(users).id
        )
        reviews.append(review)
    db.session.add_all(reviews)
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        print("Starting seed...")
        api_url = os.getenv('SEED_API_URL')
        
        # Fetch and parse data
        parsed_data = fetch_and_parse_data(api_url)
        if parsed_data:
            print("Deleting existing data...")
            Review.query.delete()
            Ingredient.query.delete()
            Recipe.query.delete()
            print("Creating new recipes...")
            get_recipes(parsed_data)
            print("Creating new reviews...")
            fake_reviews()
            print("Seed complete!")
        else:
            print("Error: Failed to fetch and parse data")