// bouton -> btn
// Input -> ipt
// Select -> slt
// Radio -> rdo
// PopUp -> pup
// texte area -> txa

// Variables globales
let liste_ville = [];
let liste_adresse = [];
let liste_categorie = [];
let liste_permis = [];

// Charger les données initiales
fetch('/liste/ville')
    .then(response => response.json())
    .then(data => {
        liste_ville = data;
        MAJSelectionVille(liste_ville);
        console.log("Listes des villes téléchargées", liste_ville);
    })
    .catch(error => {
        console.error('Erreur lors du chargement des villes :', error);
    });

fetch('/liste/categorie')
    .then(response => response.json())
    .then(data => {
        liste_categorie = data;
        MAJSelectionCategorie(liste_categorie);
        console.log("Listes des catégories téléchargées", liste_categorie);
    })
    .catch(error => {
        console.error('Erreur lors du chargement des catégories :', error);
    });

fetch('/liste/adresse')
    .then(response => response.json())
    .then(data => {
        liste_adresse = data;
        MAJSelectionAdresse(liste_adresse);
        console.log("Listes des adresses téléchargées", liste_adresse);
    })
    .catch(error => {
        console.error('Erreur lors du chargement des adresses :', error);
    });

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    // Écouteurs d'événements pour les boutons des popups
    const btnVille = document.getElementById('btn_ville');
    if (btnVille) {
        btnVille.addEventListener('click', () => {
            console.info("bouton ville cliqué");
            const pupVille = document.getElementById('pup_ville');
            if (pupVille) pupVille.classList.add('is-active');
        });
    }

    const btnPupVilleClose = document.getElementById('btn_pup_ville_close');
    if (btnPupVilleClose) {
        btnPupVilleClose.addEventListener('click', () => {
            const pupVille = document.getElementById('pup_ville');
            if (pupVille) pupVille.classList.remove('is-active');
        });
    }

    const pupVilleBackground = document.getElementById('pup_ville')?.querySelector('.modal-background');
    if (pupVilleBackground) {
        pupVilleBackground.addEventListener('click', () => {
            const pupVille = document.getElementById('pup_ville');
            if (pupVille) pupVille.classList.remove('is-active');
        });
    }

    // Enregistrer une nouvelle ville
    const btnSavePupVille = document.getElementById('btn_save_pup_ville');
    if (btnSavePupVille) {
        btnSavePupVille.addEventListener('click', () => {
            console.info("bouton enregistrer ville appuyé");
            const ville = document.getElementById('ipt_pup_ville')?.value.trim();
            const CP = document.getElementById('ipt_pup_code_postal')?.value.trim();

            if (!ville) {
                alert('Veuillez entrer une ville');
            } else if (!CP) {
                alert('Veuillez entrer un code postal');
            } else {
                EnregisterNvlleVille(ville, CP);
                window.location.reload();
            }
        });
    }

    // Écouteurs pour les adresses
    const btnAdresse = document.getElementById('btn_adresse');
    if (btnAdresse) {
        btnAdresse.addEventListener('click', () => {
            console.info("bouton Adresse cliqué");
            const pupAdresse = document.getElementById('pup_adresse');
            if (pupAdresse) pupAdresse.classList.add('is-active');
        });
    }

    const btnPupAdresseClose = document.getElementById('btn_pup_adresse_close');
    if (btnPupAdresseClose) {
        btnPupAdresseClose.addEventListener('click', () => {
            const pupAdresse = document.getElementById('pup_adresse');
            if (pupAdresse) pupAdresse.classList.remove('is-active');
        });
    }

    const pupAdresseBackground = document.getElementById('pup_adresse')?.querySelector('.modal-background');
    if (pupAdresseBackground) {
        pupAdresseBackground.addEventListener('click', () => {
            const pupAdresse = document.getElementById('pup_adresse');
            if (pupAdresse) pupAdresse.classList.remove('is-active');
        });
    }

    // Enregistrer une nouvelle adresse
    const btnSavePupAdresse = document.getElementById('btn_save_pup_adresse');
    if (btnSavePupAdresse) {
        btnSavePupAdresse.addEventListener('click', () => {
            console.info("bouton enregistrer adresse appuyé");
            const ville = document.getElementById('slt_pup_ville')?.value;
            console.info(ville);
            const num = document.getElementById('ipt_pup_numero')?.value;
            const rue = document.getElementById('ipt_pup_rue')?.value;
            const complement = document.getElementById('ipt_pup_complement')?.value;

            if (ville === '--Selectionner--' || !rue) {
                alert('Veuillez entrer toutes les données nécessaires');
            } else {
                EnregisterAdresse(ville, num, rue, complement);
                window.location.reload();
            }
        });
    }

    // Écouteurs pour les catégories
    const btnCategorie = document.getElementById('btn_categorie');
    if (btnCategorie) {
        btnCategorie.addEventListener('click', () => {
            console.info("bouton Catégorie cliqué");
            const pupCategorie = document.getElementById('pup_categorie');
            if (pupCategorie) pupCategorie.classList.add('is-active');
        });
    }

    const btnPupCategorieClose = document.getElementById('btn_pup_categorie_close');
    if (btnPupCategorieClose) {
        btnPupCategorieClose.addEventListener('click', () => {
            const pupCategorie = document.getElementById('pup_categorie');
            if (pupCategorie) pupCategorie.classList.remove('is-active');
        });
    }

    const pupCategorieBackground = document.getElementById('pup_categorie')?.querySelector('.modal-background');
    if (pupCategorieBackground) {
        pupCategorieBackground.addEventListener('click', () => {
            const pupCategorie = document.getElementById('pup_categorie');
            if (pupCategorie) pupCategorie.classList.remove('is-active');
        });
    }

    // Enregistrer une nouvelle catégorie
    const btnPupSaveCategorie = document.getElementById('btn_pup_save_categorie');
    if (btnPupSaveCategorie) {
        btnPupSaveCategorie.addEventListener('click', () => {
            console.info("bouton enregistrer catégorie appuyé");
            const categorie = document.getElementById('ipt_pup_categorie')?.value.trim();

            if (!categorie) {
                alert('Veuillez entrer une catégorie');
            } else {
                EnregisterCategorie(categorie);
            }
        });
    }

    // Mise en forme des inputs
    const iptNaissance = document.getElementById("ipt_naissance");
    if (iptNaissance) {
        iptNaissance.addEventListener("input", function(e) {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length > 2) {
                value = value.slice(0, 2) + "-" + value.slice(2);
            }
            if (value.length > 5) {
                value = value.slice(0, 5) + "-" + value.slice(5, 9);
            }
            e.target.value = value;
        });
    }

    const iptPupVille = document.getElementById("ipt_pup_ville");
    if (iptPupVille) {
        iptPupVille.addEventListener("input", function(e) {
            e.target.value = e.target.value.toUpperCase();
        });
    }

    // Écouteur pour le bouton Enregistrer
    const btnEnregistrer = document.getElementById('btn_enregistrer');
    if (btnEnregistrer) {
        btnEnregistrer.addEventListener('click', () => {
            console.info("bouton enregistrer cliqué");
            if (ControleRemplissage()) {
                const num_permis = document.getElementById("ipt_num_permis")?.value;
                const Nom = document.getElementById("ipt_nom")?.value;
                const prenom = document.getElementById("ipt_prenom")?.value;
                const genre_selectionnee = document.querySelectorAll('input[type="radio"][name="answer"]:checked');
                const sexe = genre_selectionnee.length > 0 ? genre_selectionnee[0].value : null;
                const date = document.getElementById("ipt_naissance")?.value;
                const e_mail = document.getElementById("ipt_email")?.value;
                const adresse = document.getElementById("slt_adresse")?.value;
                const id_adresse = adresse ? adresse.split("# ")[0] : null;

                liste_permis = Array.from(
                    document.querySelectorAll('#ckb_categorie input[type="checkbox"]:checked')
                ).map(checkbox => checkbox.value);

                console.log("Liste des permis :", liste_permis);
                EnregistrerPermis(num_permis, liste_permis);
                EnregistrerPax(Nom, prenom, sexe, date, e_mail, id_adresse, num_permis);
            } else {
                console.info("Veuillez renseigner toutes les informations");
            }
        });
    }
});

