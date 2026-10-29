from flask import jsonify, request, Blueprint
from DB.vehicules_dao import vehiculeDAO
from DB.db import get_db, close_db

vehicules_bp = Blueprint("vehicules", __name__)


@vehicules_bp.route("/cars", methods=["POST"])
def nouveauVehicule():
    data = request.json
    print(data)
    db = get_db()
    dao = vehiculeDAO(db)

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

#supprime une categorie
@vehicules_bp.route("/supprimer/categorie", methods=["POST"])
def supprimerCategorie():
    data = request.json
    db = get_db()
    dao = vehiculeDAO(db)
    dao.supprimerCategorie(
        data["categorie"]
    )
    db.commit()
    return {"message": "categorie supprimee"}, 201

#retourne la liste des marques
@vehicules_bp.route("/liste/marque")
def listeMarque():
    db = get_db()
    dao = vehiculeDAO(db)
    donnees = dao.listeMarque()
    marquesDicts = [m.listeMarque() for m in donnees]
    return jsonify(marquesDicts)

#ajoute un nouveau modele
@vehicules_bp.route("/nouveau/modele", methods=["POST"])
def nouveauModele():
    data = request.json
    db = get_db()
    dao = vehiculeDAO(db)
    dao.insertModele(
        data["modele"],
        data["marque"],
        data["categorie"],
        data["cylindree"],
        data["puissance"],
        data["nbr_place"]
    )
    db.commit()
    return {"message": "nouveau modele enregistre"}, 201

#retourne la liste des modeles
@vehicules_bp.route("/liste/modele")
def listeModele():
    db = get_db()
    dao = vehiculeDAO(db)
    donnees = dao.listeModele()
    modelesDicts = [m.listeModele() for m in donnees]
    return jsonify(modelesDicts)

#supprime un modele
@vehicules_bp.route("/supprimer/modele", methods=["POST"])
def supprimerModele():
    data = request.json
    db = get_db()
    dao = vehiculeDAO(db)
    dao.supprimerModele(
        data["id_modele"]
    )
    db.commit()
    return {"message": "modele supprime"}, 201

#retourne les infos d'un vehicule
@vehicules_bp.route("/info/vehicule/<immat>")
def infoVehicule(immat):
    db = get_db()
    dao = vehiculeDAO(db)
    donnee = dao.infoVehicule(immat)
    if donnee is None:
        return {"message": "vehicule introuvable"}, 404
    return jsonify(donnee.infoVehicule())

#insere une nouvelle intervention
@vehicules_bp.route("/nouvelle/intervention", methods=["POST"])
def nouvelleIntervention():
    data = request.json
    print("reception données nouvelle intervention")
    db = get_db()
    dao = vehiculeDAO(db)
    dao.insertIntervention(
        data["immat"],
        data["date"],
        data["cout_inter"],
        data["prix_litre"],
        data["volume"],
        data["kilometrage"],
        data["id_type_inter"],
        data["observation"]
    )
    db.commit()
    return {"message": "nouvelle intervention enregistrée"}, 201

#retourne la liste des interventions d'un vehicule
@vehicules_bp.route("/liste/intervention/<immat>")
def listeIntervention(immat):
    db = get_db()
    dao = vehiculeDAO(db)
    donnees = dao.listeIntervention(immat)
    interventionsDicts = [m.listeIntervention() for m in donnees]
    return jsonify(interventionsDicts)

#retourne la liste des vehicules
@vehicules_bp.route("/liste/vehicule")
def listeVehicule():
    db = get_db()
    dao = vehiculeDAO(db)
    donnees = dao.listeVehicule()
    vehiculesDicts = [m.listeVehicule() for m in donnees]
    return jsonify(vehiculesDicts)

#retourne le nombre de vehicules par etat (en_service, endommagé, non_roulant)
@vehicules_bp.route("/liste/etat/vehicule")
def listeEtatVehicule():
    db = get_db()
    dao = vehiculeDAO(db)
    donnees = dao.listeEtatVehicule()
    etatsDicts = [m.listeEtatVehicule() for m in donnees]
    return jsonify(etatsDicts)
