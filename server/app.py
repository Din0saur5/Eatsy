#/server/app.py
#!/usr/bin/env python3

# Standard library imports
import os
from dotenv import load_dotenv

load_dotenv()
# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
# from flask_cors import cross_origin, CORS
# Local imports
from config import app, db, api
# Add your model imports
from models import User, Review, Recipe, Ingredient, Favorite

# app.py




@app.route('/')
def index():
    return (
    '''<h1>Project Server</h1>
    <h2>Try one of our super fun routes!</h2>
    <ul>
    <li><a href="/recipes">/recipes</a></li>
    </ul>'''
    )

# @app.before_request
# def check_if_logged_in():
#     open_access_list = [
#         'signup',
#         'login',
#         'check_session',
#         'recipes',
#         'ingredient'
#         'recip_id'
#         'home'
#     ]

#     if (request.endpoint) not in open_access_list and (not session.get('user_id')):
#         return {'error': '401 Unauthorized'}, 401

# @app.route('/set-cookie')
# def set_cookie():
#     # Example of setting a session variable
#     session['user_id'] = 'some_user_id'
#     return 'Cookie is set'

class Signup(Resource):
    
    def post(self):

       

        username = request.json.get('username')
        email = request.json.get('email')
        password = request.json.get('password')
        first_name = request.json.get('first_name')
        last_name = request.json.get('last_name')

        user = User(
            username= username,
            email = email,
            first_name=first_name,
            last_name=last_name,
            
        )

        # the setter will encrypt this
        user.password_hash = password
        print(user)
        try:

            db.session.add(user)
            print(user)
            db.session.commit()

            session['user_id'] = user.id
            print(session['user_id']) 
            return user.to_dict(), 201

        except IntegrityError:

            return {'error': '422 Unprocessable Entity'}, 422
        

class CheckSession(Resource):

    def get(self):
        
        user_id = session.get('user_id')
        print(user_id)
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return make_response(user.to_dict(rules=('-favorites','-created',)), 200)
        
        return make_response({'error':'not loading cookie'}, 401)


class Login(Resource):
    
    def post(self):

        

        username = request.json.get('username')
        password = request.json.get('password')

        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):

                session['user_id'] = user.id
                print(session['user_id']) 
                return user.to_dict(), 200

        return make_response({'error': '401 Unauthorized'}, 401)

class Logout(Resource):

    def delete(self):

        session.pop('user_id', None)
        response =  make_response({}, 204)
        response.set_cookie('user_id', '', expires=0)
        return response

api.add_resource(Signup, '/signup', endpoint='signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')

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
    
class CreateRecipe(Resource):
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
            print(new_recipe)
            db.session.add(new_recipe)
            db.session.commit()
            print(new_recipe)
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
        
api.add_resource(CreateRecipe, '/recipes/create', endpoint='create_recipe')
api.add_resource(AllRecipes, '/recipes', endpoint='recipes')
    
