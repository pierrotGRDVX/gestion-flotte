-- ============================================
-- DonneesBaseBDD.sql - donnees d'exemple
-- gestion de flotte
-- Ordre des INSERT respecte les cles etrangeres :
-- ville -> adresse -> marque/categorie/permis -> modele
-- -> proprietaire -> vehicule -> intervention
-- ============================================

-- Nettoyage des donnees existantes (ordre inverse des dependances)
DELETE FROM ct_effectue;
DELETE FROM intervention;
DELETE FROM controle_technique;
DELETE FROM categorie_detenues;
DELETE FROM vehicule;
DELETE FROM proprietaire;
DELETE FROM modele;
DELETE FROM marque;
DELETE FROM categorie;
DELETE FROM resultat_ct;
DELETE FROM permis;
DELETE FROM adresse;
DELETE FROM ville;

-- ============================================
-- Tables de reference
-- ============================================

INSERT INTO ville (id_ville, nom_ville, code_postal) VALUES
(1,  'Paris',          '75001'),
(2,  'Lyon',           '69001'),
(3,  'Marseille',      '13001'),
(4,  'Bordeaux',       '33000'),
(5,  'Nantes',         '44000'),
(6,  'Toulouse',       '31000'),
(7,  'Lille',          '59000'),
(8,  'Strasbourg',     '67000'),
(9,  'Rennes',         '35000'),
(10, 'Nice',           '06000');

INSERT INTO adresse (id_adresse, id_ville, num_rue, rue, complement) VALUES
(1,  1, 12,  'Rue de la Paix',        NULL),
(2,  2, 45,  'Avenue de la Republique','Batiment B'),
(3,  3, 8,   'Boulevard Mirabeau',    NULL),
(4,  4, 102, 'Rue Sainte-Catherine',  'Appt 3'),
(5,  5, 7,   'Place Graslin',         NULL),
(6,  6, 33,  'Allees Jean-Jaures',    NULL),
(7,  7, 21,  'Rue Nationale',         'Residence Nord'),
(8,  8, 5,   'Quai des Bateliers',    NULL),
(9,  9, 18,  'Rue de Nemours',        NULL),
(10, 9, 4,   'Rue Le Bastard',        'Etage 2'),
(11, 10, 60, 'Promenade des Anglais', NULL),
(12, 1, 3,   'Rue du Havre',          NULL);

INSERT INTO marque (marque) VALUES
('Renault'),
('Peugeot'),
('Citroen'),
('Toyota'),
('Mercedes');

INSERT INTO categorie (categorie) VALUES
('berline'),
('utilitaire'),
('suv'),
('citadine');

INSERT INTO resultat_ct (resultat_ct) VALUES
('ok'),
('reporte'),
('refuse');

-- type_intervention : ids 1 a 4 crees par le script de creation
-- (plein, nettoyage, reparation, gardiennage)

INSERT INTO permis (num_permis) VALUES
('PERMIS-2020-1111'),
('PERMIS-2018-2222'),
('PERMIS-2015-3333'),
('PERMIS-2019-4444'),
('PERMIS-2021-5555'),
('PERMIS-2017-6666'),
('PERMIS-2016-7777'),
('PERMIS-2019-8888');

INSERT INTO categorie_detenues (num_permis, categorie) VALUES
('PERMIS-2020-1111', 'berline'),
('PERMIS-2020-1111', 'citadine'),
('PERMIS-2018-2222', 'utilitaire'),
('PERMIS-2018-2222', 'berline'),
('PERMIS-2015-3333', 'suv'),
('PERMIS-2015-3333', 'berline'),
('PERMIS-2019-4444', 'citadine'),
('PERMIS-2021-5555', 'berline'),
('PERMIS-2017-6666', 'utilitaire'),
('PERMIS-2017-6666', 'suv'),
('PERMIS-2016-7777', 'berline'),
('PERMIS-2019-8888', 'suv'),
('PERMIS-2019-8888', 'utilitaire');

-- ============================================
-- Modeles
-- ============================================

INSERT INTO modele (id_modele, modele, marque, categorie, cylindree, puissance, nbr_place) VALUES
(1, 'Clio 4',       'Renault',  'citadine',  1.5,   90,  5),
(2, 'Kangoo',       'Renault',  'utilitaire', 1.5,  110,  2),
(3, '208',          'Peugeot',  'citadine',  1.2,  100,  5),
(4, 'Expert',       'Peugeot',  'utilitaire', 2.0, 150,  3),
(5, 'C3',           'Citroen',  'citadine',  1.2,   82,  5),
(6, 'Berlingo',     'Citroen',  'utilitaire', 1.6, 115,  2),
(7, 'RAV4',         'Toyota',   'suv',       2.5,  199,  5),
(8, 'Hilux',        'Toyota',   'utilitaire', 2.8, 204,  5),
(9, 'Classe C',     'Mercedes', 'berline',   2.0,  184,  5),
(10,'Sprinter',     'Mercedes', 'utilitaire', 2.1, 170,  3);

-- ============================================
-- Proprietaires
-- ============================================

