-- ============================================
-- DonneesBaseBDD.sql - donnees d'exemple
-- gestion de flotte
-- Compatible avec le MLD mld_vehicule.drawio (table energie ajoutee)
-- Categories = categories du code de la route francais
-- (AM, A1, A2, A, B, BE, C1, C, CE, D1, D, DE)
-- Ordre des INSERT respecte les cles etrangeres :
-- ville -> adresse -> marque/categorie/energie/permis -> modele
-- -> proprietaire -> vehicule -> controle_technique/ct_effectue
-- -> intervention
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
DELETE FROM energie;
DELETE FROM categorie;
DELETE FROM resultat_ct;
DELETE FROM permis;
DELETE FROM adresse;
DELETE FROM ville;

-- ============================================
-- Tables de reference
-- ============================================

INSERT INTO ville (id_ville, nom_ville, code_postal) VALUES
(1, 'Paris', '75001'),
(2, 'Lyon', '69001'),
(3, 'Marseille', '13001'),
(4, 'Nantes', '44000'),
(5, 'Bordeaux', '33000');
INSERT INTO adresse (id_adresse, id_ville, num_rue, rue, complement) VALUES
(1, 1, 12, 'Rue de la Paix', NULL),
(2, 2, 45, 'Avenue de la Republique', 'Batiment B'),
(3, 3, 8, 'Boulevard Mirabeau', NULL),
(4, 4, 102, 'Rue Sainte-Catherine', 'Appt 3'),
(5, 5, 7, 'Place Graslin', NULL);
INSERT INTO marque (marque) VALUES
('Renault'),
('Peugeot'),
('Citroen'),
('Toyota'),
('Mercedes'),
('Ford'),
('Fiat');
INSERT INTO energie (nom) VALUES
('Essence'),
('Diesel'),
('Electrique'),
('Hybride');
INSERT INTO categorie (categorie) VALUES
('AM'),
('A1'),
('A2'),
('A'),
('B'),
('BE'),
('C1'),
('C'),
('CE'),
('D1'),
('D'),
('DE');
INSERT INTO resultat_ct (resultat_ct) VALUES
('ok'), ('reporte'), ('refuse');
-- type_intervention : ids 1 a 4 crees par le script de creation
-- (1=plein, 2=nettoyage, 3=reparation, 4=gardiennage)

INSERT INTO permis (num_permis) VALUES
('PERMIS-2020-1111'),
('PERMIS-2018-2222'),
('PERMIS-2015-3333'),
('PERMIS-2019-4444'),
('PERMIS-2021-5555');
INSERT INTO categorie_detenues (num_permis, categorie) VALUES
('PERMIS-2020-1111', 'B'),
('PERMIS-2020-1111', 'AM'),
('PERMIS-2018-2222', 'B'),
('PERMIS-2018-2222', 'BE'),
('PERMIS-2018-2222', 'A2'),
('PERMIS-2015-3333', 'B'),
('PERMIS-2015-3333', 'C1'),
('PERMIS-2015-3333', 'C'),
('PERMIS-2015-3333', 'A'),
('PERMIS-2019-4444', 'B'),
('PERMIS-2019-4444', 'A1'),
('PERMIS-2021-5555', 'B'),
('PERMIS-2021-5555', 'BE'),
('PERMIS-2021-5555', 'D');
INSERT INTO modele (id_modele, modele, marque, categorie, cylindree, puissance, nbr_place) VALUES
(1, 'Clio 5', 'Renault', 'B', 1.3, 130, 5),
(2, 'Kangoo', 'Renault', 'B', 1.5, 115, 2),
(3, '208', 'Peugeot', 'B', 1.2, 110, 5),
(4, 'Expert', 'Peugeot', 'B', 2.0, 150, 3),
(5, 'C3', 'Citroen', 'B', 1.2, 110, 5),
(6, 'Berlingo', 'Citroen', 'B', 1.6, 120, 2),
(7, 'RAV4', 'Toyota', 'B', 2.5, 199, 5),
(8, 'Sprinter', 'Mercedes', 'C1', 2.1, 170, 3),
(9, 'Transit', 'Ford', 'C1', 2.0, 170, 3),
(10, 'Ducato', 'Fiat', 'C1', 2.3, 150, 3),
(11, 'Master', 'Renault', 'C1', 2.3, 150, 3),
(12, 'Yaris', 'Toyota', 'B', 1.5, 116, 5),
(13, 'Twingo', 'Renault', 'B', 1.0, 92, 4),
(14, 'Partner', 'Peugeot', 'B', 1.6, 120, 2);
INSERT INTO proprietaire (id_proprio, nom_proprio, prenom_proprio, date_naissance, sexe, email_proprio, id_adresse_proprio, num_permis) VALUES
(1, 'Dubois', 'Martin', '1985-03-12', 'M', 'martin.dubois@example.fr', 1, 'PERMIS-2020-1111'),
(2, 'Martin', 'Claire', '1990-07-25', 'F', 'claire.martin@example.fr', 2, 'PERMIS-2018-2222'),
(3, 'Bernard', 'Thomas', '1978-11-02', 'M', 'thomas.bernard@example.fr', 3, 'PERMIS-2015-3333'),
(4, 'Petit', 'Julie', '1995-01-18', 'F', 'julie.petit@example.fr', 4, 'PERMIS-2019-4444'),
(5, 'Durand', 'Nicolas', '1982-09-30', 'M', 'nicolas.durand@example.fr', 5, 'PERMIS-2021-5555');
-- ============================================
-- Vehicules (10 exemples)
-- ============================================

