// bouton -> btn
// Input -> ipt
// Select -> slt
// Radio -> rdo
// PopUp -> pup
// texte area -> txa

let donnees = [];
let marque = [];
let model = [];
let energies = [];
let categorie = [];
let nbrInter = [];

//telecharge le nombre d'intervention déjà effectué
//déclenchement dès le chargement de la page
fetch('/nbrInter')
    .then(response => response.json())
    .then(data => {
        console.log("nombre d'interventions",data)
        nbrInter = data.nombre_inter
    })
    .catch(error => {
        console.error('Erreur lors du chargement du JSON:', error);
    });

//telecharge les listes marque/categorie/model
//déclenchement dès le chargement de la page
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

//telecharge les listes marque/categorie/model
//déclenchement dès le chargement de la page
fetch('/cars/listeModel')
    .then(response => response.json())
    .then(data => {
        donnees = data
    })
    .catch(error => {
        console.error('Erreur lors du chargement du JSON:', error);
        
    });

//telecharge les listes marque/categorie/model
//déclenchement dès le chargement de la page
fetch('/ListNRJ')
    .then(response => response.json())
    .then(data => {
        console.info("load données");
        console.info(data);
        energies = data
        MAJSelectionNRJ();
    })
    .catch(error => {
        console.error('Erreur lors du chargement du JSON:', error);
    });

//telecharge les listes marque/categorie/model
//déclenchement dès le chargement de la page
fetch('/ListCat')
    .then(response => response.json())
    .then(data => {
        console.info(data)
        categorie = data
        MAJSelectionCategorie(categorie);
        
    })
    .catch(error => {
        console.error('Erreur lors du chargement du JSON:', error);
    });
const Save = document.getElementById('btn_enregistrer');
//Lecture du bouton enregistré
Save.addEventListener('click', async () => {
    console.info("btn enregistrer appuyée")
    // Appeler la fonction souhaitée
    val_immat = document.getElementById('ipt_immatriculation').value
    val_marque = document.getElementById('slt_marque').value
    val_model = document.getElementById('slt_model').value
    val_km = document.getElementById('ipt_kilometrage').value
    val_couleur = document.getElementById('ipt_couleur').value
    val_date_mec = document.getElementById('ipt_mise_en_circulation').value
    val_ct = document.getElementById('ipt_date_ct').value
    val_prix = document.getElementById('ipt_prix').value
    val_energie = document.getElementById('slt_energie').value

    const radios = document.querySelectorAll('input[type="radio"][name="answer"]:checked');
    if (radios.length > 0) {
    // Récupère le label associé à l'input coché
        val_cat = radios[0].parentNode.textContent.trim();

        nbrInter = nbrInter + 1
        console.log("id intervention" ,  nbrInter)
    const ct = {
        id: nbrInter,
        dateIntervention: val_ct,
        kilometrage: val_km,
        prix: val_prix,
        immat: val_immat,
        
    }    

    const data = {
        immat: val_immat,
        kilometrage: val_km,
        couleur: val_couleur,
        modele_nom: val_model,
        modele_marque: val_marque,
        categorie: val_cat,
        etat: "en_service",
        energie: val_energie,
        date_mec: val_date_mec
        };


        console.log('donnée a envoyer',data)

        fetch('/cars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        fetch('/cars/newCT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ct),
        });
    }});

//Lecture de la selection de la valeur marque
document.getElementById('slt_marque').addEventListener('change', function() {
    const valeur = this.value;
    console.info(valeur)
    MAJSelectionModel(valeur);
    });


// Ouvrir le pop up marque
document.getElementById('btn_marque').addEventListener('click', () => {
    pup_marque.classList.add('is-active');
    });
// Fermer le pop up marque
document.getElementById('btn_pup_marque_close').addEventListener('click', () => {
    pup_marque.classList.remove('is-active');
    });
// Fermer la popup marque en cliquant à l'extérieur
document.getElementById('pup_marque').querySelector('.modal-background').addEventListener('click', () => {
    pup_marque.classList.remove('is-active');
    });
//enregister la marque
document.getElementById('btn_save_marque').addEventListener('click', () => {
    console.info("appuyé");
    valeur = document.getElementById('ipt_pup_marque').value.trim();
    console.info(valeur)
    if (valeur === '') {
        alert('Veuillez entrer une marque');
    } else {
        EnregisterNvlleMarque(valeur);
        window.location.reload();
    }
    });