// Fonctions de mise à jour des sélections
function MAJSelectionCategorie(data) {
    if (!data || data.length === 0) {
        console.error("Aucune catégorie à afficher");
        return;
    }
    const conteneurHTML = document.getElementById("ckb_categorie");
    if (!conteneurHTML) return;

    conteneurHTML.innerHTML = '';
    data.forEach(item => {
        const label = document.createElement("label");
        label.className = "checkbox";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = item.categorie || item;
        input.value = item.categorie || item;
        label.appendChild(input);
        label.appendChild(document.createTextNode(item.categorie || item));
        conteneurHTML.appendChild(label);
    });
}

function MAJSelectionVille(data) {
    if (!data || data.length === 0) {
        console.error("Aucune ville à afficher");
        return;
    }
    const contenu = document.getElementById("slt_pup_ville");
    if (!contenu) return;

    contenu.innerHTML = '<option value="--Selectionner--">--Sélectionner--</option>';
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = `${item.code_postal} - ${item.nom_ville}`;
        option.textContent = `${item.code_postal} - ${item.nom_ville}`;
        contenu.appendChild(option);
    });
}

function MAJSelectionAdresse(liste_adresse) {
    if (!liste_adresse || liste_adresse.length === 0) {
        console.error("Aucune adresse à afficher");
        return;
    }
    const contenu = document.getElementById("slt_adresse");
    if (!contenu) return;

    contenu.innerHTML = '<option value="--Selectionner--">--Sélectionner--</option>';
    liste_adresse.forEach(item => {
        const option = document.createElement("option");
        option.value = `${item.id_adresse}# ${item.code_postal} - ${item.nom_ville} | ${item.complement || ''} | ${item.num_rue} ${item.rue}`;
        option.textContent = `${item.id_adresse}# ${item.code_postal} - ${item.nom_ville} | ${item.complement || ''} | ${item.num_rue} ${item.rue}`;
        contenu.appendChild(option);
    });
}

