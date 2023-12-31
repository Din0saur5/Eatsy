
import os
from dotenv import load_dotenv
load_dotenv()
from flask import request, make_response, session
from flask_restful import Resource
import random
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User, Review, Recipe, Ingredient, Favorite
from collections import defaultdict
import uuid

@app.route('/')
def index():
    return (
    '''<h1>Project Server</h1>
    <h2>Try one of our super fun routes!</h2>
    <ul>
    <li><a href="/recipes">/recipes</a></li>
    </ul>'''
    )


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
            return make_response(user.to_dict(only=('id', 'username',)), 200)
        return make_response({'error':'not loading cookie'}, 401)


class Login(Resource):
    def post(self):
        username = request.json.get('username')
        password = request.json.get('password')
        user = User.query.filter(User.username == username).first()

        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                #print(session['user_id']) 
                return user.to_dict(), 200
        return make_response({'error': '401 Unauthorized'}, 401)

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        response =  make_response({}, 204)
        response.set_cookie('user_id', '', expires=0)
        return response
    
api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')

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
    def get(self):
        recipes = [recipe.to_dict() for recipe in Recipe.query.all()]
        if not recipes:
            return make_response({"message":"Failed to fetch recipes from database"}, 504)
        return make_response(recipes, 200)
    
class CreateRecipe(Resource):
    def post(self):
        try:
            new_recipe = Recipe(
                id = uuid.uuid4(),
                name = request.json.get('name'),
                image = request.json.get('image'),
                description = request.json.get('description'),
                steps = list(request.json.get('steps')),
                is_draft = False,
                tags = request.json.get('tags'),
                cuisine = request.json.get('cuisine'),
                meal_type = request.json.get('meal_type'),
                dish_type = request.json.get('dish_type'),
                time = int(request.json.get('time')),
                user_id = request.json.get('user_id')
            )
            print(new_recipe.id)
            db.session.add(new_recipe)
            print(new_recipe)
            db.session.commit()
            return make_response(new_recipe.to_dict(),201)
        except Exception as e:
            return make_response({"message":str(e)}, 400)
        
api.add_resource(CreateRecipe, '/recipes/create', endpoint='create_recipe')
api.add_resource(AllRecipes, '/recipes', endpoint='recipes')
    
class GetRecipeById(Resource):
    def get(self, id):
        recipe = Recipe.query.filter_by(id=id).first()
        if not recipe:
            return make_response({"message":"Recipe not found"}, 404)
        return make_response(recipe.to_dict(), 200)
api.add_resource(GetRecipeById, '/recipes/<uuid:id>', endpoint='recipe_id')
class ChangeRecipeById(Resource):
    def patch(self, id):
        recipe = Recipe.query.filter(Recipe.id==id).first()
        if recipe:
            try:
                for attr in request.json:
                        setattr(recipe, attr, request.json.get(attr))
                        db.session.commit()
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
            db.session.delete(recipe)
            db.session.commit()
            return make_response({"message":"Recipe deleted"}, 204)

api.add_resource(ChangeRecipeById, '/recipes/change/<uuid:id>')

class GetRecipeByIngredient(Resource):
    def get(self, ingredient):
        limit = request.args.get('limit', 20, type=int)  
        offset = request.args.get('offset', 0, type=int) 
        filtered_recipes = []
        for recipe in Recipe.query.all():
            for ing in recipe.ingredients:
                if recipe not in filtered_recipes and (ingredient in ing.food or ing.food in ingredient):
                    filtered_recipes.append(recipe)
        paginated_recipes = filtered_recipes[offset:offset + limit]
        if not paginated_recipes:
            return make_response({"message":"No matching recipes found"}, 404)
        return make_response([recipe.to_dict() for recipe in paginated_recipes], 200)

api.add_resource(GetRecipeByIngredient, '/recipes/ingredient/<string:ingredient>', endpoint='ingredient')
    
class AllIngredients(Resource):
    def get(self):
        ingredients = [ingredient.to_dict(rules = ('-recipe',)) for ingredient in Ingredient.query.all()]
        if not ingredients:
            return make_response({"message":"Failed to fetch ingredients from database"}, 504)
        return make_response(ingredients, 200)
    
    def post(self):
        try:
            uuidstr = request.json.get('recipe_id')
            print(uuidstr)
            uuidR= uuid.UUID(uuidstr)
            print(type(uuidR))
            print(uuidR)
            new_ingredient = Ingredient(
                text = request.json.get('text'),
                food = request.json.get('food'),
                quantity = float(request.json.get('quantity')),
                unit = request.json.get('unit'),
                recipe_id = uuidR,
            )
            print(new_ingredient.id)
            db.session.add(new_ingredient)
            db.session.commit()
            return make_response(new_ingredient.to_dict(),201)
        except Exception as e:
            print(e)
            return make_response({"message":str(e)}, 400)
api.add_resource(AllIngredients, '/ingredients')

