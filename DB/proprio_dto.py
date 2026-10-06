class proprioDTO:

    def __init__(self,id_ville = None,nom_ville = None, code_postal = None, id_adresse = None,  num_rue = None,rue = None, complement = None,id_proprio = None, nom_proprio=None, prenom_proprio = None, date_naissance = None, sexe = None, email_proprio = None, id_adresse_proprio = None, num_permis = None):
        self.id_ville = id_ville
        self.nom_ville = nom_ville
        self.code_postal = code_postal
        self.id_adresse = id_adresse
        self.num_rue  = num_rue
        self.rue = rue
        self.complement = complement
        self.id_proprio = id_proprio
        self.nom_proprio = nom_proprio
        self.prenom_proprio = prenom_proprio

    def listeVille(self):
        return {
            "id_ville": self.id_ville,
            "nom_ville": self.nom_ville,
            "code_postal": self.code_postal }

    def listeAdresse(self):
        return {
            "nom_ville": self.nom_ville,
            "code_postal": self.code_postal,
            "id_adresse":self.id_adresse,
            "num_rue": self.num_rue,
            "rue": self.rue,
            "complement": self.complement }

    def listeProprio(self):
        return {
            "id_proprio": self.id_proprio,
            "nom_proprio": self.nom_proprio,
            "prenom_proprio": self.prenom_proprio
        }