INSERT INTO proprietaire (id_proprio, nom_proprio, prenom_proprio, date_naissance, sexe, email_proprio, id_adresse_proprio, num_permis) VALUES
(1,  'Dubois',    'Martin',  '1985-03-12', 'M', 'martin.dubois@example.fr',    1,  'PERMIS-2020-1111'),
(2,  'Martin',    'Claire',  '1990-07-25', 'F', 'claire.martin@example.fr',    2,  'PERMIS-2018-2222'),
(3,  'Bernard',   'Thomas',  '1978-11-02', 'M', 'thomas.bernard@example.fr',   3,  'PERMIS-2015-3333'),
(4,  'Petit',     'Julie',   '1995-01-18', 'F', 'julie.petit@example.fr',      4,  'PERMIS-2019-4444'),
(5,  'Durand',    'Nicolas', '1982-09-30', 'M', 'nicolas.durand@example.fr',   5,  'PERMIS-2021-5555'),
(6,  'Leroy',     'Sophie',  '1988-05-14', 'F', 'sophie.leroy@example.fr',    10, 'PERMIS-2017-6666'),
(7,  'Moreau',    'Laurent', '1975-12-08', 'M', 'laurent.moreau@example.fr',   7,  'PERMIS-2016-7777'),
(8,  'Girard',    'Emma',    '1993-04-21', 'F', 'emma.girard@example.fr',      11, 'PERMIS-2019-8888');

-- ============================================
-- Vehicules (5 exemples)
-- ============================================

INSERT INTO vehicule (immat, date_mec, id_proprio, id_modele, num_serie, ptac, ptra, kilometrage_achat, prix_achat, etat) VALUES
('AB-123-CD', '2019-04-15', 1, 1,  'VF15RJLJ555123456', 1550, 2500,  12000, 13500, 'en_service'),
('EF-456-GH', '2020-08-02', 2, 4,  'VF3JZLUH777654321', 2800, 4200,   8500, 21000, 'en_service'),
('IJ-789-KL', '2018-01-20', 3, 7,  'JTMHV05J123456789', 2100, 3500,  25000, 28000, 'en_service'),
('MN-012-OP', '2017-06-11', 5, 9,  'WDD20401234567890', 1950, 3200,  38000, 32000, 'endommagé'),
('QR-345-ST', '2016-09-28', 6, 6,  'VF77JWHC987654321', 2050, 3400,  55000, 17500, 'non_roulant');

-- ============================================
-- Controles techniques et liens ct_effectue
-- ============================================

INSERT INTO controle_technique (id_ct, date_ct, resultat_ct, observation_ct) VALUES
(1, '2024-02-10', 'ok',       'Rien a signaler'),
(2, '2024-05-22', 'ok',       'Freins avant a surveiller'),
(3, '2024-09-14', 'reporte',  'Pneus a remplacer avant hiver'),
(4, '2025-01-08', 'ok',       NULL),
(5, '2024-11-30', 'refuse',   'Corrosion chasis importante');

INSERT INTO ct_effectue (immat, id_ct) VALUES
('AB-123-CD', 1),
('EF-456-GH', 2),
('IJ-789-KL', 3),
('MN-012-OP', 4),
('QR-345-ST', 5);

-- ============================================
-- Interventions (20 exemples)
-- id_type_inter : 1=plein, 2=nettoyage, 3=reparation, 4=gardiennage
-- ============================================

INSERT INTO intervention (id_inter, immat, date, cout_inter, prix_litre, volume, kilometrage, id_type_inter, observation) VALUES
(1,  'AB-123-CD', '2024-03-05', 65.50,  1.85, 35.4,  12500, 1, NULL),
(2,  'AB-123-CD', '2024-04-12', 30.00,  NULL, NULL, 12900, 2, 'Nettoyage interieur complet'),
(3,  'AB-123-CD', '2024-06-18', 289.90, NULL, NULL, 14200, 3, 'Remplacement plaquettes de frein'),
(4,  'AB-123-CD', '2024-07-25', 62.10,  1.87, 33.2,  14750, 1, NULL),
(5,  'EF-456-GH', '2024-02-20', 88.40,  1.79, 49.4,  9100,  1, NULL),
(6,  'EF-456-GH', '2024-03-30', 45.00,  NULL, NULL, 9600,  2, 'Lavage haute pression'),
(7,  'EF-456-GH', '2024-05-15', 420.00, NULL, NULL, 10400, 3, 'Embrayage remplace'),
(8,  'EF-456-GH', '2024-06-10', 91.20,  1.83, 49.8,  10850, 1, NULL),
(9,  'EF-456-GH', '2024-08-01', 120.00, NULL, NULL, 11500, 4, 'Gardiennage 2 semaines'),
(10, 'IJ-789-KL', '2024-01-14', 74.60,  1.91, 39.0,  26200, 1, NULL),
(11, 'IJ-789-KL', '2024-03-22', 35.00,  NULL, NULL, 27050, 2, 'Nettoyage apres chantier'),
(12, 'IJ-789-KL', '2024-07-09', 560.00, NULL, NULL, 28900, 3, 'Distribution et pompe a eau'),
(13, 'IJ-789-KL', '2024-08-20', 77.30,  1.88, 41.1,  29400, 1, NULL),
(14, 'MN-012-OP', '2024-04-02', 68.90,  1.80, 38.3,  39100, 1, NULL),
(15, 'MN-012-OP', '2024-05-19', 250.00, NULL, NULL, 39800, 3, 'Rotules et parallelisme'),
(16, 'MN-012-OP', '2024-09-03', 70.15,  1.84, 38.1,  41200, 1, NULL),
(17, 'MN-012-OP', '2024-10-11', 90.00,  NULL, NULL, 41500, 4, 'Gardiennage hiver'),
(18, 'QR-345-ST', '2024-06-25', 59.80,  1.86, 32.1,  56100, 1, NULL),
(19, 'QR-345-ST', '2024-08-14', 780.00, NULL, NULL, 56800, 3, 'Echange standard moteur'),
(20, 'QR-345-ST', '2024-11-05', 55.00,  NULL, NULL, 57000, 2, 'Nettoyage avant revente');