class ChangeIngredientById(Resource):
    def delete(self, id,):
        ingredients = Ingredient.query.filter(Ingredient.recipe_id==id).allows_lambda()
        if not ingredients:
            return make_response({"message":"Ingredient not found"}, 404)
        else:
            for ingredient in ingredients:
                db.session.delete(ingredient)
        db.session.commit()
        return make_response({"message":"Ingredient deleted"}, 204)
    
    def post(self, id):
        try:
            new_ingredient = Ingredient(
                text=request.json.get('text'),
                food=request.json.get('food'),
                quantity=float(request.json.get('quantity')),
                unit=request.json.get('unit'),
                recipe_id=id,  # Use 'id' directly here.
            )
            db.session.add(new_ingredient)
            db.session.commit()
            return make_response(new_ingredient.to_dict(), 201)
        except Exception as e:
            print(e)
            return make_response({"message": str(e)}, 400)

api.add_resource(ChangeIngredientById, '/ingredients/<uuid:id>')

class AllReviews(Resource):
    def get(self):
        reviews = [review.to_dict(rules = ('-user', '-recipe')) for review in Review.query.all()]
        if not reviews:
            return make_response({"message":"Failed to fetch reviews from database"}, 504)
        return make_response(reviews, 200)
    def post(self):
        try:
            uuidstr1 = request.json.get('recipe_id')
            uuidstr2 = request.json.get('user_id')
            uuidRec = uuid.UUID(uuidstr1)
            uuidUse = uuid.UUID(uuidstr2)
            new_review = Review(
                title=request.json.get('title'),
                comment=request.json.get('comment'),
                rating=request.json.get('rating'),
                user_id = uuidUse,
                recipe_id = uuidRec
            )
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
        limit = request.args.get('limit', 20, type=int)
        offset = request.args.get('offset', 0, type=int)

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


class RecipesByUser(Resource):
    def get(self, user_id):
        limit = request.args.get('limit', 10, type=int)
        offset = request.args.get('offset', 0, type=int)
        recipes = Recipe.query.filter(Recipe.user_id == user_id).offset(offset).limit(limit).all()

        if recipes:
            rb = [recipe.to_dict(only=('reviews.rating', 'image', 'name', 'time', 'id')) for recipe in recipes]
            return make_response(rb, 200)
        else:
            return make_response({"message": "No recipes found by this user"}, 404)
api.add_resource(RecipesByUser, '/rbu/<user_id>')
class GetFavoriteRecipes(Resource):
    def get(self, user_id):
        limit = request.args.get('limit', 10, type=int)
        offset = request.args.get('offset', 0, type=int)

        fS = Favorite.query.filter(Favorite.user_id==user_id).all()
        if len(fS) > 0:
            recipe_ids = [f.recipe_id for f in fS]
            recipes = Recipe.query.filter(Recipe.id.in_(recipe_ids)).offset(offset).limit(limit).all()
            rb = [recipe.to_dict(only=('reviews.rating', 'image', 'name', 'time', 'id')) for recipe in recipes]
            return make_response(rb, 200)
        else:
            return make_response({"message": "No favorite recipes found"}, 404)

                                 
api.add_resource(GetFavoriteRecipes, '/favs/<user_id>')

class RecipeNames(Resource):
    def get(self):
        recipes = Recipe.query.with_entities(Recipe.id, Recipe.name).all()
        sorted_recipes = {}
        for recipe in recipes:
            first_letter = recipe.name[0].upper()
            if first_letter not in sorted_recipes:
                sorted_recipes[first_letter] = []
            sorted_recipes[first_letter].append({"id": str(recipe.id), "name": recipe.name})
        for letter in sorted_recipes:
            sorted_recipes[letter].sort(key=lambda r: r['name'])
        return sorted_recipes

api.add_resource(RecipeNames, '/recipes/names')

class GetRecipeByCuisineType(Resource):
    def get(self, cuisine_type):
        limit = request.args.get('limit', 20, type=int)
        offset = request.args.get('offset', 0, type=int)
        recipes = Recipe.query.filter(Recipe.cuisine == cuisine_type)\
                              .offset(offset)\
                              .limit(limit)\
                              .all()
        if not recipes:
            return make_response({"message": "No recipes found for this cuisine type"}, 404)
        return make_response([recipe.to_dict() for recipe in recipes], 200)
# Add the resource to the API
api.add_resource(GetRecipeByCuisineType, '/recipes/cuisine/<string:cuisine_type>')

class GetRecipesByCuisine(Resource):
    def get(self):
        limit = request.args.get('limit', 10, type=int)
        offset = request.args.get('offset', 0, type=int)
        cuisine_filter = request.args.get('cuisine', type=str)
        query = Recipe.query
        if cuisine_filter:
            query = query.filter(Recipe.cuisine == cuisine_filter)
        recipes = query.offset(offset).limit(limit).all()
        organized_by_cuisine = defaultdict(list)
        for recipe in recipes:
            organized_by_cuisine[recipe.cuisine].append(recipe.to_dict())
        return dict(organized_by_cuisine)

api.add_resource(GetRecipesByCuisine, '/recipes/by-cuisine')

class RandomRecipes(Resource):
    def get(self):
        try:
            all_recipes = Recipe.query.all()
            random_recipes = random.sample(all_recipes, min(len(all_recipes), 3))
            return [recipe.to_dict() for recipe in random_recipes], 200
        except ValueError:
            return {'message': 'Not enough recipes in the database to fetch three random ones'}, 400

api.add_resource(RandomRecipes, '/recipes/random')


port = os.getenv('SERVER_PORT')
debug = os.getenv('SERVER_DEBUG')
host = os.getenv('SERVER_HOST')
if __name__ == '__main__':
    app.run(host = host, port = port, debug = debug)