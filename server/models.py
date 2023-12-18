#server/models.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from config import *
import uuid
from sqlalchemy.dialects.postgresql import UUID

class User(db.Model, SerializerMixin):
   __tablename__ = 'users'
   id = db.Column(UUID(as_uuid=True), primary_key=True)
   username = db.Column(db.String(), unique=True, nullable=False)
   first_name = db.Column(db.String(), nullable=False)
   last_name = db.Column(db.String(), nullable=False)
   created = db.Column(db.DateTime, server_default=db.func.now())
   
   serialize_rules = ('-reviews', '-recipes')
   
   reviews = db.relationship('Review', back_populates='user', cascade="all, delete-orphan")
   recipes = db.relationship('Recipe', back_populates='user', cascade="all, delete-orphan")
   
   def __repr__(self):
       return f'<User {self.username}: {self.display_name}, {self.email}>'


class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    rating = db.Column(db.Integer)
    title = db.Column(db.String)
    title = db.Column(db.String)
    comment = db.Column(db.String)
    created = db.Column(db.DateTime, server_default=db.func.now())
    
    user_id = db.Column(db.Uuid, db.ForeignKey('users.id'))
    recipe_id = db.Column(db.Uuid, db.ForeignKey('recipes.id'))
    
    serialize_rules = ('-user.reviews', '-recipe.reviews')
    
    user = db.relationship('User', back_populates='reviews')
    recipe = db.relationship('Recipe', back_populates='reviews')

class Recipe(db.Model, SerializerMixin):
    __tablename__ = 'recipes'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = db.Column(db.String, nullable=False)
    image = db.Column(db.String)
    description = db.Column(db.String)
    steps = db.Column(db.ARRAY(db.String))
    is_draft = db.Column(db.Boolean, default=False)
    created = db.Column(db.DateTime, index=True, server_default=db.func.now())
    tags = db.Column(db.ARRAY(db.String))
    cuisine = db.Column(db.String)
    meal_type = db.Column(db.String)
    dish_type = db.Column(db.String)
    time = db.Column(db.Integer)
    
    user_id = db.Column(db.Uuid, db.ForeignKey('users.id'))
    
    serialize_rules = ('-user.recipes', '-ingredients.recipe', '-reviews.recipe')
    
    user = db.relationship('User', back_populates='recipes')
    ingredients = db.relationship('Ingredient', back_populates='recipe', cascade="all, delete-orphan")
    reviews = db.relationship('Review', back_populates='recipe', cascade="all, delete-orphan")
    
class Ingredient(db.Model, SerializerMixin):
    __tablename__ = 'ingredients'
    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    text = db.Column(db.String)
    food = db.Column(db.String)
    quantity = db.Column(db.Float)
    unit = db.Column(db.String)
    created = db.Column(db.DateTime, server_default=db.func.now())
    
    recipe_id = db.Column(db.Uuid, db.ForeignKey('recipes.id'))
    
    serialize_rules = ('-recipe',)
    
    recipe = db.relationship('Recipe', back_populates='ingredients')