# Fonctions du projet gestion de flotte

*Inventaire généré depuis le code (serveurFlask.py, routes/, DB/).*

**Conventions de nommage :** `insertX` \= écriture en BDD · `listeX` \= lecture BDD · `nouveau/nouvelle` \= création via POST · `raz` \= remise à zéro.

---

## 1\. Fonctions Véhicules

*fichier routes : routes/vehicules\_routes.py · classe DAO : vehiculeDAO (DB/vehicules\_dao.py)*

| Description | Fonction Flask | HTTP | Path | Entrée | Sortie | Fonction DAO |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Ajouter un nouveau véhicule | nouveauVehicule(immat, date\_mec, id\_proprio, id\_modele, num\_serie, ptac, ptra, kilometrage\_achat, prix\_achat, etat, energie) | POST | /cars | .json | success | insertVehicule(...) mêmes paramètres |
| Obtenir la liste des véhicules | `listeVehicule()` | GET | `/liste/vehicule` | — | .json (immat, etat, energie, kilometrage, categorie, date\_ct, resultat\_ct, marque, modele). `kilometrage` = kilométrage de la dernière intervention du véhicule ayant un kilométrage, sinon `kilometrage_achat` | `listeVehicule()` → DTO |
| Ajouter une nouvelle marque | nouvelleMarque(marque) | POST | /nouvelle/marque | .json | success | insertMarque(marque) |
| Ajouter une nouvelle catégorie | nouvelleCategorie(categorie) | POST | /nouvelle/categorie | .json | success | insertCategorie(categorie) |
| Obtenir la liste des catégories | listeCategorie() | GET | /liste/categorie | — | .json | listeCategorie() → DTO listeCategorie() |
| Supprimer une catégorie | `supprimerCategorie(categorie)` | POST | `/supprimer/categorie` | .json | success | `supprimerCategorie(categorie)` |
| Obtenir la liste des marques | ⚠️ aucune route | — | — | — | .json | listeMarque() |
| Ajouter un nouveau modèle | `nouveauModele(modele, marque, categorie, cylindree, puissance, nbr_place)` | POST | `/nouveau/modele` | .json | success | `insertModele(...)` |
| Obtenir la liste des modèles | `listeModele()` | GET | `/liste/modele` | — | .json | `listeModele()` → DTO |
| Supprimer un modèle | `supprimerModele(id_modele)` | POST | `/supprimer/modele` | .json | success | `supprimerModele(id_modele)` |
| Obtenir les infos d'un véhicule | `infoVehicule(immat)` | GET | `/info/vehicule/<immat>` | — | .json (immat, date_mec, num_serie, ptac, ptra, kilometrage_achat, kilometrage, prix_achat, etat, energie, marque, modele, categorie, date_ct, resultat_ct). `kilometrage` = kilométrage de la dernière intervention du véhicule ayant un kilométrage, sinon `kilometrage_achat` ; `date_ct`/`resultat_ct` = dernier contrôle technique enregistré | `infoVehicule(immat)` → DTO |
| Ajouter une nouvelle intervention | nouvelleIntervention( immat, date,  cout\_inter, prix\_litre, volume, kilometrage, id\_type\_inter, observation) | POST | /nouvelle/intervention | .json | success | insertIntervention(immat, date,  cout\_inter, prix\_litre, volume, kilometrage, id\_type\_inter, observation) |
| Obtenir la liste des interventions d'un véhicule | `listeIntervention(immat)` | GET | `/liste/intervention/<immat>` | — | .json (id_inter, immat, date, cout_inter, prix_litre, volume, kilometrage, id_type_inter, nom_intervention, observation), trié par date décroissante | `listeIntervention(immat)` → DTO |
| Ajouter un nouveau contrôle technique (résultat : ok / reporte / refuse) | `nouveauControleTechnique(immat, date_ct, resultat_ct, observation_ct)` | POST | `/nouvelle/controle-technique` | .json | success | `insertControleTechnique(immat, date_ct, resultat_ct, observation_ct)` → insère dans `controle_technique` puis lien `ct_effectue` |
| Compter les véhicules par état (en_service / endommagé / non_roulant) | `listeEtatVehicule()` | GET | `/liste/etat/vehicule` | — | .json (etat, nbr\_etat) | `listeEtatVehicule()` → DTO |
| Ajouter une nouvelle énergie | nouvelleEnergie(nom) | POST | /nouvelle/energie | .json | success | insertEnergie(nom) |
| Obtenir la liste des énergies | `listeEnergie()` | GET | `/liste/energie` | — | .json (nom) | `listeEnergie()` → DTO listeEnergie() |
|  |  |  |  |  |  |  |

