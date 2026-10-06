from flask import Flask, jsonify, request, render_template
from DB.db import get_db, close_db
from DB.proprio_dao import proprioDAO
from routes.parametres_routes import parametres_bp
from routes.vehicules_routes import vehicules_bp
from routes.gestion_routes import gestion_bp
from routes.proprio_routes import proprio_bp
import random

HTTP = 8080

app = Flask(__name__,            
            static_url_path='',
            static_folder='www',
            template_folder='www/templates')

app.register_blueprint(vehicules_bp)
app.register_blueprint(gestion_bp)
#enregistrement du fichier route proprietaire
app.register_blueprint(proprio_bp)
#enregistrement du fichier route parametres
app.register_blueprint(parametres_bp)
#declaration de l'emplacement de la base de données dans le dictionnaire à "DATABASE"
app.config['DATABASE'] = 'DB/vehicules.db'
app.teardown_appcontext(close_db)
    
  
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=HTTP, debug=True)