// Ouvrir le pop up modele
document.getElementById('btn_model').addEventListener('click', () => {
    pup_model.classList.add('is-active');
    });
// Fermer le pop up modele
document.getElementById('btn_pup_model_close').addEventListener('click', () => {
    pup_model.classList.remove('is-active');
    });
// Fermer la popup modele en cliquant à l'extérieur
document.getElementById('pup_model').querySelector('.modal-background').addEventListener('click', () => {
    pup_model.classList.remove('is-active');
    });
//lecture du bouton enregistrer nouveau model
document.getElementById('btn_save_model').addEventListener('click', () => {
    console.info("appuyé");
    var val_marque = document.getElementById('slt_pup_marque').value;
    console.info(val_marque);
    const val_model = document.getElementById('ipt_pup_model').value.trim();
    console.info(val_model);
    const radioSelectionne = document.querySelector('input[type="radio"][name="answer"]:checked');
    console.info(radioSelectionne)
    let val_categorie
    //recuperation de l'option cochée
    if (radioSelectionne === null) {
        val_categorie = null // Retourne l'id du radio coché
    } else {
        val_categorie = radioSelectionne.id
    }
    console.info(val_categorie)
    if (val_marque === '-- Marque --'|| val_model === ''|| val_categorie === null) {
        alert('Veuillez entrer une marque');
    } else {
        console.info(val_marque);
        EnregisterNvxModele(val_marque, val_model, val_categorie)
        window.location.reload();
    }
    });

// Ouvrir le pop up Categorie
document.getElementById('btn_categorie').addEventListener('click', () => {
    console.info("appuyé");
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
    console.info("appuyé");
    valeur = document.getElementById('ipt_pup_categorie').value.trim();
    console.info(valeur)
    if (valeur === '') {
        alert('Veuillez entrer une categorie');
    } else {
        EnregisterNvlleCategorie(valeur);
        window.location.reload();
    }
    });

// Ouvrir le pop up Energie
document.getElementById('btn_energie').addEventListener('click', () => {
    pup_energie.classList.add('is-active');
    });
// Fermer le pop up energie
document.getElementById('btn_pup_energie_close').addEventListener('click', () => {
    pup_energie.classList.remove('is-active');
    });
// Fermer la popup Energie en cliquant à l'extérieur
document.getElementById('pup_energie').querySelector('.modal-background').addEventListener('click', () => {
    pup_energie.classList.remove('is-active');
    });

//Lecture de la selection de la valeur modele
document.getElementById('slt_model').addEventListener('change', function() {
    const valeur = this.value;
    console.info(valeur)

    // remet tous les categories sur non selectionnées
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
    radio.checked = false;
    });
    const a = document.getElementById("slt_model").value
    VHL = donnees.filter(v => v.modele === a);
    console.log(VHL);
    categ = VHL[0].categorie
    console.log(categ);
    document.getElementById(categ).checked = true;
    });

//MEF de l'input  immatriculation
//Lecture en continue
document.getElementById("ipt_immatriculation").addEventListener("input", function(e) {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

    let letters1 = value.slice(0,2).replace(/[^A-Z]/g, '');
    let numbers = value.slice(2,5).replace(/[^0-9]/g, '');
    let letters2 = value.slice(5,7).replace(/[^A-Z]/g, '');

    let formatted = letters1;

    if (numbers.length > 0) {
        formatted += "-" + numbers;
    }

    if (letters2.length > 0) {
        formatted += "-" + letters2;
    }

    e.target.value = formatted;
    });

//MEF de l'input mise en circulation
//Lecture en continue
document.getElementById("ipt_mise_en_circulation").addEventListener("input", function(e) {

    let value = e.target.value.replace(/\D/g, ""); // Supprime tout sauf chiffres

    if (value.length > 2) {
        value = value.slice(0,2) + "-" + value.slice(2);
    }

    if (value.length > 5) {
        value = value.slice(0,5) + "-" + value.slice(5,9);
    }

    e.target.value = value;
    });

