class vehiculesDTO:

    def __init__(self,categorie = ""):
        self.categorie = categorie

    def listeCategorie(self):
        return {
            "categorie": self.categorie}
