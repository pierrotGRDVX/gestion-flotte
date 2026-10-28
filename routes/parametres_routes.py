from flask import jsonify, request, Response, Blueprint
from DB.bdd_dao import baseDeDonneesDAO
from DB.vehicules_dao import vehiculeDAO
from DB.db import get_db, close_db

parametres_bp = Blueprint("parametres", __name__)

#remise a zero de la base de donnees
@parametres_bp.route("/razBDD")
def razBDD():
    db = get_db()
    try:
        dao = baseDeDonneesDAO(db)
        dao.razBDD()
        return jsonify({"status": "success", "message": "Base de données réinitialisée avec succès."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

#injection des donnees factices (DB/DonneesBaseBDD.sql)
@parametres_bp.route("/api/parametres/injecterDonneesFactices", methods=['POST'])
def injecterDonneesFactices():
    db = get_db()
    try:
        dao = baseDeDonneesDAO(db)
        dao.injecterDonneesFactices()
        return jsonify({"status": "success", "message": "Données factices injectées avec succès."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

#liste des tables de la base de donnees
@parametres_bp.route("/api/parametres/listeTables")
def listeTables():
    db = get_db()
    try:
        dao = baseDeDonneesDAO(db)
        tables = dao.listerTables()
        return jsonify({"status": "success", "tables": tables})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

#export d'une table au format CSV
@parametres_bp.route("/api/parametres/exportCSV/<table>")
def exportCSV(table):
    db = get_db()
    try:
        dao = baseDeDonneesDAO(db)
        contenu = dao.extraireCSV(table)
        return Response(
            contenu,
            mimetype='text/csv',
            headers={'Content-Disposition': f'attachment; filename={table}.csv'}
        )
    except ValueError as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

#import de donnees dans une table a partir d'un fichier CSV
@parametres_bp.route("/api/parametres/importCSV/<table>", methods=['POST'])
def importCSV(table):
    db = get_db()
    try:
        if 'fichier' not in request.files:
            return jsonify({"status": "error", "message": "Aucun fichier reçu (champ 'fichier' manquant)."}), 400
        fichier = request.files['fichier']
        contenuCSV = fichier.read().decode('utf-8-sig')
        dao = baseDeDonneesDAO(db)
        dao.injecterCSV(table, contenuCSV)
        return jsonify({"status": "success", "message": f"Données importées dans la table {table} avec succès."})
    except ValueError as e:
        return jsonify({"status": "error", "message": str(e)}), 400
    except UnicodeDecodeError:
        return jsonify({"status": "error", "message": "Encodage du fichier CSV invalide (UTF-8 attendu)."}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

#remplacement de l'ensemble des categories par une nouvelle liste
@parametres_bp.route("/api/parametres/razCategories", methods=['POST'])
def razCategories():
    db = get_db()
    try:
        donnees = request.get_json()
        if not donnees or 'categories' not in donnees:
            return jsonify({"status": "error", "message": "Champ 'categories' manquant."}), 400
        dao = vehiculeDAO(db)
        dao.razCategories(donnees['categories'])
        return jsonify({"status": "success", "message": "Liste des catégories mise à jour avec succès."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

#modification d'une categorie du code de la route
@parametres_bp.route("/api/parametres/categories/<categorie>", methods=['PUT'])
def modifierCategorie(categorie):
    db = get_db()
    try:
        donnees = request.get_json()
        if not donnees or 'nouvelleCategorie' not in donnees:
            return jsonify({"status": "error", "message": "Champ 'nouvelleCategorie' manquant."}), 400
        dao = vehiculeDAO(db)
        dao.modifierCategorie(categorie, donnees['nouvelleCategorie'])
        return jsonify({"status": "success", "message": "Catégorie modifiée avec succès."})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500
