from faker import Faker
import random
from tqdm import tqdm
from models import db, User, Recipe, Review
from config import app

fake = Faker()

# Food-related sentences or phrases
food_phrases = [
    "Delicious and mouth-watering",
    "The flavors were amazing",
    "Absolutely loved the presentation",
    "A perfect blend of spices",
    "Tasty and satisfying",
    "A culinary masterpiece",
    "The aroma was heavenly",
    "Delectable to the last bite",
    "A unique twist on traditional flavors",
    "Scrumptious and flavorful",
    "The dish had a heavenly taste",
    "Every bite was a delightful experience",
    "Savoring the rich and authentic flavors",
    "A symphony of taste and texture",
    "Exquisite and perfectly cooked",
    "A feast for the senses",
    "The taste lingered beautifully",
    "A true culinary delight",
    "Unforgettable and delectable",
    "Pure gastronomic joy",
    "A masterful creation of flavors",
    "So satisfying and comforting",
    "Innovative and wonderfully seasoned",
    "Tantalizing to the taste buds",
    "A beautiful blend of ingredients",
    "The epitome of fine dining",
    "Remarkably flavorful and fresh",
    "An inspiring and memorable meal",
    "Truly top-notch in every aspect",
    "The essence of gourmet cuisine",
    "A harmonious blend of flavors",
    "Each bite was a revelation",
    "Luxuriously rich and decadent",
    "Crafted with culinary expertise",
    "A delightful culinary journey",
    "Elegantly presented and prepared",
    "The perfect culinary indulgence",
    "A dish bursting with creativity",
    "An unparalleled dining experience",
    "Sophisticated in flavor and presentation",
    "A celebration of flavors and textures",
    "Magnificently executed dishes",
    "An artistic culinary expression",
    "Intriguing flavors, perfectly combined",
    "A splendid symphony of tastes",
    "Culinary artistry at its finest",
    "Exceptionally tantalizing and satisfying",
    "A memorable and exquisite taste",
    "Dishes that delight and inspire",
    "A showcase of culinary excellence",
    "Mouth-watering and visually stunning",
    "A unique culinary masterpiece",
    "Sensational flavors in every dish",
    "An experience of pure flavor bliss",
    "A dish that dances on the palate",
    "Rich in flavor and beautifully crafted",
    "A sumptuous and unforgettable meal",
    "A joyous celebration of food",
    "Every ingredient sang harmoniously",
    "A magical combination of flavors",
    "A taste that transports you",
    "Sublime textures and flavors",
    "A dish full of delightful surprises",
    "Flavors that resonate with sophistication",
    "The pinnacle of culinary art",
    "A testament to gourmet excellence",
    "A dish that captivates the senses",
    "An artful and flavor-packed creation",
    "A brilliant composition of taste",
    "A true feast for the taste buds",
    "Meticulously prepared and presented",
    "A divine and indulgent experience"
]
food_title_phrases = [
    "Mouthwatering Delight",
    "Culinary Masterpiece",
    "Flavor Fiesta",
    "Delicious Dish",
    "Savory Sensation",
    "Tasty Treat",
    "Heavenly Dish",
    "Gourmet Experience",
    "Divine Flavor",
    "Exquisite Cuisine",
    "Perfect Plate",
    "Delectable Delight",
    "Taste Explosion",
    "Flavorful Journey",
    "Gastronomic Wonder",
    "A Taste of Heaven",
    "Epicurean Delight",
    "Flavors Galore",
    "The Perfect Dish",
    "Sensational Eats",
    "Culinary Genius",
    "Gourmet's Choice",
    "A Flavorful Affair",
    "Dish to Remember",
    "Palate Pleaser",
    "Spectacular Spread",
    "Taste Bud Temptation",
    "Divine Dining",
    "Foodie's Fantasy",
    "Heaven on a Plate",
    "Magical Meal",
    "Cuisine Excellence",
    "Delectable Feast",
    "Flavor Symphony",
    "Gastronomical Adventure",
    "Luscious Bites",
    "Savory Delights",
    "Chef's Masterpiece",
    "Epic Flavor Journey",
    "Food Artistry",
    "Gourmet Perfection",
    "Irresistible Dish",
    "A Culinary Triumph",
    "Dining Elegance",
    "Flavorful Feast",
    "Innovative Eats",
    "Scrumptious Spread",
    "Tantalizing Tastes",
    "Charming Cuisine",
    "Delightful Dish",
    "Flavor Extravaganza",
    "Gastronomic Gem",
    "Plate of Perfection",
    "Taste Sensation",
    "Ambrosial Experience",
    "Cuisine Celebration",
    "Fusion of Flavors",
    "Gourmet Marvel",
    "Indulgent Plate",
    "Savory Masterpiece",
    "Taste of Paradise",
    "Blissful Bites",
    "Creative Cuisine",
    "Delicious Creations",
    "Elegant Eats",
    "Flavor Wonderland",
    "Gastronomic Delight",
    "Innovative Cuisine",
    "Palate Paradise",
    "Spectacular Cuisine",
    "The Art of Cooking",
    "Culinary Dream",
    "Dish of the Day",
    "Exquisite Eats",
    "Flavor Odyssey",
    "Gourmet Adventure",
    "Inspired Cuisine",
    "Luxury on a Plate"
]
def generate_food_title():
    """ Generate a food-related review title. """
    return random.choice(food_title_phrases)

def generate_food_review():
    """ Generate a food-related review sentence. """
    main_phrase = random.choice(food_phrases)  # Assuming food_phrases is already defined
    additional_comment = fake.sentence()
    return f"{main_phrase}. {additional_comment}"

def generate_fake_reviews(limit=600):
    with app.app_context():
        users = User.query.all()
        recipes = Recipe.query.all()

        for _ in tqdm(range(limit), desc="Generating reviews"):
            user = random.choice(users)
            recipe = random.choice(recipes)
            review = Review(
                rating=random.randint(1, 5),
                title=generate_food_title(),  # Using the custom food title generator
                comment=generate_food_review(),  # Using the custom food review generator
                user_id=user.id,
                recipe_id=recipe.id
            )
            db.session.add(review)

        db.session.commit()
        print(f"Added {limit} fake reviews.")

if __name__ == "__main__":
    generate_fake_reviews(600)  # Adjust the number of reviews as needed