// Fonctions d'enregistrement
function EnregisterNvlleVille(ville, CP) {
    const data = {
        nom_ville: ville,
        code_postal: CP
    };
    console.log('Données à envoyer :', data);
    fetch('/nouvelle/ville', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données de la ville :', error);
    });
}

function EnregisterCategorie(categorie) {
    const data = {
        categorie: categorie
    };
    console.log('Données à envoyer :', data);
    fetch('/nouvelle/categorie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données de la catégorie :', error);
    });
}

function EnregisterAdresse(ville, num, rue, complement) {
    console.info(ville);
    console.info(liste_ville);
    const ville_choisie = liste_ville.find(v =>
        v.nom_ville == ville.split(" - ")[1] && v.code_postal == ville.split(" - ")[0])

    if (!ville_choisie) {
        console.error("Ville non trouvée");
        return;
    }
    const data = {
        id_ville: ville_choisie.id_ville,
        num_rue: num,
        rue: rue,
        complement: complement
    };
    console.log('Données à envoyer :', data);
    fetch('/nouvelle/adresse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données de l\'adresse :', error);
    });
}

function EnregistrerPax(Nom, prenom, sexe, date, e_mail, id_adresse, num_permis) {
    const data = {
        nom_proprio: Nom,
        prenom_proprio: prenom,
        sexe: sexe,
        date_naissance: date,
        email_proprio: e_mail,
        id_adresse_proprio: id_adresse,
        num_permis: num_permis
    };
    console.log('Données à envoyer :', data);
    fetch('/nouveau/proprio', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données du propriétaire :', error);
    });
}

function EnregistrerPermis(numeros, liste_permis) {
    const data = {
        num_permis: numeros,
        liste_categorie: liste_permis
    };
    console.log('Données à envoyer :', data);
    fetch('/nouveau/permis', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données du permis :', error);
    });
}

// Fonction de contrôle de remplissage
function ControleRemplissage() {
    let resultat = true;

    if (!document.getElementById("ipt_nom")?.value) {
        resultat = false;
    }
    if (!document.getElementById("ipt_prenom")?.value) {
        resultat = false;
    }
    if (!document.getElementById("ipt_naissance")?.value) {
        resultat = false;
    }
    if (!document.getElementById("ipt_email")?.value) {
        resultat = false;
    }
    if (document.getElementById("slt_adresse")?.value === "--Selectionner--") {
        resultat = false;
    }
    if (!document.getElementById("ipt_num_permis")?.value) {
        resultat = false;
    }

    const radios = document.querySelectorAll('input[type="radio"][name="answer"]:checked');
    if (radios.length === 0) {
        resultat = false;
    }

    console.info("Résultat du contrôle :", resultat);
    return resultat;
}