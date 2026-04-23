import os
import logging
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from extensions import db

# Configure minimal logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

def create_app(test_config=None):
    load_dotenv()
    
    app = Flask(__name__)
    
    # Configure database
    if test_config and 'SQLALCHEMY_DATABASE_URI' in test_config:
        app.config['SQLALCHEMY_DATABASE_URI'] = test_config['SQLALCHEMY_DATABASE_URI']
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Enable CORS for the Vite frontend
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://localhost:5173"]}})
    
    # Initialize extensions
    db.init_app(app)
    
    # Create database tables
    with app.app_context():
        import models  # Ensure models are imported
        db.create_all()

    # Register blueprints
    from routes import api_bp
    app.register_blueprint(api_bp)
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
