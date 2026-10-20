class vehiculesDTO:

    def __init__(self,categorie = "", immat = "", date = "", cout_inter = "", prix_litre = "", volume = "", kilometrage = "", id_type_inter = "", observation = "", id_inter = ""):
        self.categorie = categorie
        self.immat = immat
        self.date = date
        self.cout_inter = cout_inter
        self.prix_litre = prix_litre
        self.volume = volume
        self.kilometrage = kilometrage
        self.id_type_inter = id_type_inter
        self.observation = observation
        self.id_inter = id_inter

    def listeCategorie(self):
        return {
            "categorie": self.categorie}

    def listeIntervention(self):
        return {
            "id_inter": self.id_inter,
            "immat": self.immat,
            "date": self.date,
            "cout_inter": self.cout_inter,
            "prix_litre": self.prix_litre,
            "volume": self.volume,
            "kilometrage": self.kilometrage,
            "id_type_inter": self.id_type_inter,
            "observation": self.observation}
