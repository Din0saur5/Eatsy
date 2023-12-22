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

# def fake_reviews():
#     users = User.query.all()
#     recipes = Recipe.query.all()
#     for _ in range(30):
#         review = Review(
#             rating=randint(1, 5),
#             title=fake.sentence(),
#             comment=fake.paragraph(),
#             created=fake.date_time_this_year(),
#             recipe_id=rc(recipes).id,
#             user_id=rc(users).id
#         )
#         db.session.add(review)
#     db.session.commit()
    
    
def fake_users():
    
    for _ in range(30):
        print("Email:", fake.email())
        print("Username:", fake.username())
        print("Password:", fake.password())
        print("First Name:", fake.first_name())
        print("Last Name:", fake.last_name())
    #     user = User(
    #         email: fake-email,
    #         username: fake-user_name,
    #         password: fake-password,
    #         first_name: fake-first_name,
    #         last_name: fake-last_name,
    #     )
    #     db.session.add(user)
    # db.session.commit
    
fake_users()