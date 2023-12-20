#!/usr/bin/env python3
import os
import requests
import datetime
import time
from faker import Faker
from random import randint, choice as rc
from dotenv import load_dotenv

# Local imports
from app import app
from config import db
from models import Recipe, User, Review, Ingredient

load_dotenv()
fake = Faker()

def fetch_and_parse_data(base_api_url):
    all_data = []
    page_count = 0
    max_pages = 10  # Maximum number of pages to fetch

    while base_api_url and page_count < max_pages:
        response = requests.get(base_api_url)
        if response.status_code == 200:
            data = response.json()
            all_data.extend(data['hits'])
            base_api_url = data['_links']['next']['href'] if 'next' in data['_links'] else None
            page_count += 1  # Increment the page counter
        else:
            print(f"Error: {response.status_code} - {response.text}")
            break

    return all_data

def get_recipes(parsed_data):
    users = User.query.all()
    for item in parsed_data:
        recipe_data = item['recipe']
        dish_type = recipe_data['dishType'][0] if 'dishType' in recipe_data else 'Unknown'  # Handle missing dishType

        recipe = Recipe(
            name = recipe_data['label'],
            image = recipe_data['image'],
            description = recipe_data.get('summary', ''),
            steps = recipe_data['instructionLines'],
            tags = recipe_data.get('tags', []),
            cuisine = recipe_data['cuisineType'][0] if 'cuisineType' in recipe_data else 'Unknown',
            meal_type = recipe_data['mealType'][0] if 'mealType' in recipe_data else 'Unknown',
            dish_type = dish_type,
            time = recipe_data['totalTime'],
            user_id = rc(users).id
        )
        db.session.add(recipe)
        for ingredient_data in recipe_data['ingredients']:
            ingredient = Ingredient(
                text=ingredient_data['text'],
                recipe_id=recipe.id,
                food=ingredient_data['food'],
                quantity=ingredient_data['quantity'],
                unit=ingredient_data['measure']
            )
            db.session.add(ingredient)
    db.session.commit()

def fake_reviews():
    users = User.query.all()
    recipes = Recipe.query.all()
    for _ in range(30):
        review = Review(
            rating=randint(1, 5),
            title=fake.sentence(),
            comment=fake.paragraph(),
            created=fake.date_time_this_year(),
            recipe_id=rc(recipes).id,
            user_id=rc(users).id
        )
        db.session.add(review)
    db.session.commit()

if __name__ == "__main__":
    with app.app_context():
        cuisine_types = [ 
    "eastern+europe", 
    "french", 
    "greek", 
    "indian", 
    "italian", 
    "japanese", 
    "korean", 
    "kosher", 
    "mediterranean", 
    "mexican", 
    "middle+eastern", 
    "nordic", 
    "south+american", 
    "south+east+asian", 
    "world"
]
        print("Starting seed...")
        for cuisine in cuisine_types:
            api_url = f'https://api.edamam.com/api/recipes/v2?type=public&app_id=your-ID&app_key=your-key&cuisineType={cuisine}'
            print(f"Fetching recipes for {cuisine} cuisine...")
            parsed_data = fetch_and_parse_data(api_url)
            if parsed_data:
                print("Creating new recipes...")
                get_recipes(parsed_data)

            current_time = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            print(f"Finished fetching {cuisine} cuisine at {current_time}")
            time.sleep(80)  # Sleep for 60 seconds

        print("Creating new reviews...")
        fake_reviews()
        print("Seed complete!")