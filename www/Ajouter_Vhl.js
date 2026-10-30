// bouton -> btn
// Input -> ipt
// Select -> slt
// Radio -> rdo
// PopUp -> pup
// texte area -> txa

// Variables globales
let liste_categorie= [];
let liste_marque = [];
let liste_model = [];



// Charger les données initiales
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

fetch('/liste/marque')
    .then(response => response.json())
    .then(data => {
        console.log("liste des marques",data)
        liste_marque = data
        MAJSelectionMarque(liste_marque); 
    })
    .catch(error => {
        console.error('Erreur lors du chargement de la liste des marques:', error);
    });

fetch('/liste/modele')
    .then(response => response.json())
    .then(data => {
        liste_model = data;
        console.log("liste des modeles telechargee", liste_model);
        MAJSelectionModel();
    })
    .catch(error => {
        console.error('Erreur lors du chargement de la liste des modeles :', error);
    });

fetch('/liste/energie')
    .then(response => response.json())
    .then(data => {
        console.log("liste des energies", data);
        MAJSelectionNRJ(data);
    })
    .catch(error => {
        console.error('Erreur lors du chargement de la liste des energies :', error);
    });

//MAJ du select modele selon la marque choisie
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('slt_marque').addEventListener('change', function() {
        MAJSelectionModel(this.value);
    });
});

function MAJSelectionModel(marqueSelectionnee){
    const contenu = document.getElementById("slt_model");
    const divSelect = document.getElementById("div_slt_model");
    while (contenu.options.length > 1) {
        contenu.remove(1);
    }
    if (!marqueSelectionnee || marqueSelectionnee === "--Sélectionner--") {
        divSelect.setAttribute("disabled", "");
        return;
    }
    divSelect.removeAttribute("disabled");
    const liste = liste_model.filter(v => v.marque === marqueSelectionnee);
    liste.forEach(items => {
        const option = document.createElement("option");
        option.textContent = items.modele;
        contenu.appendChild(option);
    });
}

function MAJSelectionNRJ(data){
    const contenu = document.getElementById("slt_energie");
    data.forEach(items => {
        const option = document.createElement("option");
        option.textContent = items.nom;
        contenu.appendChild(option);
    });
}

//mise en place de lecteurs d'evenements
// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {

    // Ouvrir le pop up Marque
    document.getElementById('btn_marque').addEventListener('click', () => {
        console.info("bouton marque cliqué");
        document.getElementById('pup_marque').classList.add('is-active');
    });

    // Fermer le pop up Marque
    document.getElementById('btn_pup_marque_close').addEventListener('click', () => {
        document.getElementById('pup_marque').classList.remove('is-active');
    });

    // Fermer la popup Marque en cliquant à l'extérieur
    document.getElementById('pup_marque').querySelector('.modal-background').addEventListener('click', () => {
        document.getElementById('pup_marque').classList.remove('is-active');
    });

    // Ouvrir le pop up Modèle
    document.getElementById('btn_model').addEventListener('click', () => {
        console.info("bouton modèle cliqué");
        document.getElementById('pup_model').classList.add('is-active');
    });

    // Fermer le pop up Modèle
    document.getElementById('btn_pup_model_close').addEventListener('click', () => {
        document.getElementById('pup_model').classList.remove('is-active');
    });

    // Fermer la popup Modèle en cliquant à l'extérieur
    document.getElementById('pup_model').querySelector('.modal-background').addEventListener('click', () => {
        document.getElementById('pup_model').classList.remove('is-active');
    });

    // Ouvrir le pop up Energie
    document.getElementById('btn_energie').addEventListener('click', () => {
        console.info("bouton énergie cliqué");
        document.getElementById('pup_energie').classList.add('is-active');
    });

    // Fermer le pop up Energie
    document.getElementById('btn_pup_energie_close').addEventListener('click', () => {
        document.getElementById('pup_energie').classList.remove('is-active');
    });

    // Fermer la popup Energie en cliquant à l'extérieur
    document.getElementById('pup_energie').querySelector('.modal-background').addEventListener('click', () => {
        document.getElementById('pup_energie').classList.remove('is-active');
    });

    // Ouvrir le pop up Categorie
    document.getElementById('btn_categorie').addEventListener('click', () => {
        console.info("bouton catégorie cliqué");
        document.getElementById('pup_categorie').classList.add('is-active');
    });

    // Fermer le pop up Categorie
    document.getElementById('btn_pup_categorie_close').addEventListener('click', () => {
        document.getElementById('pup_categorie').classList.remove('is-active');
    });

    // Fermer la popup Categorie en cliquant à l'extérieur
    document.getElementById('pup_categorie').querySelector('.modal-background').addEventListener('click', () => {
        document.getElementById('pup_categorie').classList.remove('is-active');
    });

    //enregistrer la marque
    document.getElementById('btn_save_marque').addEventListener('click', () => {
        console.info("bouton enregistrer nouvelle marque cliqué");
        valeur = document.getElementById('ipt_pup_marque').value.trim();
        console.info(valeur)
        if (valeur === '') {
            alert('Veuillez entrer une marque');
        } else {
            EnregisterNvlleMarque(valeur).then(() => window.location.reload());
        }
    });

    //enregistrer le modele
    document.getElementById('btn_save_model').addEventListener('click', () => {
        console.info("bouton enregistrer nouveau modèle cliqué");
        const val_marque = document.getElementById('slt_pup_marque').value;
        const val_model = document.getElementById('ipt_pup_model').value.trim();
        const radioSelectionne = document.querySelector('#rdo_pup_categorie input[type="radio"]:checked');
        const val_categorie = radioSelectionne ? radioSelectionne.value : null;
        console.info(val_marque, val_model, val_categorie);
        if (val_marque === '-- Marque --' || val_model === '' || val_categorie === null) {
            alert('Veuillez renseigner la marque, le modèle et la catégorie');
        } else {
            EnregisterNvxModele(val_marque, val_model, val_categorie).then(() => window.location.reload());
        }
    });

    //enregistrer l'energie
    document.getElementById('btn_save_energie').addEventListener('click', () => {
        console.info("bouton enregistrer nouvelle énergie cliqué");
        valeur = document.getElementById('ipt_pup_energie').value.trim();
        console.info(valeur)
        if (valeur === '') {
            alert('Veuillez entrer un type d\'énergie');
        } else {
            EnregisterNvlleEnergie(valeur).then(() => window.location.reload());
        }
    });

    //enregister la categorie
    document.getElementById('btn_save_categorie').addEventListener('click', () => {
        console.info("bouton enregistrer nouvelle catégorie cliqué");
        valeur = document.getElementById('ipt_pup_categorie').value.trim();
        console.info(valeur)
        if (valeur === '') {
            alert('Veuillez entrer une categorie');
        } else {
            EnregisterNvlleCategorie(valeur).then(() => window.location.reload());
        }
        });

});



