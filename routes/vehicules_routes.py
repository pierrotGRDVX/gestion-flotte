from flask import jsonify, request, Blueprint
from DB.vehicules_dao import vehiculeDAO
from DB.db import get_db, close_db

vehicules_bp = Blueprint("vehicules", __name__)


@vehicules_bp.route("/cars", methods=["POST"])
def nouveauVehicule():
    data = request.json
    print(data)
    db = get_db()
    dao = VehiculeDAO(db)

    dao.insertVehicule(
        data["immat"],
        data["date_mec"],
        data["id_proprio"],
        data["id_modele"],
        data["num_serie"],
        data["ptac"],
        data["ptra"],
        data["kilometrage_achat"],
        data["prix_achat"],
        data["etat"]
    )
    db.commit()
    return {"message": "Véhicule créé"}, 201

#ajoute une nouvelle marque
@vehicules_bp.route("/nouvelle/marque", methods= ["POST"])
def nouvelleMarque():
    data = request.json
    db = get_db()
    dao = vehiculeDAO(db)
    dao.insertMarque(
        data["marque"]
    )
    db.commit()
    return {"message": "nouvelle marque enregistrée"}, 201

#ajoute une nouvelle categorie
@vehicules_bp.route("/nouvelle/categorie", methods=["POST"])
def nouvelleCategorie():
    data = request.json
    db = get_db()
    dao = vehiculeDAO(db)
    dao.insertCategorie(
        data["categorie"]
    )
    db.commit()
    return {"message": "nouvelle categorie enregistrée"}, 201

#retourne la liste des categories
@vehicules_bp.route("/liste/categorie")
def listeCategorie():
    db = get_db()
    dao = vehiculeDAO(db)
    donnees = dao.listeCategorie()
    AdresseDicts = [m.listeCategorie() for m in donnees]
    return jsonify(AdresseDicts)