INSERT INTO vehicule (immat, date_mec, id_proprio, id_modele, num_serie, ptac, ptra, kilometrage_achat, prix_achat, etat, energie) VALUES
('AB-123-CD', '2019-04-15', 1, 1, 'VF15RJLJ555123456', 1550, 2500, 12000, 13500, 'en service', 'Essence'),
('EF-456-GH', '2020-08-02', 2, 4, 'VF3JZLUH777654321', 2800, 4200, 8500, 21000, 'en service', 'Diesel'),
('IJ-789-KL', '2018-01-20', 3, 7, 'JTMHV05J123456789', 2100, 3500, 25000, 28000, 'en service', 'Hybride'),
('MN-012-OP', '2017-06-11', 3, 8, 'WDD90612345678901', 3500, 5300, 38000, 32000, 'maintenance', 'Diesel'),
('QR-345-ST', '2016-09-28', 4, 6, 'VF77JWHC987654321', 2050, 3400, 55000, 17500, 'hors service', 'Diesel'),
('UV-678-WX', '2021-03-10', 5, 3, 'VF3PHNSJU12345678', 1250, 2000, 3000, 19000, 'en service', 'Essence'),
('YZ-901-AB', '2022-01-05', 1, 12, 'JTDKB20U123456789', 1250, 2100, 1500, 22500, 'en service', 'Hybride'),
('CD-234-EF', '2015-05-17', 2, 9, 'WF0XXXTTFX1234567', 3600, 5500, 62000, 28000, 'en service', 'Diesel'),
('GH-567-IJ', '2020-11-23', 5, 10, 'ZFA25000012345678', 3500, 5200, 15000, 27000, 'en service', 'Diesel'),
('KL-890-MN', '2019-07-30', 4, 5, 'VF7SXHKU987654321', 1350, 2200, 22000, 14800, 'maintenance', 'Essence');
-- ============================================
-- Controles techniques et liens ct_effectue
-- ============================================

INSERT INTO controle_technique (id_ct, date_ct, resultat_ct, observation_ct) VALUES
(1, '2024-11-04', 'ok', 'Rien a signaler'),
(2, '2024-01-24', 'ok', 'Freins avant a surveiller'),
(3, '2024-05-08', 'ok', 'Rien a signaler'),
(4, '2024-04-05', 'reporte', 'Pneus a remplacer avant hiver'),
(5, '2024-12-04', 'ok', 'Rien a signaler'),
(6, '2024-11-24', 'ok', 'Corrosion legere passage de roue'),
(7, '2024-09-03', 'refuse', 'Corrosion chasis importante'),
(8, '2024-10-14', 'ok', 'Rien a signaler'),
(9, '2024-01-01', 'reporte', 'Eclairage a reprendre'),
(10, '2024-02-07', 'ok', 'Rien a signaler');
INSERT INTO ct_effectue (immat, id_ct) VALUES
('AB-123-CD', 1),
('EF-456-GH', 2),
('IJ-789-KL', 3),
('MN-012-OP', 4),
('QR-345-ST', 5),
('UV-678-WX', 6),
('YZ-901-AB', 7),
('CD-234-EF', 8),
('GH-567-IJ', 9),
('KL-890-MN', 10);
-- ============================================
-- Interventions (100 exemples : 10 par vehicule)
-- id_type_inter : 1=plein, 2=nettoyage, 3=reparation, 4=gardiennage
-- Dates et kilometrages croissants par vehicule
-- ============================================

