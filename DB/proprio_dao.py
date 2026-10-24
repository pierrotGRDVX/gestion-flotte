import sqlite3
import configparser
from DB.proprio_dto import proprioDTO

class proprioDAO:

    def __init__(self, bdd):
        self.bdd = bdd
        # load requests
        req = configparser.RawConfigParser()
        
        req.read('DB/req.sql')
        #for s in req.items():
        #print(s)
        self.req = dict(req.items('PROPRIO'))

    #fonction de création d'une nouvelle ville
    def insertVille(self, nom_ville,code_postal):
        cur = self.bdd.cursor()
        requete = self.req['insert_ville']
        cur.execute(requete, (nom_ville, code_postal))
        self.bdd.commit()
    
    def supprimerVille(self, id_ville):
        cur = self.bdd.cursor()
        requete = self.req['supprimer_ville']
        cur.execute(requete, (id_ville,))
        self.bdd.commit()

    def returnNbrVille(self):
        cur = self.bdd.cursor()
        cur.execute(self.req["nbr_ville"])
        row = cur.fetchone()
        return row[0]

    #fonction retournant la liste des villes
    def listeVille(self):
        cur = self.bdd.cursor()
        cur.execute(self.req["liste_ville"])
        rows = cur.fetchall()
        donnees = []
        for row in rows:
            donnees.append(
                proprioDTO(
                    row["id_ville"],
                    row["nom_ville"],
                    row["code_postal"]
                )
            )
        return donnees

    def insertAdresse(self, id_ville,num_rue, rue,complement):
        cur = self.bdd.cursor()
        requete = self.req['insert_adresse']
        cur.execute(requete, (id_ville, num_rue, rue, complement))
        self.bdd.commit()

    def supprimerAdresse(self, id_adresse):
        cur = self.bdd.cursor()
        requete = self.req['supprimer_adresse']
        cur.execute(requete, (id_adresse,))
        self.bdd.commit()

    def listeAdresse(self):
        cur = self.bdd.cursor()
        cur.execute(self.req["liste_adresse"])
        rows = cur.fetchall()
        donnees = []
        for row in rows:
            donnees.append(
                proprioDTO(
                    nom_ville = row["nom_ville"],
                    code_postal = row["code_postal"],
                    id_adresse = row["id_adresse"],
                    num_rue = row["num_rue"],
                    rue = row["rue"],
                    complement = row["complement"]
                )
            )
        return donnees

    #fonction d'insertion d'une nouvelle personne
    def insert_pax(self, nom_proprio, prenom_proprio, date_naissance,sexe, email_proprio, id_adresse_proprio,num_permis):
        cur = self.bdd.cursor()
        requete = self.req['insert_pax']
        cur.execute(requete, (nom_proprio, prenom_proprio, date_naissance,sexe, email_proprio, id_adresse_proprio,num_permis))
        self.bdd.commit()
        return "bonjour"

    def supprimerProprietaire(self, id_proprio):
        cur = self.bdd.cursor()
        requete = self.req['supprimer_pax']
        cur.execute(requete, (id_proprio,))
        self.bdd.commit()

    def listeProprio(self):
        cur = self.bdd.cursor()
        cur.execute(self.req["liste_pax"])
        rows = cur.fetchall()
        donnees = []
        for row in rows:
            donnees.append(
                proprioDTO(
                    id_proprio = row["id_proprio"],
                    nom_proprio = row["nom_proprio"],
                    prenom_proprio = row["prenom_proprio"]
                )
            )
        return donnees

    #fonction de création d'une nouvelle ville
    def insert_permis(self, num_permis, liste_categorie):
        cur = self.bdd.cursor()
        try:
            # Insertion du permis
            requete_permis = self.req['insert_permis']
            cur.execute(requete_permis, (num_permis,))

            # Insertion des catégories associées
            requete_categorie = self.req['insert_categorie_permis']
            for categorie in liste_categorie:
                cur.execute(requete_categorie, (num_permis, categorie))

            # Validation de la transaction
            self.bdd.commit()
        except Exception as e:
            self.bdd.rollback()
            raise e

    #fonction d'insertion d'une nouvelle categorie dans un permis       
    def insert_categorie_permis(self,num_permis,liste_categorie):
        cur = self.bdd.cursor()
        try:
             # Insertion des catégories associées
            requete_categorie = self.req['insert_categorie_permis']
            for categorie in liste_categorie:
                cur.execute(requete_categorie, (num_permis, categorie))

            # Validation de la transaction
            self.bdd.commit()
        except Exception as e:
            self.bdd.rollback()
            raise e
