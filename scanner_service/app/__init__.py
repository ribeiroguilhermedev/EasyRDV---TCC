from flask import Flask, render_template, Response
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mssql+pymssql://<easyrdv>:<GuiVidalWilliam123>@<easyrdv.database.windows.net>/<easyrdv>'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.app_context()
# app.config.from_object('config')
db = SQLAlchemy(app)
ma = Marshmallow(app)

from .models import users
#from .views import users
from .routes import routes
