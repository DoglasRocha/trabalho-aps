import app
import db

with app.app.app_context():
    db.database.create_all()
