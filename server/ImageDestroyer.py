from flask import Flask
from config import app
from models import db, Recipe
import requests
from tqdm import tqdm

def check_and_delete_inaccessible_images():
    with app.app_context():  # This creates the necessary application context
        recipes = Recipe.query.all()
        inaccessible_recipes = []

        print("Checking image accessibility...")
        for recipe in tqdm(recipes, desc="Processing", unit="recipe"):
            try:
                response = requests.head(recipe.image, allow_redirects=True, timeout=5)
                if response.status_code == 403:
                    inaccessible_recipes.append(recipe)
            except requests.RequestException as e:
                print(f"Error checking image for recipe {recipe.id}: {e}")


    # Reporting the results
    count = len(inaccessible_recipes)
    print(f"Found {count} recipes with inaccessible images.")

    # Ask for confirmation before deletion
    if count > 0:
        confirm = input("Do you want to delete these recipes? (yes/no): ")
        if confirm.lower() == 'yes':
            for recipe in inaccessible_recipes:
                print(f"Deleting recipe {recipe.id}.")
                db.session.delete(recipe)
            db.session.commit()
            print("Deletion completed.")
        else:
            print("Deletion aborted.")
    else:
        print("No inaccessible images found.")

if __name__ == "__main__":
    check_and_delete_inaccessible_images()
