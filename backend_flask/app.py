from flask import Flask, request, session

app = Flask(__name__)
app.secret_key = b'ricardo_lanches_de_oliveira'
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///db.sqlite3"

