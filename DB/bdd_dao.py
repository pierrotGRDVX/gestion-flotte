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
