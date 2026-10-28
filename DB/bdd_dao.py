import csv
import io
import sqlite3

class baseDeDonneesDAO:

    def __init__(self, bdd):
        self.bdd = bdd
        try:
            with open('DB/création base de données.sql', 'r', encoding='utf-8') as file:
                self.remise_a_zero_BDD = file.read()
        except FileNotFoundError:
            print("Erreur : Le fichier SQL est introuvable.")
            self.remise_a_zero_BDD = ""
        except Exception as e:
            print(f"Erreur lors de la lecture du fichier SQL : {e}")
            self.remise_a_zero_BDD = ""
        try:
            with open('DB/DonneesBaseBDD.sql', 'r', encoding='utf-8') as file:
                self.donnees_factices = file.read()
        except FileNotFoundError:
            print("Erreur : Le fichier DonneesBaseBDD.sql est introuvable.")
            self.donnees_factices = ""
        except Exception as e:
            print(f"Erreur lors de la lecture du fichier DonneesBaseBDD.sql : {e}")
            self.donnees_factices = ""

    def injecterDonneesFactices(self):
        if not self.donnees_factices:
            raise FileNotFoundError("Aucune donnée factice à injecter (DonneesBaseBDD.sql introuvable ou vide).")

        cur = self.bdd.cursor()
        try:
            cur.executescript(self.donnees_factices)
            self.bdd.commit()
            print("Données factices injectées avec succès.")
        except sqlite3.Error as e:
            self.bdd.rollback()
            raise e

    def listerTables(self):
        cur = self.bdd.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;")
        return [row[0] for row in cur.fetchall()]

    def extraireCSV(self, nomTable):
        if nomTable not in self.listerTables():
            raise ValueError(f"Table inconnue : {nomTable}")

        cur = self.bdd.cursor()
        cur.execute(f"SELECT * FROM {nomTable};")
        colonnes = [description[0] for description in cur.description]
        lignes = cur.fetchall()

        sortie = io.StringIO()
        writer = csv.writer(sortie, delimiter=';')
        writer.writerow(colonnes)
        for ligne in lignes:
            writer.writerow(ligne)
        return sortie.getvalue()

    def injecterCSV(self, nomTable, contenuCSV):
        if nomTable not in self.listerTables():
            raise ValueError(f"Table inconnue : {nomTable}")

        lecteur = csv.reader(io.StringIO(contenuCSV), delimiter=';')
        colonnes = next(lecteur, None)
        if not colonnes:
            raise ValueError("Fichier CSV vide : en-tête de colonnes manquant.")

        cur = self.bdd.cursor()
        placeholders = ','.join('?' for _ in colonnes)
        requete = f"INSERT INTO {nomTable}({','.join(colonnes)}) VALUES ({placeholders});"
        try:
            for ligne in lecteur:
                if not ligne:
                    continue
                cur.execute(requete, ligne)
            self.bdd.commit()
            print(f"Données CSV injectées dans la table {nomTable}.")
        except sqlite3.Error as e:
            self.bdd.rollback()
            raise e

    def razBDD(self):
        if not self.remise_a_zero_BDD:
            print("Aucune requête SQL à exécuter.")
            return

        cur = self.bdd.cursor()
        try:
            cur.executescript(self.remise_a_zero_BDD)
            self.bdd.commit()
            print("Base de données réinitialisée avec succès.")
        except sqlite3.Error as e:
            print(f"Erreur lors de l'exécution des requêtes SQL : {e}")
            self.bdd.rollback()
