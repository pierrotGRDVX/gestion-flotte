DROP TABLE IF EXISTS resultat_ct;
DROP TABLE IF EXISTS controle_technique;
DROP TABLE IF EXISTS ville;
DROP TABLE IF EXISTS adresse;
DROP TABLE IF EXISTS ct_effectue;
DROP TABLE IF EXISTS proprietaire;


CREATE TABLE resultat_ct(
	resultat_ct VARCHAR(32) PRIMARY KEY CHECK (resultat_ct IN ('ok', 'reporte', 'refuse'))
);

CREATE TABLE controle_technique(
	id_ct INTEGER PRIMARY KEY,
	date_ct INTEGER NOT NULL,
	resultat_ct VARCHAR(32) NOT NULL,
	observation_ct VARCHAR(256),
	FOREIGN KEY (resultat_ct) REFERENCES resultat_ct(resultat_ct)
	);

CREATE TABLE ville(
	id_ville INTEGER PRIMARY KEY,
	nom_ville VARCHAR(256) NOT NULL,
	code_postal NUMERIC NOT NULL
);	

CREATE TABLE adresse(
	id_adresse INTEGER PRIMARY KEY,
	id_ville INTEGER NOT NULL,
	num_rue INTEGER,
	rue	VARCHAR(256),
	FOREIGN KEY (id_ville) REFERENCES ville(id_ville)
);

CREATE TABLE ct_effectue(
	immat VARCHAR(32) NOT NULL,
	id_ct NUMERIC UNIQUE NOT NULL,
	PRIMARY KEY(immat,id_ct),
	FOREIGN KEY (id_ct) REFERENCES controle_technique(id_ct),
	FOREIGN KEY (immat) REFERENCES vehicule(immat)
);

CREATE TABLE proprietaire(
	id_proprio INTEGER PRIMARY KEY,
	nom_proprio VARCHAR(256) NOT NULL,
	prenom_proprio VARCHAR(256) NOT NULL,
	email_proprio VARCHAR(256) NOT NULL,
	id_adresse_proprio INTEGER NOT NULL,
	FOREIGN KEY (id_adresse_proprio) REFERENCES adresse(id_adresse)
);