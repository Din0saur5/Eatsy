# Standard library imports
import os
from dotenv import load_dotenv

load_dotenv()
# Remote library imports

from flask import Flask
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

app = Flask(__name__)

cors = CORS(app, supports_credentials=True, resources={
    r"/*": {
       "origins": ["http://127.0.0.1:5174","https://eatsy-8ewa.onrender.com"],
       "methods": ["GET", "POST", "PATCH", "PUT", "DELETE"],
       "allow_headers": ["Content-Type", "Authorization"]
    }
})
app.secret_key = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('SUPABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_NAME'] = 'id'
app.config['SESSION_COOKIE_SECURE'] = True  
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None' 
app.json.compact = False


metadata = MetaData(naming_convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db, render_as_batch=True)

db.init_app(app)

bcrypt = Bcrypt(app)
api = Api(app)


