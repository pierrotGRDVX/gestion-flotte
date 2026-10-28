from flask import jsonify, request, Blueprint, render_template
from DB.vehicules_dao import vehiculeDAO
from DB.db import get_db, close_db

gestion_bp = Blueprint("Gestion", __name__)

                                              #Fonctions gestion
#Page d'accueil                       
@gestion_bp.route("/", methods=["GET"])
def index():
    if request.method == 'GET':
        return render_template("Accueil.html", title="Accueil", title_onglet="Acceuil" )
    
#Page de gestion des véhicules
@gestion_bp.route("/pageGestionVhl")
def Gestion_Vhl():
    if request.method == 'GET':
        return render_template("Gestion_Vhl.html", title="Gestion des véhicules", title_onglet="Véhicule" )

#Page d'intervention
@gestion_bp.route("/pageAjoutInter", methods=["GET", "POST"])
def Ajout_Inter():
    if request.method == 'GET':
        VhlDTOs = vehiculeDAO(get_db()).listeVehicule()
        return render_template("Nvle_Inter.html", title="Nouvelle intervention", title_onglet="Intervention",Marque="egq",Model="lkjb",liste_vhl=VhlDTOs )
    
#Page d'ajout de personnel
@gestion_bp.route("/pageAjoutPax")
def Ajout_Pax():
    if request.method == 'GET':
        return render_template("Ajouter_Pax.html", title="Ajouter un Personnel", title_onglet="Nouveau personnel" )

#Page de gestion du personnel
@gestion_bp.route("/pageGestionPax")
def Gestion_Pax():
    if request.method == 'GET':
        return render_template("Gestion_Pax.html", title="Gestion des personnels", title_onglet="Personnel" )

#Page d'ajout de véhicule
@gestion_bp.route("/pageAjoutVhl")
def Ajout_Vhl():
    if request.method == 'GET':
        return render_template("Ajouter_Vhl.html", title="Ajouter un véhicule", title_onglet="Nouveau véhicule" )

#Page  d'afficheage des infos d'un vehicule
@gestion_bp.route("/pageInfoVhl")
def pageInfoVhl():
    valeur = request.args.get("valeur")
    if request.method == 'GET':

        return render_template("Infos_Vhl.html", title = valeur, title_onglet=valeur,  valeur= valeur)

@gestion_bp.route("/pageParametres")
def pageParametres():
    if request.method == 'GET':
        return render_template("Parametres.html", title = "Paramètres", title_onglet= "Paramètres")
