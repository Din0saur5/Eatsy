from models import db, Recipe
from sqlalchemy import func

def delete_duplicate_recipes():
    # Find duplicate recipe names
    duplicates = db.session.query(
        Recipe.name
    ).group_by(
        Recipe.name
    ).having(
        func.count(Recipe.id) > 1
    ).all()

    for name, in duplicates:
        # Get all recipes with this name
        recipes = Recipe.query.filter_by(name=name).order_by(Recipe.created).all()

        # Keep the first one and delete the rest
        for recipe in recipes[1:]:
            db.session.delete(recipe)

    db.session.commit()

if __name__ == "__main__":
    delete_duplicate_recipes()
