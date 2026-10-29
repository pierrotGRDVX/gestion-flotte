class vehiculesDTO:

    def __init__(self,categorie = "", immat = "", date = "", cout_inter = "", prix_litre = "", volume = "", kilometrage = "", id_type_inter = "", observation = "", id_inter = "", marque = "", date_mec = "", num_serie = "", ptac = "", ptra = "", kilometrage_achat = "", prix_achat = "", etat = "", modele = "", id_modele = "", cylindree = "", puissance = "", nbr_place = "", date_ct = "", resultat_ct = "", nbr_etat = 0):
        self.categorie = categorie
        self.immat = immat
        self.marque = marque
        self.modele = modele
        self.id_modele = id_modele
        self.cylindree = cylindree
        self.puissance = puissance
        self.nbr_place = nbr_place
        self.date_mec = date_mec
        self.num_serie = num_serie
        self.ptac = ptac
        self.ptra = ptra
        self.kilometrage_achat = kilometrage_achat
        self.prix_achat = prix_achat
        self.etat = etat
        self.date = date
        self.cout_inter = cout_inter
        self.prix_litre = prix_litre
        self.volume = volume
        self.kilometrage = kilometrage
        self.id_type_inter = id_type_inter
        self.observation = observation
        self.id_inter = id_inter
        self.date_ct = date_ct
        self.resultat_ct = resultat_ct
        self.nbr_etat = nbr_etat

    def listeCategorie(self):
        return {
            "categorie": self.categorie}

    def listeMarque(self):
        return {
            "marque": self.marque}

    def listeModele(self):
        return {
            "id_modele": self.id_modele,
            "modele": self.modele,
            "marque": self.marque,
            "categorie": self.categorie,
            "cylindree": self.cylindree,
            "puissance": self.puissance,
            "nbr_place": self.nbr_place}

    def infoVehicule(self):
        return {
            "immat": self.immat,
            "date_mec": self.date_mec,
            "num_serie": self.num_serie,
            "ptac": self.ptac,
            "ptra": self.ptra,
            "kilometrage_achat": self.kilometrage_achat,
            "prix_achat": self.prix_achat,
            "etat": self.etat,
            "marque": self.marque,
            "modele": self.modele,
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

    def listeVehicule(self):
        return {
            "immat": self.immat,
            "etat": self.etat,
            "kilometrage": self.kilometrage_achat,
            "categorie": self.categorie,
            "date_ct": self.date_ct,
            "resultat_ct": self.resultat_ct,
            "marque": self.marque,
            "modele": self.modele}

    def listeEtatVehicule(self):
        return {
            "etat": self.etat,
            "nbr_etat": self.nbr_etat}
