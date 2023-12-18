#/server/app.py
#!/usr/bin/env python3

# Standard library imports
import os
from dotenv import load_dotenv

load_dotenv()
# Remote library imports
from flask import request, make_response, jsonify
from flask_restful import Resource
from flask_cors import cross_origin
# Local imports
from config import *
# Add your model imports
from models import User, Review, Recipe, Ingredient

# app.py
from flask import Flask, request, jsonify



@app.route('/')
def index():
    return 
'''<h1>Project Server</h1>
<h2>Try one of our super fun routes!</h2>
<ul>
<li><a href="/recipes">/recipes</a></li>
</ul>'''

class AllUsers(Resource):
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/signup', methods=['POST'])
    def get(self):
        users = User.query.all()
        if not users:
            rb = {
                "no":"users"
            } 
        else:
            rb = [user.to_dict(rules=('-reviews','-recipes')) for user in users]
        return make_response(rb, 200)
    def post(self):
        try:
            new_user = User(
                id = request.json.get('id'),
                username = request.json.get('username'),
                first_name = request.json.get('first_name'),
                last_name = request.json.get('last_name'),
            )
            db.session.add(new_user)
            db.session.commit()
            rb = new_user.to_dict(rules=('-reviews','-recipes'))
            return make_response(rb,201)
        except ValueError:
            rb = {
                "errors": ["validation errors"]
                }
            return make_response(rb, 400)
        
