-- ============================================
-- Création base de données - gestion de flotte
-- Basé sur le MLD mld_vehicule.drawio corrigé
-- ============================================

-- Suppression des tables (ordre inverse des dépendances)
DROP TABLE IF EXISTS ct_effectue;
DROP TABLE IF EXISTS intervention;
DROP TABLE IF EXISTS controle_technique;
DROP TABLE IF EXISTS resultat_ct;
DROP TABLE IF EXISTS type_intervention;
DROP TABLE IF EXISTS categorie_detenues;
DROP TABLE IF EXISTS permis;
DROP TABLE IF EXISTS vehicule;
DROP TABLE IF EXISTS proprietaire;
DROP TABLE IF EXISTS modele;
DROP TABLE IF EXISTS marque;
DROP TABLE IF EXISTS categorie;
DROP TABLE IF EXISTS adresse;
DROP TABLE IF EXISTS ville;

-- ============================================
-- Tables de référence
-- ============================================

CREATE TABLE ville (
    id_ville     INTEGER PRIMARY KEY,
    nom_ville    VARCHAR(256) NOT NULL,
    code_postal  VARCHAR(5) NOT NULL
);

CREATE TABLE adresse (
    id_adresse   INTEGER PRIMARY KEY,
    id_ville     INTEGER NOT NULL,
    num_rue      INTEGER,
    rue          VARCHAR(256),
    complement   VARCHAR(256),
    FOREIGN KEY (id_ville) REFERENCES ville(id_ville)
);

CREATE TABLE marque (
    marque  VARCHAR(256) PRIMARY KEY
);

CREATE TABLE categorie (
    categorie  VARCHAR(256) PRIMARY KEY
);

CREATE TABLE resultat_ct (
    resultat_ct  VARCHAR(32) PRIMARY KEY
        CHECK (resultat_ct IN ('ok', 'reporte', 'refuse'))
);

CREATE TABLE type_intervention (
    id_type_inter     INTEGER PRIMARY KEY,
    nom_intervention  VARCHAR(256) NOT NULL
);

CREATE TABLE permis (
    num_permis  VARCHAR(256) PRIMARY KEY
);

-- ============================================
-- Tables principales
-- ============================================

CREATE TABLE modele (
    id_modele   INTEGER PRIMARY KEY,
    modele      VARCHAR(256) NOT NULL,
    marque      VARCHAR(256) NOT NULL,
    categorie   VARCHAR(256) NOT NULL,
    cylindree   NUMERIC,
    puissance   NUMERIC,
    nbr_place   INTEGER,
    FOREIGN KEY (marque) REFERENCES marque(marque),
    FOREIGN KEY (categorie) REFERENCES categorie(categorie)
);

CREATE TABLE proprietaire (
    id_proprio           INTEGER PRIMARY KEY,
    nom_proprio          VARCHAR(256) NOT NULL,
    prenom_proprio       VARCHAR(256) NOT NULL,
    sexe                 VARCHAR(1),
    email_proprio        VARCHAR(256) NOT NULL,
    id_adresse_proprio   INTEGER NOT NULL,
    num_permis           VARCHAR(256),
    FOREIGN KEY (id_adresse_proprio) REFERENCES adresse(id_adresse),
    FOREIGN KEY (num_permis) REFERENCES permis(num_permis)
);

CREATE TABLE vehicule (
    immat               VARCHAR(32) PRIMARY KEY,
    date_mec            DATE,
    id_proprio          INTEGER,
    id_modele           INTEGER,
    num_serie           VARCHAR(256),
    ptac                NUMERIC,
    ptra                NUMERIC,
    kilometrage_achat   NUMERIC,
    prix_achat          NUMERIC,
    etat                VARCHAR(256),
    FOREIGN KEY (id_proprio) REFERENCES proprietaire(id_proprio),
    FOREIGN KEY (id_modele) REFERENCES modele(id_modele)
);

CREATE TABLE categorie_detenues (
    num_permis  VARCHAR(256) NOT NULL,
    categorie   VARCHAR(256) NOT NULL,
    PRIMARY KEY (num_permis, categorie),
    FOREIGN KEY (num_permis) REFERENCES permis(num_permis),
    FOREIGN KEY (categorie) REFERENCES categorie(categorie)
);

CREATE TABLE controle_technique (
    id_ct            INTEGER PRIMARY KEY,
    date_ct          DATE NOT NULL,
    resultat_ct      VARCHAR(32) NOT NULL,
    observation_ct   VARCHAR(256),
    FOREIGN KEY (resultat_ct) REFERENCES resultat_ct(resultat_ct)
);

CREATE TABLE intervention (
    id_inter        INTEGER PRIMARY KEY,
    immat           VARCHAR(32) NOT NULL,
    date            DATE,
    cout_inter      NUMERIC,
    prix_litre      NUMERIC,
    volume          NUMERIC,
    kilometrage     NUMERIC,
    id_type_inter   INTEGER,
    observation     VARCHAR(256),
    FOREIGN KEY (immat) REFERENCES vehicule(immat),
    FOREIGN KEY (id_type_inter) REFERENCES type_intervention(id_type_inter)
);

-- ============================================
-- Tables de liaison
-- ============================================

CREATE TABLE ct_effectue (
    immat   VARCHAR(32) NOT NULL,
    id_ct   INTEGER NOT NULL,
    PRIMARY KEY (immat, id_ct),
    FOREIGN KEY (immat) REFERENCES vehicule(immat),
    FOREIGN KEY (id_ct) REFERENCES controle_technique(id_ct)
);
