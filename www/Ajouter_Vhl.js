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

fetch('/cars/listeMarq')
    .then(response => response.json())
    .then(data => {
        console.log("liste des marques",data)
        marque = data
        MAJSelectionMarque(marque); 
    })
    .catch(error => {
        console.error('Erreur lors du chargement de la liste des marques:', error);
    });

//mise en place de lecteurs d'evenements
// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {

    const btnMarque = document.getElementById('btn_marque');
    if (btnMarque) {
        btnMarque.addEventListener('click', () => {
            console.info("bouton marque cliqué");
            const pupMarque = document.getElementById('pup_marque');
            if (pupMarque) pupMarque.classList.add('is-active');
        });
    }

    // Ouvrir le pop up Categorie
    document.getElementById('btn_categorie').addEventListener('click', () => {
        console.info("bouton catégorie cliqué");
        pup_categorie.classList.add('is-active');
    });

    // Fermer le pop up Categorie
    document.getElementById('btn_pup_categorie_close').addEventListener('click', () => {
        pup_categorie.classList.remove('is-active');
    });

    // Fermer la popup Categorie en cliquant à l'extérieur
    document.getElementById('pup_categorie').querySelector('.modal-background').addEventListener('click', () => {
        pup_categorie.classList.remove('is-active');
    });

    //enregister la categorie
    document.getElementById('btn_save_categorie').addEventListener('click', () => {
        console.info("bouton enregistrer nouvelle catégorie cliqué");
        valeur = document.getElementById('ipt_pup_categorie').value.trim();
        console.info(valeur)
        if (valeur === '') {
            alert('Veuillez entrer une categorie');
        } else {
            EnregisterNvlleCategorie(valeur);
            window.location.reload();
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
    if (!conteneurHTML) {
        console.error("Conteneur introuvable : rdo_categorie");
        return;
    }

    conteneurHTML.innerHTML = '';

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
    });
}

function EnregisterNvlleCategorie(categorie) {
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