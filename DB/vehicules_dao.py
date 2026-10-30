import sqlite3
import configparser
from DB.vehicules_dto import vehiculesDTO


class vehiculeDAO:

    def __init__(self, bdd):
        self.bdd = bdd
        # load requests
        req = configparser.RawConfigParser()
        
        req.read('DB/req.sql')
        #for s in req.items():
        #print(s)
        self.req = dict(req.items('VEHICULE'))

    def insertVehicule(self, immat, date_mec, id_proprio, id_modele, num_serie, ptac, ptra, kilometrage_achat, prix_achat, etat):
        cur = self.bdd.cursor()
        requete = self.req['insert_vehicule']
        cur.execute(requete, (immat, date_mec, id_proprio,id_modele, num_serie, ptac, ptra, kilometrage_achat, prix_achat,etat))
        self.bdd.commit()
    
    def insertCategorie(self, categorie):
        cur = self.bdd.cursor()
        requete = self.req['insert_categorie']
        cur.execute(requete,(categorie,))
        self.bdd.commit()

    def supprimerCategorie(self, categorie):
        cur = self.bdd.cursor()
        requete = self.req['supprimer_categorie']
        cur.execute(requete, (categorie,))
        self.bdd.commit()

    def modifierCategorie(self, ancienneCategorie, nouvelleCategorie):
        cur = self.bdd.cursor()
        requete = self.req['modifier_categorie']
        cur.execute(requete, (nouvelleCategorie, ancienneCategorie))
        self.bdd.commit()

    def razCategories(self, nouvellesCategories):
        cur = self.bdd.cursor()
        try:
            cur.execute(self.req['raz_categories'])
            requete = self.req['insert_categorie']
            for categorie in nouvellesCategories:
                cur.execute(requete, (categorie,))
            self.bdd.commit()
        except sqlite3.Error:
            self.bdd.rollback()
            raise

    def insertModele(self, modele, marque, categorie, cylindree, puissance, nbr_place):
        cur = self.bdd.cursor()
        requete = self.req['insert_modele']
        cur.execute(requete, (modele, marque, categorie, cylindree, puissance, nbr_place))
        self.bdd.commit()

    def listeModele(self):
        cur = self.bdd.cursor()
        requete = self.req['liste_modele']
        cur.execute(requete)
        rows = cur.fetchall()
        donnees = []
        for row in rows:
            donnees.append(
                vehiculesDTO(
                    id_modele = row["id_modele"],
                    modele = row["modele"],
                    marque = row["marque"],
                    categorie = row["categorie"],
                    cylindree = row["cylindree"],
                    puissance = row["puissance"],
                    nbr_place = row["nbr_place"]
                )
            )
        return donnees

    def supprimerModele(self, id_modele):
        cur = self.bdd.cursor()
        requete = self.req['supprimer_modele']
        cur.execute(requete, (id_modele,))
        self.bdd.commit()

    def infoVehicule(self, immat):
        cur = self.bdd.cursor()
        requete = self.req['info_vehicule']
        cur.execute(requete, (immat,))
        row = cur.fetchone()
        if row is None:
            return None
        return vehiculesDTO(
            immat = row["immat"],
            date_mec = row["date_mec"],
            num_serie = row["num_serie"],
            ptac = row["ptac"],
            ptra = row["ptra"],
            kilometrage_achat = row["kilometrage_achat"],
            prix_achat = row["prix_achat"],
            etat = row["etat"],
            marque = row["marque"],
            modele = row["modele"],
            categorie = row["categorie"]
        )

    def listeMarque(self):
        cur = self.bdd.cursor()
        cur.execute(self.req["liste_marque"])
        rows = cur.fetchall()
        donnees = []
        for row in rows:
            donnees.append(
                vehiculesDTO(
                    marque = row["marque"]
                )
            )
        return donnees

    def insertMarque(self, marque):
        cur = self.bdd.cursor()
        requete = self.req['insert_marque']
        cur.execute(requete, (marque,))
        self.bdd.commit()

    def listeCategorie(self):
        cur =self.bdd.cursor()
        requete = self.req['liste_categorie']
        cur.execute(requete)
        rows = cur.fetchall()
        print("liste catégories")

        donnees = []
        for row in rows:
            donnees.append(
                vehiculesDTO(
                    row["categorie"]
                )
            )
        return donnees

    def listeIntervention(self, immat):
        cur = self.bdd.cursor()
        requete = self.req['liste_intervention']
        cur.execute(requete, (immat,))
        rows = cur.fetchall()
        print("liste interventions")

        donnees = []
        for row in rows:
            donnees.append(
                vehiculesDTO(
                    immat = row["immat"],
                    id_inter = row["id_inter"],
                    date = row["date"],
                    cout_inter = row["cout_inter"],
                    prix_litre = row["prix_litre"],
                    volume = row["volume"],
                    kilometrage = row["kilometrage"],
                    id_type_inter = row["id_type_inter"],
                    observation = row["observation"]
                )
            )
        return donnees
        
    def insertIntervention(self, immat, date, cout_inter, prix_litre, volume, kilometrage, id_type_inter, observation):
        cur = self.bdd.cursor()
        requete = self.req['insert_intervention']
        cur.execute(requete, (immat, date, cout_inter, prix_litre, volume, kilometrage, id_type_inter, observation))
        self.bdd.commit()

    def insertControleTechnique(self, immat, date_ct, resultat_ct, observation_ct):
        cur = self.bdd.cursor()
        cur.execute(self.req['insert_controle_technique'], (date_ct, resultat_ct, observation_ct))
        id_ct = cur.lastrowid
        cur.execute(self.req['insert_ct_effectue'], (immat, id_ct))
        self.bdd.commit()

    def listeEtatVehicule(self):
        cur = self.bdd.cursor()
        requete = self.req['nbr_etat_vehicule']
        cur.execute(requete)
        rows = cur.fetchall()
        print("liste etat vehicules")

        donnees = []
        for row in rows:
            donnees.append(
                vehiculesDTO(
                    etat = row["etat"],
                    nbr_etat = row["nbr"]
                )
            )
        return donnees

    def listeVehicule(self):
        cur = self.bdd.cursor()
        requete = self.req['liste_vehicule']
        cur.execute(requete)
        rows = cur.fetchall()
        print("liste vehicules")

        donnees = []
        for row in rows:
            donnees.append(
                vehiculesDTO(
                    immat = row["immat"],
                    etat = row["etat"],
                    kilometrage_achat = row["kilometrage"],
                    categorie = row["categorie"],
                    date_ct = row["date_ct"],
                    resultat_ct = row["resultat_ct"],
                    marque = row["marque"],
                    modele = row["modele"]
                )
            )
        return donnees
