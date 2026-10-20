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
        cur.execute(requete, (immat, date_mec, id_proprio,id_modele, num_serie, patc, ptra, kilometrage_achat, prix_achat,etat))
        self.bdd.commit()
    
    def insertCategorie(self, categorie):
        cur = self.bdd.cursor()
        requete = self.req['insert_categorie']
        cur.execute(requete,(categorie,))
        self.bdd.commit()

    def listeMarque(self):
        cur = self.bdd.cursor()
        cur.execute(self.req["marque_liste"])
        rows = cur.fetchall()
        donnees = []
        for row in rows:
            donnees.append(
                MEFDonnees(
                    row["marque"]
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

