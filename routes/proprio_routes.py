from flask import jsonify, request, Blueprint
from DB.proprio_dao import proprioDAO
from DB.db import get_db, close_db

proprio_bp = Blueprint("proprio", __name__)


#ajoute une nouvelle ville
@proprio_bp.route("/nouvelle/ville", methods=["POST"])
def nouvelleVille():
    data = request.json
    print("reception données nouvelle ville")
    db = get_db()
    dao = proprioDAO(db)
    dao.insertVille(
        data["nom_ville"],
        data["code_postal"]
    )
    db.commit()
    return {"message": "nouvelle ville enregistrée"}, 201

#retourne la liste des villes
@proprio_bp.route("/liste/ville")
def listeVille():
    db = get_db()
    dao = proprioDAO(db)
    donnees = dao.listeVille()
    villesDicts = [m.listeVille() for m in donnees]
    return jsonify(villesDicts)

#ajoute une nouvelle adresse
@proprio_bp.route("/nouvelle/adresse", methods=["POST"])
def nouvelleAdresse():
    data = request.json
    print("reception données nouvelle adresse")
    db = get_db()
    dao = proprioDAO(db)
    dao.insertAdresse(
        data["id_ville"],
        data["num_rue"],
        data["rue"],
        data["complement"]
    )
    db.commit()
    return {"message": "nouvelle ville enregistrée"}, 201

#retourne la liste des adresses
@proprio_bp.route("/liste/adresse")
def listeAdresse():
    db = get_db()
    dao = proprioDAO(db)
    donnees = dao.listeAdresse()
    adresseDicts = [m.listeAdresse() for m in donnees]
    return jsonify(adresseDicts)

#insere une nouvelle personne
@proprio_bp.route("/nouveau/proprio", methods=["POST"])
def nouveauPropriétaire():
    data =request.json
    print("reception d'une nouvelle personne")
    db = get_db()
    dao = proprioDAO(db)
    dao.insert_pax(
        data["nom_proprio"],
        data["prenom_proprio"],
        data["date_naissance"],
        data["sexe"],
        data["email_proprio"],
        data["id_adresse_proprio"],
        data["num_permis"])
    db.commit()
    return {"message": "nouveau permis enregistré"}

#retourne la lite des personnes enregistrées
@proprio_bp.route("/liste/proprietaire")
def listeProprio():
    db = get_db()
    dao = proprioDAO(db)
    donnees = dao.listeProprio()
    proprioDicts = [m.listeProprio() for m in donnees]
    return jsonify(proprioDicts)

#insere un nouveau permis
@proprio_bp.route("/nouveau/permis", methods=["POST"])
def nouveauPermis():
    data = request.json
    print("reception d'un nouveau permis")
    db = get_db()
    dao = proprioDAO(db)
    dao.insert_permis(
        data["num_permis"],
        data["liste_categorie"])
    db.commit()
    return {"message": "nouveau permis enregistré"}

#insere une nouvelle categorie a un permis
@proprio_bp.route("/nouvelle/categoriepermis", methods=["POST"])
def nouvelleCategoriePermis():
    data = request.json
    print("reception nouvelle categorie d'un permis")
    db = get_db()
    dao = proprioDAO(db)
    dao.insert_categorie_permis(
        data["num_permis"],
        data["liste_categorie"])
    db.commit()
    return {"message":"nouvelles categories du permis ajoutées"}