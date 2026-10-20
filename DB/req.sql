[VEHICULE]

insert_vehicule = INSERT INTO vehicule(immat, date_mec, id_proprio, id_modele, num_serie, ptac, ptra, kilometrage_achat, prix_achat, etat) VALUES (?,?,?,?,?,?,?,?,?);

insert_marque = INSERT INTO marque(marque) VALUES(?);

liste_marque = SELECT * FROM marque;

insert_categorie = INSERT INTO categorie(categorie) VALUES (?);

liste_categorie = SELECT * FROM categorie;
  
insert_intervention = INSERT INTO intervention(immat, date, cout_inter, prix_litre, volume, kilometrage, id_type_inter, observation) VALUES (?,?,?,?,?,?,?,?);

liste_intervention = SELECT id_inter, immat, date, cout_inter, prix_litre, volume, kilometrage, id_type_inter, observation FROM intervention WHERE immat = ?;

[PROPRIO]

insert_ville = INSERT INTO ville(nom_ville, code_postal) VALUES (?,?);

liste_ville = SELECT * FROM ville;

insert_adresse = INSERT INTO adresse(id_ville, num_rue, rue,complement) VALUES (?,?,?,?);

liste_adresse = SELECT ville.nom_ville, ville.code_postal, adresse.id_adresse, adresse.num_rue, adresse.rue, adresse.complement FROM adresse JOIN ville ON ville.id_ville = adresse.id_ville;

insert_pax = INSERT INTO proprietaire(nom_proprio, prenom_proprio,date_naissance, sexe , email_proprio, id_adresse_proprio,num_permis) VALUES (?,?,?,?,?,?,?);

liste_pax = SELECT proprietaire.id_proprio, proprietaire.nom_proprio, proprietaire.prenom_proprio FROM proprietaire;

insert_permis = INSERT INTO permis(num_permis) VALUES (?);

insert_categorie_permis = INSERT INTO categories_detenues(num_permis, categorie) VALUES (?,?);
