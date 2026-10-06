from flask import jsonify, request, Blueprint
from DB.bdd_dao import baseDeDonneesDAO
from DB.db import get_db, close_db

parametres_bp = Blueprint("parametres", __name__)

#retourne la liste des villes
@parametres_bp.route("/razBDD")
def listeVille():
    db = get_db()
    try:
        dao = baseDeDonneesDAO(db)
        dao.razBDD()
        return jsonify({"status": "success", "message": "Base de données réinitialisée avec succès."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
