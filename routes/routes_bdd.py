from flask import jsonify, request, Blueprint
from DB.vehicule_dao import VehiculeDAO
from DB.personnes_dao import PersonnesDAO
from DB.db import get_db, close_db

vehicule_bp = Blueprint("vehicule", __name__)

@vehicule_bp.route("/pageAjoutVhl")
def Ajout_Vhl():
    if request.method == 'GET':
        return render_template("Ajouter_Vhl.html", title="Ajouter un véhicule", title_onglet="Nouveau véhicule" )