api.add_resource(AllUsers, '/users')
class UserById(Resource):
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/private/*', methods=['GET'])
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/private/account', methods=['PATCH', 'DELETE'])
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"message":"User not found"}, 404)
        return make_response(user.to_dict(rules=('-reviews','-recipes')), 200)

    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"message":"User not found"}, 404)
        for key in request.json:
            setattr(user, key, request.json[key])
        db.session.commit()
        return make_response(user.to_dict(rules=('-reviews','-recipes')), 200)

    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"message":"User not found"}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({"message":"User deleted"}, 200)

api.add_resource(UserById, '/users/<uuid:id>')


 
class AllRecipes(Resource):
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/private/create-recipe', methods=['POST'])
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/*', methods=['GET'])
    def get(self):
        recipes = [recipe.to_dict() for recipe in Recipe.query.all()]
        if not recipes:
            return make_response({"message":"Failed to fetch recipes from database"}, 504)
        return make_response(recipes, 200)
    def post(self):
        try:
            new_recipe = Recipe(
                name = request.json.get('name'),
                image = request.json.get('image'),
                description = request.json.get('description'),
                steps = request.json.get('steps'),
                is_draft = request.json.get('is_draft'),
                tags = request.json.get('tags'),
                cuisine = request.json.get('cuisine'),
                meal_type = request.json.get('meal_type'),
                dish_type = request.json.get('dish_type'),
                time = request.json.get('time'),
                user_id = request.json.get('user_id')
            )
            db.session.add(new_recipe)
            db.session.commit()
            ingredients = []
            for ingredient in request.json.get('ingredients'):
                new_ingredient = Ingredient(
                    text = ingredient.get('text'),
                    food = ingredient.get('food'),
                    quantity = ingredient.get('quantity'),
                    unit = ingredient.get('unit'),
                    recipe_id = new_recipe.id
                )
                ingredients.append(new_ingredient)
            db.session.add_all(ingredients)
            db.session.commit()
            return make_response(new_recipe.to_dict(),201)
        except Exception as e:
            return make_response({"message":str(e)}, 400)
        
    
api.add_resource(AllRecipes, '/recipes')
    
class GetRecipeById(Resource):
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/*', methods=['GET'])
    
    def get(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if not recipe:
            return make_response({"message":"Recipe not found"}, 404)
        return make_response(recipe.to_dict(), 200)
api.add_resource(GetRecipeById, '/recipes/<uuid:id>')
class ChangeRecipeById(Resource):
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/private/update-recipe/*', methods=['PATCH', 'DELETE'])
    def patch(self, id, user_id):
        recipe = Recipe.query.filter_by(id=id).first()
        if not recipe:
            return make_response({"message":"Recipe not found"}, 404)
        if recipe.user_id != user_id:
            return make_response({"message":"You do not have permission to update this recipe."}, 403)
        for key in request.json:
            setattr(recipe, key, request.json[key])
        db.session.commit()
        return make_response(recipe.to_dict(), 200)

    def delete(self, id, user_id):
        recipe = Recipe.query.filter_by(id=id).first()
        if not recipe:
            return make_response({"message":"Recipe not found"}, 404)
        if recipe.user_id != user_id:
            return make_response({"message":"You do not have permission to delete this recipe."}, 403)
        db.session.delete(recipe)
        db.session.commit()
        return make_response({"message":"Recipe deleted"}, 204)

api.add_resource(ChangeRecipeById, '/recipes/<uuid:id>/<uuid:user_id>')

class GetRecipeByIngredient(Resource):
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/*', methods=['GET'])
    def get(self, ingredient):
        recipes = []
        for recipe in Recipe.query.all():
            for ing in recipe.ingredients:
                if recipe not in recipes and (ingredient in ing.food or ing.food in ingredient):
                    recipes.append(recipe)
        if not recipes:
            return make_response({"message":"No matching recipes found"}, 404)
        return make_response([recipe.to_dict() for recipe in recipes], 200)
api.add_resource(GetRecipeByIngredient, '/recipes/ingredient/<string:ingredient>')
    
class AllIngredients(Resource):
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/private/update-recipe/*', methods=['POST'])
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/*', methods=['GET'])
    def get(self):
        ingredients = [ingredient.to_dict(rules = ('-recipe',)) for ingredient in Ingredient.query.all()]
        if not ingredients:
            return make_response({"message":"Failed to fetch ingredients from database"}, 504)
        return make_response(ingredients, 200)

    def post(self):
        try:
            data = request.get_json()
            new_ingredient = Ingredient(**data)
            db.session.add(new_ingredient)
            db.session.commit()
            return make_response(new_ingredient.to_dict(),201)
        except Exception as e:
            return make_response({"message":str(e)}, 400)

api.add_resource(AllIngredients, '/ingredients')

class ChangeIngredientById(Resource):
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/private/update-recipe/*', methods=['PATCH', 'DELETE'])

    def patch(self, id, user_id):
        ingredient = Ingredient.query.filter_by(id=id).first()
        if not ingredient:
            return make_response({"message":"Ingredient not found"}, 404)
        if ingredient.recipe.user_id != user_id:
            return make_response({"message":"You do not have permission to update this ingredient."}, 403)
        for key in request.json:
            setattr(ingredient, key, request.json[key])
        db.session.commit()
        return make_response(ingredient.to_dict(), 200)

    def delete(self, id, user_id):
        ingredient = Ingredient.query.filter_by(id=id).first()
        if not ingredient:
            return make_response({"message":"Ingredient not found"}, 404)
        if ingredient.recipe.user_id != user_id:
            return make_response({"message":"You do not have permission to delete this ingredient."}, 403)
        db.session.delete(ingredient)
        db.session.commit()
        return make_response({"message":"Ingredient deleted"}, 204)

api.add_resource(ChangeIngredientById, '/ingredients/<uuid:id>/<uuid:user_id>')

class AllReviews(Resource):
    # @recipeId_cors(origins=os.environ.get('CORS_ORIGIN') + '/private/recipe/*', methods=['POST'])
    # @cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/*', methods=['GET'])
    
    def get(self):
        reviews = [review.to_dict(rules = ('-user', '-recipe')) for review in Review.query.all()]
        if not reviews:
            return make_response({"message":"Failed to fetch reviews from database"}, 504)
        return make_response(reviews, 200)

    def post(self):
        try:
            data = request.get_json()
            new_review = Review(**data)
            db.session.add(new_review)
            db.session.commit()
            return make_response(new_review.to_dict(),201)
        except Exception as e:
            return make_response({"message":str(e)}, 400)

api.add_resource(AllReviews, '/reviews')

class ReviewById(Resource):
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/private/recipe/*', methods=['PATCH', 'DELETE'])

    def patch(self, id, user_id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            return make_response({"message":"Review not found"}, 404)
        if review.user_id != user_id:
            return make_response({"message":"You do not have permission to update this review."}, 403)
        for key in request.json:
            setattr(review, key, request.json[key])
        db.session.commit()
        return make_response(review.to_dict(), 200)

    def delete(self, id, user_id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            return make_response({"message":"Review not found"}, 404)
        if review.user_id != user_id:
            return make_response({"message":"You do not have permission to delete this review."}, 403)
        db.session.delete(review)
        db.session.commit()
        return make_response({"message":"Review deleted"}, 204)

api.add_resource(ReviewById, '/reviews/<uuid:id>/<uuid:user_id>')


@app.route('/')
def home():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)