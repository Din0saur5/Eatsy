from models import db, Recipe  # Your SQLAlchemy Recipe model
from config import app  # Your SQLAlchemy database session
from tqdm import tqdm
import random

def update_meal_types(limit=200):
    # Fetch a limited number of recipes with 'lunch/dinner' as meal_type
    recipes = Recipe.query.filter(Recipe.meal_type == 'lunch/dinner').limit(limit).all()

    for recipe in tqdm(recipes, desc="Updating recipes"):
        # Randomly assign 'lunch' or 'dinner'
        recipe.meal_type = random.choice(['lunch', 'dinner'])
        db.session.add(recipe)

    db.session.commit()
    print(f"Updated {len(recipes)} recipes.")

# Call the function with the desired limit
if __name__ == "__main__":
    with app.app_context():
        update_meal_types(200)