//MEF de l'input date CT
//Lecture en continue
document.getElementById("ipt_date_ct").addEventListener("input", function(e) {

    let value = e.target.value.replace(/\D/g, ""); // Supprime tout sauf chiffres

    if (value.length > 2) {
        value = value.slice(0,2) + "-" + value.slice(2);
    }

    if (value.length > 5) {
        value = value.slice(0,5) + "-" + value.slice(5,9);
    }

    e.target.value = value;
    });

//fonction ajoutant les marques dans le menu deroulant du contenue principale
//plus du popup modele
function MAJSelectionMarque(data){
    const slt_marque = document.getElementById("slt_marque");
    const slt_pup_marque = document.getElementById("slt_pup_marque")
    data.forEach(items => {
        console.info(items);
        const conteneurHTML_A = document.createElement("option");
        const conteneurHTML_B = document.createElement("option");
        conteneurHTML_A.innerHTML = `${items.nom}`;
        conteneurHTML_B.innerHTML = `${items.nom}`;
        slt_marque.appendChild(conteneurHTML_A);
        slt_pup_marque.appendChild(conteneurHTML_B);
        });
    };

//fonction ajoutant les modeles dans le menu deroulant
function MAJSelectionModel(valeur){
    const contenu = document.getElementById("slt_model");
    // Supprime toutes les options sauf la première de la liste des modeles
    while (contenu.options.length > 1) {
        contenu.remove(1);}

    // Selectionne le model correspondant a la marque selectionné
    const liste = donnees.filter(v => v.marque === valeur);
    console.log("MAJ MODELE LANCE", donnees)

    // Met a jour la liste des modeles
    liste.forEach(items => {
         const conteneurHTML = document.createElement("option");

         conteneurHTML.textContent = items.modele;
         contenu.appendChild(conteneurHTML); 
    });
    // remet tous les categories sur non selectionnées
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
    radio.checked = false;
    });
    };

//fonction ajoutant les energies dans le menu deroulant
function MAJSelectionNRJ(){
    const contenu = document.getElementById("slt_energie");
    console.info("declenchement MAJ NRJ");
    console.info(energies);
    energies.forEach(items => {
        const conteneurHTML = document.createElement("option");
        
        conteneurHTML.textContent = items.energie;
        contenu.appendChild(conteneurHTML); 
    });
    };

//fonction ajoutant les categories dans les options
function MAJSelectionCategorie(data){
    const contenu_A = document.getElementById("rdo_categorie");
    const contenu_B = document.getElementById("rdo_pup_categorie");

    data.forEach(items => {
        const radioLabel_A = document.createElement("label");
        const radioLabel_B = document.createElement("label");
        radioLabel_A.className = "radio";
        radioLabel_B.className = "radio";

        const radioInput_A = document.createElement("input");
        const radioInput_B = document.createElement("input");
        radioInput_A.type = "radio";
        radioInput_A.name = "answer";
        radioInput_A.id = (items.categorie);
        radioInput_B.type = "radio";
        radioInput_B.name = "answer";
        radioInput_B.id = (items.categorie);

        const radioText_A = document.createElement("span")
        const radioText_B = document.createElement("span")
        radioText_A.textContent =(items.categorie);
        radioText_B.textContent =(items.categorie);

        radioLabel_A.appendChild(radioInput_A);
        radioLabel_A.appendChild(radioText_A);
        radioLabel_B.appendChild(radioInput_B);
        radioLabel_B.appendChild(radioText_B);
        contenu_A.appendChild(radioLabel_A);
        contenu_B.appendChild(radioLabel_B);

    });
    };

//fonction enregistrer nouvelle marque
function EnregisterNvlleMarque(valeur){
    const data = {
        nom: valeur
        };
    console.log('donnée a envoyer',data)

    fetch('/cars/newmark', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
    };

//fonction enregistrer nouvelle Categorie
function EnregisterNvlleCategorie(valeur){
    const data = {
        libelle: valeur
        };
    console.log('donnée a envoyer',data)

    fetch('/cars/newcat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
    };

//envoie les donnees a enregistrer dans la BDD
function EnregisterNvxModele(val_marque, val_model, val_categorie){
    const data = {
        nom: val_model,
        marque: val_marque,
        categorie: val_categorie
    };
    console.log('donnée a envoyer',data)
    fetch('/cars/newmodel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
    };



                    

                    