&nbsp;

## 2\. Fonctions Propriétaires

*fichier routes : routes/proprio\_routes.py · classe DAO : proprioDAO (DB/proprio\_dao.py)*

| Description | Fonction Flask | HTTP | Path | Entrée | Sortie | Fonction DAO |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Insérer une nouvelle ville | nouvelleVille(nom\_ville, code\_postal) | POST | /nouvelle/ville | .json | success | insertVille(nom\_ville, code\_postal) |
| Obtenir le nombre de villes | ⚠️ non implémenté | — | — | — | integer | à créer : returnNbrVille() |
| Obtenir la liste des villes | listeVille() | GET | /liste/ville | — | .json | listeVille() → DTO listeVille() |
| Supprimer une ville | `supprimerVille(id_ville)` | POST | `/supprimer/ville` | .json | success | `supprimerVille(id_ville)` |
| Insérer un nouvelle adresse | nouvelleAdresse(id\_ville, num\_rue, rue, complément) | POST | /nouvelle/adresse | .json | success | insertAdresse(...)` mêmes paramètres |
| Obtenir la liste des adresses | listeAdresse() | GET | /liste/adresse | — | .json | listeAdresse() → DTO listeAdresse() |
| Supprimer une adresse | `supprimerAdresse(id_adresse)` | POST | `/supprimer/adresse` | .json | success | `supprimerAdresse(id_adresse)` |
| Insérer un nouveau propriétaire | nouveauProprietaire(nom\_proprio, prenom\_proprio, date\_naissance, sexe, email\_proprio, id\_adresse\_proprio, num\_permis) | POST | /nouveau/proprio | .json | success | insert\_pax(...) mêmes paramètres |
| Obtenir la liste des propriétaires | listeProprio() | GET | /liste/proprietaire | — | .json | listeProprio() → DTO listeProprio() |
| Supprimer un propriétaire | `supprimerProprietaire(id_proprio)` | POST | `/supprimer/proprio` | .json | success | `supprimerProprietaire(id_proprio)` |
| Insérer un nouveau permis \+ catégories | nouveauPermis(num\_permis, liste\_categorie) | POST | /nouveau/permis | .json | success | insert\_permis(num\_permis, liste\_categorie) |
| Ajouter une catégorie à un permis | nouvelleCategoriePermis(num\_permis, liste\_categorie) | POST | /nouvelle/categoriepermis | .json | success | insert\_categorie\_permis(num\_permis, liste\_categorie) |

&nbsp;

## 3\. Gestion de la base de données

*fichier routes : routes/parametres\_routes.py · classe DAO : baseDeDonneesDAO (DB/bdd\_dao.py)*

| Description | Fonction Flask | HTTP | Path | Entrée | Sortie | Fonction DAO |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Remise à zéro de la BDD | razBDD() ⚠️ la fonction s'appelle encore listeVille dans le code | GET | /razBDD | — | success / error | razBDD() |
| Injecter des données factices (essai de la plateforme) | injecterDonneesFactices() | POST | /api/parametres/injecterDonneesFactices | — | success / error | injecterDonneesFactices() → lit et exécute DB/DonneesBaseBDD.sql (appeler razBDD() avant pour partir d'une base propre) |
| Lister les tables de la BDD | listeTables() | GET | /api/parametres/listeTables | — | .json (liste des noms de tables) | listerTables() |
| Extraire une table au format CSV | exportCSV(table) | GET | /api/parametres/exportCSV/<table> | — | fichier .csv (téléchargement, en-tête des colonnes via cur.description) | extraireCSV(nomTable) |
| Importer des données depuis un CSV | importCSV(table) | POST | /api/parametres/importCSV/<table> | fichier .csv (multipart/form-data) | success / error | injecterCSV(nomTable, contenuCSV) → INSERT paramétrés ligne par ligne dans une transaction (commit final ou rollback). ⚠️ valider le nom de table contre la liste blanche renvoyée par listerTables() |

&nbsp;

## 4\. Partie configuration \(page Paramètres\)

*Les catégories du code de la route \(AM, A1, A2, A, B, BE, C1, C, CE, D1, D, DE…\) sont déjà gérées par les routes de la section 1 \(nouvelleCategorie, listeCategorie, supprimerCategorie\), réutilisées par la page Paramètres\. La page www/templates/Parametres.html expose les 3 sections : base de données, personnalisation \(à venir\), configuration.*

| Description | Fonction Flask | HTTP | Path | Entrée | Sortie | Fonction DAO |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| Modifier une catégorie | `modifierCategorie(categorie)` | PUT | `/api/parametres/categories/<categorie>` | .json (nouvelleCategorie) | success | `modifierCategorie(ancienneCategorie, nouvelleCategorie)` (vehicules\_dao.py, requête modifier\_categorie de req.sql) |
| Remplacer l'ensemble des catégories (jeux prédéfinis : code de la route / simplifiées Moto, VL, PL, TC / saisie manuelle) | `razCategories()` | POST | `/api/parametres/razCategories` | .json (categories) | success / error | `razCategories(nouvellesCategories)` (vehicules\_dao.py, requête raz\_categories de req.sql) |

&nbsp;

## 5\. Pages HTML

*fichier routes : routes/gestion\_routes.py*

| Description | Fonction Flask | HTTP | Path | Template HTML |
| :---- | :---- | :---- | :---- | :---- |
| Page d'accueil | index() | GET | / | Accueil.html |
| Gestion des véhicules | Gestion\_Vhl() | GET | /pageGestionVhl | Gestion\_Vhl.html |
| Nouvelle intervention | Ajout\_Inter() | GET | /pageAjoutInter | Nvle\_Inter.html (reçoit la liste des véhicules) |
| Ajouter un personnel | Ajout\_Pax() | GET | /pageAjoutPay | Ajouter\_Pax.html |
| Gestion du personnel | Gestion\_Pax() | GET | /pageGestionPax | Gestion\_Pay.html |
| Ajouter un véhicule | Ajout\_Vhl() | GET | /pageAjoutVhl | Ajouter\_Vhl.html |
| Infos d'un véhicule | pageInfoVhl(valeur) | GET | /pageInfoVhl | Infos\_Vhl.html |
| Paramètres | pageParametres() | GET | /pageParametres | Parametres.html |

&nbsp;

---

## ⚠️ Bugs et écarts détectés dans le code

1. **POST /cars** appelle `VehiculeDAO` (avec majuscule) alors que la classe s'appelle `vehiculeDAO` → erreur à l'exécution.  
2. **routes/routes\_bdd.py** : fichier inutilisé, importe des modules qui n'existent pas → à supprimer.  
3. **/razBDD** : la fonction route s'appelle `listeVille` (copier-coller) → à renommer.  
4. **nombreVille()** : décrit dans l'ancien document mais absent du code.  
5. **listeMarque()** : existe dans le DAO mais aucune route ne l'expose.

---

## 📋 Gabarit pour ajouter une fonction

Copier la ligne ci-dessous et remplir chaque colonne :

| Description | fonctionFlask(paramètres) | METHODE | /chemin/de/la/route | .json ou vide | success / .json / integer | fonctionDAO(paramètres) |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| (ce que fait la fonction) | (nom et paramètres) | GET/POST | (chemin) | (entrée) | (sortie) | (nom et paramètres) |

&nbsp;