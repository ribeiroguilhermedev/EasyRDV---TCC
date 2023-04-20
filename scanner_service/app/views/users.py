from werkzeug.security import generate_password_hash
from app import db
from flask import request, jsonify
from ..models.users import Users, user_schema, users_schema

def post_user():
    name = request.json['name']
    cpf = request.json['cpf']
    rg = request.json['rg']
    birth_date = request.json['birth_date']
    picture = request.json['picture']
    role = request.json['role']
    email = request.json['email']
    password = request.json['password']
    flag_active = request.json['flag_active']
    observation = request.json['observation']
    guid = request.json['guid']
    pass_hash = generate_password_hash(password)

    user = Users(name, cpf, rg, birth_date, picture, role, email, pass_hash, flag_active, observation, guid)

    try:
        db.session.add(user)
        db.session.commit()
        result = user_schema.dump(user)
        return jsonify({'message': 'successfully registered', 'data': result.data}), 201
    except:
        return jsonify({'message': 'unable to create', 'data': {}}), 500