//      FONCTIONS 
// Fonctions de mise à jour des sélections
function MAJSelectionCategorie(data) {
    if (!data || data.length === 0) {
        console.error("Aucune catégorie à afficher");
        return;
    }

    const conteneurHTML = document.getElementById("rdo_categorie");
    const conteneurPup = document.getElementById("rdo_pup_categorie");
    if (!conteneurHTML) {
        console.error("Conteneur introuvable : rdo_categorie");
        return;
    }

    conteneurHTML.innerHTML = '';
    if (conteneurPup) conteneurPup.innerHTML = '';

    data.forEach(item => {
        const categoryValue = item.categorie || item;

        const label = document.createElement("label");
        label.className = "checkbox";
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "categorie"; // Même nom pour regrouper les boutons radio
        input.value = categoryValue;
        label.appendChild(input);
        label.appendChild(document.createTextNode(categoryValue));
        conteneurHTML.appendChild(label);

        if (conteneurPup) {
            const labelPup = document.createElement("label");
            labelPup.className = "radio";
            const inputPup = document.createElement("input");
            inputPup.type = "radio";
            inputPup.name = "categorie_pup";
            inputPup.value = categoryValue;
            labelPup.appendChild(inputPup);
            labelPup.appendChild(document.createTextNode(categoryValue));
            conteneurPup.appendChild(labelPup);
        }
    });
}

async function EnregisterNvlleMarque(marque) {
    const data = {
        marque: marque
    };
    console.log('Données à envoyer :', data);
    return fetch('/nouvelle/marque', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données de la marque :', error);
    });
}

async function EnregisterNvxModele(marque, modele, categorie) {
    const data = {
        modele: modele,
        marque: marque,
        categorie: categorie,
        cylindree: null,
        puissance: null,
        nbr_place: null
    };
    console.log('Données à envoyer :', data);
    return fetch('/nouveau/modele', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données du modèle :', error);
    });
}

async function EnregisterNvlleEnergie(nom) {
    const data = {
        nom: nom
    };
    console.log('Données à envoyer :', data);
    return fetch('/nouvelle/energie', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi des données de l\'énergie :', error);
    });
}

function MAJSelectionMarque(data){
    const slt_marque = document.getElementById("slt_marque");
    const slt_pup_marque = document.getElementById("slt_pup_marque");
    data.forEach(items => {
        const optA = document.createElement("option");
        optA.textContent = items.marque;
        slt_marque.appendChild(optA);
        if (slt_pup_marque) {
            const optB = document.createElement("option");
            optB.textContent = items.marque;
            slt_pup_marque.appendChild(optB);
        }
    });
}

async function EnregisterNvlleCategorie(categorie) {
    const data = {
        categorie: categorie
    };
    console.log('Données à envoyer :', data);
    return fetch('/nouvelle/categorie', {
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