class GetRecipeById(Resource):
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/*', methods=['GET'])
    
    def get(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if not recipe:
            return make_response({"message":"Recipe not found"}, 404)
        return make_response(recipe.to_dict(), 200)
api.add_resource(GetRecipeById, '/recipes/<uuid:id>', endpoint='recipe_id')
class ChangeRecipeById(Resource):
    #@cross_origin(origins=os.environ.get('CORS_ORIGIN') + '/private/update-recipe/*', methods=['PATCH', 'DELETE'])
    def patch(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if recipe:
            try:
                for attr in request.json:
                    if attr != 'ingredients':
                        setattr(recipe, attr, request.json[attr])
                        db.session.commit()
                    else:
                        for ingredient in request.json.get('ingredients'):
                            i = Ingredient.query.filter(Ingredient.id == ingredient.get(id)).first()
                            if i:
                                try:
                                    for attr in ingredient:
                                        setattr(i, attr, ingredient[attr])
                                        db.session.commit()
                                        print('success')
                                except ValueError: 
                                    rb = {
                                    "errors": ["validation errors"]
                                    }
                                    print('fail')
                                    continue
                            else:
                                return make_response({"message":"Ingredient not found"}, 404)
                  
                return make_response(recipe.to_dict(), 200)
            except ValueError: 
                rb = {
                "errors": ["validation errors"]
                }
                return make_response(rb, 400)  
        else:
                return make_response({"message":"Recipe not found"}, 404)

    def delete(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if not recipe:
            return make_response({"message":"Recipe not found"}, 404)
        else:
            
            # for ingredient in request.json.get('ingredients'):
            #     i = Ingredient.query.filter(Ingredient.id == ingredient.get(id)).first()
            #     if i:
            #         try:
            #             for attr in ingredient:
            #                 setattr(i, attr, ingredient[attr])
            #                 db.session.commit()
            #             return make_response(recipe.to_dict(), 200)
            #         except ValueError: 
            #             rb = {
            #             "errors": ["validation errors"]
            #             }
            #             return make_response(rb, 400) 
            #     else:
            #         return make_response({"message":"Ingredient not found"}, 404)
                
            db.session.delete(recipe)
            db.session.commit()
            return make_response({"message":"Recipe deleted"}, 204)

api.add_resource(ChangeRecipeById, '/recipes/change/<uuid:id>')

class GetRecipeByIngredient(Resource):
    def get(self, ingredient):
        limit = request.args.get('limit', 20, type=int)  # Default to 10 if not provided
        offset = request.args.get('offset', 0, type=int)  # Default to 0 if not provided

        filtered_recipes = []
        for recipe in Recipe.query.all():
            for ing in recipe.ingredients:
                if recipe not in filtered_recipes and (ingredient in ing.food or ing.food in ingredient):
                    filtered_recipes.append(recipe)

        # Apply pagination after filtering
        paginated_recipes = filtered_recipes[offset:offset + limit]

        if not paginated_recipes:
            return make_response({"message":"No matching recipes found"}, 404)
        return make_response([recipe.to_dict() for recipe in paginated_recipes], 200)

api.add_resource(GetRecipeByIngredient, '/recipes/ingredient/<string:ingredient>', endpoint='ingredient')
    
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

    def patch(self, id):
        ingredient = Ingredient.query.filter_by(id=id).first()
        if not ingredient:
            return make_response({"message":"Ingredient not found"}, 404)
        for key in request.json:
            setattr(ingredient, key, request.json[key])
        db.session.commit()
        return make_response(ingredient.to_dict(), 200)

    def delete(self, id, user_id):
        ingredient = Ingredient.query.filter_by(id=id).first()
        if not ingredient:
            return make_response({"message":"Ingredient not found"}, 404)
        db.session.delete(ingredient)
        db.session.commit()
        return make_response({"message":"Ingredient deleted"}, 204)

api.add_resource(ChangeIngredientById, '/ingredients/<uuid:id>')

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
            return make_response(new_review.to_dict(rules=('-user', '-recipe')),201)
        except Exception as e:
            return make_response({"message":str(e)}, 400)

api.add_resource(AllReviews, '/reviews')

class GetRecipeByIngredient(Resource):
    def get(self, ingredient):
        return make_response({"message": f"Ingredient received: {ingredient}"}, 200)

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

class GetRecipeByMealType(Resource):
    def get(self, meal_type):
        # Fetch recipes filtered by meal type with pagination
        limit = request.args.get('limit', 20, type=int)  # Default to 10 if not provided
        offset = request.args.get('offset', 0, type=int)  # Default to 0 if not provided

        recipes = Recipe.query.filter(Recipe.meal_type == meal_type)\
                              .offset(offset)\
                              .limit(limit)\
                              .all()

        if not recipes:
            return make_response({"message": "No recipes found for this meal type"}, 404)
        return make_response([recipe.to_dict() for recipe in recipes], 200)

# Add the resource to the API
api.add_resource(GetRecipeByMealType, '/recipes/meal_type/<string:meal_type>')



class FavoriteRecipe(Resource):
    def post(self, rec_id, user_id):
        fav = Favorite.query.filter_by(user_id = user_id, recipe_id = rec_id).first()
        if fav:
            db.session.delete(fav)
            db.session.commit()
            return make_response({"message": "Recipe removed from favorites"}, 200)
        else:
            favorite = Favorite(
                user_id = user_id,
                recipe_id = rec_id
            )
            db.session.add(favorite)
            db.session.commit()
            return make_response(favorite.to_dict(rules=('-user', '-recipe')), 201)

api.add_resource(FavoriteRecipe, '/favorites/<uuid:rec_id>/<uuid:user_id>')

class RecipeNames(Resource):
    def get(self):
        # Query both the names and IDs of the recipes from the database
        recipes = Recipe.query.with_entities(Recipe.id, Recipe.name).all()

        # Create a dictionary to hold the recipes sorted by first letter
        sorted_recipes = {}
        for recipe in recipes:
            first_letter = recipe.name[0].upper()
            if first_letter not in sorted_recipes:
                sorted_recipes[first_letter] = []
            sorted_recipes[first_letter].append({"id": str(recipe.id), "name": recipe.name})  # Convert UUID to string

        # Sort the recipes under each letter
        for letter in sorted_recipes:
            sorted_recipes[letter].sort(key=lambda r: r['name'])

        return sorted_recipes


# Add the resource to the API
api.add_resource(RecipeNames, '/recipes/names')

class GetRecipeByCuisineType(Resource):
    def get(self, cuisine_type):
        # Fetch recipes filtered by cuisine type with pagination
        limit = request.args.get('limit', 20, type=int)  # Default to 20 if not provided
        offset = request.args.get('offset', 0, type=int)  # Default to 0 if not provided

        recipes = Recipe.query.filter(Recipe.cuisine == cuisine_type)\
                              .offset(offset)\
                              .limit(limit)\
                              .all()

        if not recipes:
            return make_response({"message": "No recipes found for this cuisine type"}, 404)
        return make_response([recipe.to_dict() for recipe in recipes], 200)

# Add the resource to the API
api.add_resource(GetRecipeByCuisineType, '/recipes/cuisine/<string:cuisine_type>')




port = os.getenv('SERVER_PORT')
debug = os.getenv('SERVER_DEBUG')
host = os.getenv('SERVER_HOST')
if __name__ == '__main__':
    app.run(host = host, port = 5555, debug = debug)