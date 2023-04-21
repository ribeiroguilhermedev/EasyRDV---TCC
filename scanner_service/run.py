from app import app, db

print("entrou")
print(__name__)

def init_app():
    print("entrou")
    db.create_all()
    app.run()

if __name__== '__main__':
    init_app()