INSERT INTO intervention (id_inter, immat, date, cout_inter, prix_litre, volume, kilometrage, id_type_inter, observation) VALUES
(1, 'AB-123-CD', '2023-01-31', 98.76, NULL, NULL, 15193, 2, 'Lavage et aspirateur'),
(2, 'AB-123-CD', '2023-03-20', 75.85, 2.05, 37.0, 15819, 1, NULL),
(3, 'AB-123-CD', '2023-06-02', 70.85, 2.09, 33.9, 16808, 1, NULL),
(4, 'AB-123-CD', '2023-07-05', 66.42, 2.05, 32.4, 18344, 1, NULL),
(5, 'AB-123-CD', '2023-08-27', 591.89, NULL, NULL, 18899, 3, 'Echappement remplace'),
(6, 'AB-123-CD', '2023-11-03', 73.48, 1.97, 37.3, 19939, 1, NULL),
(7, 'AB-123-CD', '2023-12-17', 65.28, NULL, NULL, 20831, 3, 'Rotules et parallelisme'),
(8, 'AB-123-CD', '2024-01-16', 697.19, NULL, NULL, 21700, 3, 'Alternateur remplace'),
(9, 'AB-123-CD', '2024-04-03', 60.13, NULL, NULL, 22727, 2, 'Nettoyage apres chantier'),
(10, 'AB-123-CD', '2024-05-19', 570.4, NULL, NULL, 24274, 3, 'Embrayage remplace'),
(11, 'EF-456-GH', '2023-04-19', 155.82, NULL, NULL, 10702, 3, 'Alternateur remplace'),
(12, 'EF-456-GH', '2023-06-06', 679.0, NULL, NULL, 11471, 3, 'Remplacement plaquettes de frein'),
(13, 'EF-456-GH', '2023-06-30', 338.9, NULL, NULL, 12203, 3, 'Embrayage remplace'),
(14, 'EF-456-GH', '2023-08-29', 87.55, 2.06, 42.5, 13819, 1, NULL),
(15, 'EF-456-GH', '2023-11-15', 67.33, 2.01, 33.5, 15222, 1, NULL),
(16, 'EF-456-GH', '2024-01-07', 359.89, NULL, NULL, 16339, 3, 'Geometrale refaite'),
(17, 'EF-456-GH', '2024-03-13', 105.96, 1.93, 54.9, 16825, 1, NULL),
(18, 'EF-456-GH', '2024-04-08', 147.69, NULL, NULL, 18518, 3, 'Distribution et pompe a eau'),
(19, 'EF-456-GH', '2024-06-21', 62.32, NULL, NULL, 19776, 2, 'Lavage et aspirateur'),
(20, 'EF-456-GH', '2024-09-16', 91.1, 2.08, 43.8, 21469, 1, NULL),
(21, 'IJ-789-KL', '2023-04-22', 621.82, NULL, NULL, 26762, 3, 'Climatisation rechargee'),
(22, 'IJ-789-KL', '2023-06-18', 85.9, 2.08, 41.3, 28535, 1, NULL),
(23, 'IJ-789-KL', '2023-08-10', 103.82, NULL, NULL, 30115, 4, 'Gardiennage 2 semaines'),
(24, 'IJ-789-KL', '2023-10-07', 420.9, NULL, NULL, 30728, 3, 'Rotules et parallelisme'),
(25, 'IJ-789-KL', '2023-12-13', 445.32, NULL, NULL, 31029, 3, 'Echappement remplace'),
(26, 'IJ-789-KL', '2024-02-12', 32.31, NULL, NULL, 31958, 2, 'Nettoyage apres chantier'),
(27, 'IJ-789-KL', '2024-04-02', 108.16, 2.08, 52.0, 32433, 1, NULL),
(28, 'IJ-789-KL', '2024-06-23', 783.05, NULL, NULL, 32990, 3, 'Echappement remplace'),
(29, 'IJ-789-KL', '2024-07-29', 759.07, NULL, NULL, 33832, 3, 'Distribution et pompe a eau'),
(30, 'IJ-789-KL', '2024-10-24', 355.82, NULL, NULL, 35236, 3, 'Rotules et parallelisme'),
(31, 'MN-012-OP', '2023-03-11', 337.22, NULL, NULL, 41691, 3, 'Climatisation rechargee'),
(32, 'MN-012-OP', '2023-06-05', 47.27, NULL, NULL, 42683, 2, 'Nettoyage interieur complet'),
(33, 'MN-012-OP', '2023-06-27', 45.31, NULL, NULL, 42997, 2, 'Lavage haute pression'),
(34, 'MN-012-OP', '2023-07-26', 75.33, NULL, NULL, 43361, 3, 'Embrayage remplace'),
(35, 'MN-012-OP', '2023-09-26', 71.28, 1.98, 36.0, 44099, 1, NULL),
(36, 'MN-012-OP', '2023-12-24', 104.13, 1.95, 53.4, 45367, 1, NULL),
(37, 'MN-012-OP', '2024-02-13', 651.77, NULL, NULL, 45860, 3, 'Rotules et parallelisme'),
(38, 'MN-012-OP', '2024-03-16', 302.81, NULL, NULL, 47116, 3, 'Alternateur remplace'),
(39, 'MN-012-OP', '2024-04-11', 787.81, NULL, NULL, 47540, 3, 'Embrayage remplace'),
(40, 'MN-012-OP', '2024-06-21', 646.46, NULL, NULL, 48349, 3, 'Embrayage remplace'),
(41, 'QR-345-ST', '2023-04-05', 74.92, 1.85, 40.5, 57200, 1, NULL),
(42, 'QR-345-ST', '2023-05-04', 99.91, 1.94, 51.5, 57603, 1, NULL),
(43, 'QR-345-ST', '2023-08-01', 776.13, NULL, NULL, 58243, 3, 'Rotules et parallelisme'),
(44, 'QR-345-ST', '2023-10-12', 43.51, NULL, NULL, 58663, 2, 'Nettoyage avant revente'),
(45, 'QR-345-ST', '2023-11-22', 100.46, 1.84, 54.6, 59894, 1, NULL),
(46, 'QR-345-ST', '2024-01-17', 113.19, 2.1, 53.9, 61332, 1, NULL),
(47, 'QR-345-ST', '2024-04-08', 78.17, 2.09, 37.4, 62818, 1, NULL),
(48, 'QR-345-ST', '2024-07-06', 66.91, 1.77, 37.8, 64094, 1, NULL),
(49, 'QR-345-ST', '2024-09-28', 78.42, NULL, NULL, 65434, 4, 'Gardiennage 2 semaines'),
(50, 'QR-345-ST', '2024-10-28', 82.76, NULL, NULL, 67116, 3, 'Embrayage remplace'),
(51, 'UV-678-WX', '2023-04-09', 96.23, 1.84, 52.3, 5998, 1, NULL),
(52, 'UV-678-WX', '2023-05-04', 66.11, NULL, NULL, 7455, 2, 'Lavage et aspirateur'),
(53, 'UV-678-WX', '2023-07-29', 72.27, 1.98, 36.5, 8398, 1, NULL),
(54, 'UV-678-WX', '2023-09-17', 65.93, 1.98, 33.3, 9634, 1, NULL),
(55, 'UV-678-WX', '2023-11-16', 122.93, NULL, NULL, 10872, 4, 'Gardiennage 2 semaines'),
(56, 'UV-678-WX', '2023-12-18', 64.95, 1.84, 35.3, 11886, 1, NULL),
(57, 'UV-678-WX', '2024-01-15', 314.54, NULL, NULL, 13083, 3, 'Distribution et pompe a eau'),
(58, 'UV-678-WX', '2024-04-13', 500.99, NULL, NULL, 13399, 3, 'Echappement remplace'),
(59, 'UV-678-WX', '2024-07-12', 96.93, 2.08, 46.6, 13974, 1, NULL),
(60, 'UV-678-WX', '2024-09-03', 63.44, 1.94, 32.7, 14831, 1, NULL),
(61, 'YZ-901-AB', '2023-02-25', 186.77, NULL, NULL, 5073, 3, 'Echange standard moteur'),
(62, 'YZ-901-AB', '2023-05-18', 93.28, 1.77, 52.7, 6672, 1, NULL),
(63, 'YZ-901-AB', '2023-07-31', 63.95, NULL, NULL, 7239, 3, 'Climatisation rechargee'),
(64, 'YZ-901-AB', '2023-09-22', 82.0, 2.0, 41.0, 8687, 1, NULL),
(65, 'YZ-901-AB', '2023-10-13', 106.66, 1.99, 53.6, 9292, 1, NULL),
(66, 'YZ-901-AB', '2024-01-10', 76.05, 1.94, 39.2, 10472, 1, NULL),
(67, 'YZ-901-AB', '2024-02-15', 81.33, 2.08, 39.1, 10853, 1, NULL),
(68, 'YZ-901-AB', '2024-04-20', 64.8, 1.79, 36.2, 12299, 1, NULL),
(69, 'YZ-901-AB', '2024-07-01', 102.44, NULL, NULL, 12931, 4, 'Gardiennage hiver'),
(70, 'YZ-901-AB', '2024-08-12', 49.09, NULL, NULL, 14074, 3, 'Climatisation rechargee'),
(71, 'CD-234-EF', '2023-03-18', 88.96, 1.79, 49.7, 64750, 1, NULL),
(72, 'CD-234-EF', '2023-06-06', 96.26, 1.91, 50.4, 65675, 1, NULL),
(73, 'CD-234-EF', '2023-07-25', 87.88, 1.89, 46.5, 66545, 1, NULL),
(74, 'CD-234-EF', '2023-08-22', 50.7, NULL, NULL, 68236, 4, 'Stationnement prolonge garage'),
(75, 'CD-234-EF', '2023-11-18', 63.24, 2.06, 30.7, 69070, 1, NULL),
(76, 'CD-234-EF', '2023-12-30', 128.19, NULL, NULL, 69592, 2, 'Nettoyage interieur complet'),
(77, 'CD-234-EF', '2024-03-14', 94.43, 1.9, 49.7, 70939, 1, NULL),
(78, 'CD-234-EF', '2024-04-17', 81.7, 1.84, 44.4, 72690, 1, NULL),
(79, 'CD-234-EF', '2024-07-01', 103.01, 1.94, 53.1, 74463, 1, NULL),
(80, 'CD-234-EF', '2024-08-15', 62.77, 1.98, 31.7, 75439, 1, NULL),
(81, 'GH-567-IJ', '2023-02-24', 261.25, NULL, NULL, 18307, 3, 'Echange standard moteur'),
(82, 'GH-567-IJ', '2023-05-07', 91.96, 1.94, 47.4, 18999, 1, NULL),
(83, 'GH-567-IJ', '2023-07-19', 321.94, NULL, NULL, 20559, 3, 'Distribution et pompe a eau'),
(84, 'GH-567-IJ', '2023-09-15', 94.49, 1.86, 50.8, 21289, 1, NULL),
(85, 'GH-567-IJ', '2023-11-29', 497.13, NULL, NULL, 22541, 3, 'Climatisation rechargee'),
(86, 'GH-567-IJ', '2024-02-13', 67.78, 1.92, 35.3, 23188, 1, NULL),
(87, 'GH-567-IJ', '2024-03-14', 91.8, 1.97, 46.6, 23679, 1, NULL),
(88, 'GH-567-IJ', '2024-05-03', 202.97, NULL, NULL, 24280, 3, 'Rotules et parallelisme'),
(89, 'GH-567-IJ', '2024-05-26', 107.02, 1.96, 54.6, 24729, 1, NULL),
(90, 'GH-567-IJ', '2024-08-12', 83.17, 1.82, 45.7, 26455, 1, NULL),
(91, 'KL-890-MN', '2023-03-25', 81.2, 1.75, 46.4, 24530, 1, NULL),
(92, 'KL-890-MN', '2023-06-07', 99.7, 1.99, 50.1, 25781, 1, NULL),
(93, 'KL-890-MN', '2023-07-03', 120.92, NULL, NULL, 27015, 2, 'Nettoyage interieur complet'),
(94, 'KL-890-MN', '2023-08-09', 544.03, NULL, NULL, 28534, 3, 'Echappement remplace'),
(95, 'KL-890-MN', '2023-10-08', 118.06, NULL, NULL, 29956, 4, 'Stationnement prolonge garage'),
(96, 'KL-890-MN', '2023-12-24', 602.61, NULL, NULL, 31177, 3, 'Amortisseurs avants remplaces'),
(97, 'KL-890-MN', '2024-02-15', 676.69, NULL, NULL, 32544, 3, 'Echange standard moteur'),
(98, 'KL-890-MN', '2024-05-07', 50.21, NULL, NULL, 34305, 2, 'Nettoyage interieur complet'),
(99, 'KL-890-MN', '2024-07-02', 79.1, 2.06, 38.4, 34770, 1, NULL),
(100, 'KL-890-MN', '2024-08-08', 71.28, 1.8, 39.6, 35508, 1, NULL);
