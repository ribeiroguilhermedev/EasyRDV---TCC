import datetime
from app import db, ma

class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(60), nullable=False)
    cpf = db.Column(db.String(11), nullable=False)
    rg = db.Column(db.String(20), nullable=False)
    birth_date = db.Column(db.DateTime, nullable=True)
    picture = db.Column(db.String(50), nullable=True)
    role = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(50), nullable=False)
    flag_active = db.Column(db.Boolean(), nullable=False)
    created_on = db.Column(db.DateTime, default=datetime.datetime.now(), nullable=False)
    observation = db.Column(db.String(150), nullable=True)
    #company_id = db.relationship('Company', backref='users', lazy=True)
    guid = db.Column(db.String(255), nullable=False)

    def __init__(self, name, cpf, rg, birth_date, picture, role, email, password, flag_active, observation, guid):
        self.name = name
        self.cpf = cpf
        self.rg = rg
        self.birth_date = birth_date
        self.picture = picture
        self.role = role
        self.email = email
        self.password = password
        self.flag_active = flag_active
        self.observation = observation
        self.guid = guid
    
"""Definindo o Schema do Marshmallow para facilitar a utilização de JSON"""
class UsersSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'cpf', 'rg', 'birth_date', 'picture', 'role', 'email', 'password', 'flag_active', 'created_on', 'observation', 'guid')

user_schema = UsersSchema()
users_schema = UsersSchema(many=True)