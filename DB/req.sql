[VEHICULE]

insert_vehicule = INSERT INTO vehicule(immat, date_mec, id_proprio, id_modele, num_serie, ptac, ptra, kilometrage_achat, prix_achat, etat) VALUES (?,?,?,?,?,?,?,?,?,?);

insert_marque = INSERT INTO marque(marque) VALUES(?);

liste_marque = SELECT * FROM marque;

supprimer_marque = DELETE FROM marque WHERE marque = ?;

insert_categorie = INSERT INTO categorie(categorie) VALUES (?);

liste_categorie = SELECT * FROM categorie;

liste_vehicule = SELECT vehicule.immat, categorie.categorie, controle_technique.date_ct, controle_technique.resultat_ct, marque.marque, modele.modele FROM vehicule JOIN modele ON vehicule.id_modele = modele.id_modele JOIN marque ON modele.marque = marque.marque JOIN categorie ON modele.categorie = categorie.categorie LEFT JOIN ct_effectue ON vehicule.immat = ct_effectue.immat LEFT JOIN controle_technique ON ct_effectue.id_ct = controle_technique.id_ct;

supprimer_categorie = DELETE FROM categorie WHERE categorie = ?;

insert_modele = INSERT INTO modele(modele, marque, categorie, cylindree, puissance, nbr_place) VALUES (?,?,?,?,?,?);

liste_modele = SELECT id_modele, modele, marque, categorie, cylindree, puissance, nbr_place FROM modele;

supprimer_modele = DELETE FROM modele WHERE id_modele = ?;

info_vehicule = SELECT vehicule.immat, vehicule.date_mec, vehicule.num_serie, vehicule.ptac, vehicule.ptra, vehicule.kilometrage_achat, vehicule.prix_achat, vehicule.etat, modele.marque, modele.modele, categorie.categorie FROM vehicule JOIN modele ON modele.id_modele = vehicule.id_modele JOIN categorie ON categorie.categorie = modele.categorie WHERE vehicule.immat = ?;

insert_intervention = INSERT INTO intervention(immat, date, cout_inter, prix_litre, volume, kilometrage, id_type_inter, observation) VALUES (?,?,?,?,?,?,?,?);

liste_intervention = SELECT id_inter, immat, date, cout_inter, prix_litre, volume, kilometrage, id_type_inter, observation FROM intervention WHERE immat = ?;

[PROPRIO]

insert_ville = INSERT INTO ville(nom_ville, code_postal) VALUES (?,?);

liste_ville = SELECT * FROM ville;

nbr_ville = SELECT COUNT(*) FROM ville;

supprimer_ville = DELETE FROM ville WHERE id_ville = ?;

insert_adresse = INSERT INTO adresse(id_ville, num_rue, rue,complement) VALUES (?,?,?,?);

liste_adresse = SELECT ville.nom_ville, ville.code_postal, adresse.id_adresse, adresse.num_rue, adresse.rue, adresse.complement FROM adresse JOIN ville ON ville.id_ville = adresse.id_ville;

supprimer_adresse = DELETE FROM adresse WHERE id_adresse = ?;

insert_pax = INSERT INTO proprietaire(nom_proprio, prenom_proprio,date_naissance, sexe , email_proprio, id_adresse_proprio,num_permis) VALUES (?,?,?,?,?,?,?);

liste_pax = SELECT proprietaire.id_proprio, proprietaire.nom_proprio, proprietaire.prenom_proprio FROM proprietaire;

supprimer_pax = DELETE FROM proprietaire WHERE id_proprio = ?;

insert_permis = INSERT INTO permis(num_permis) VALUES (?);

insert_categorie_permis = INSERT INTO categorie_detenues(num_permis, categorie) VALUES (?,?);
