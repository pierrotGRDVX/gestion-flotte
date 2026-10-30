const urlParams = new URLSearchParams(window.location.search);
const immat = urlParams.get("valeur");
let vehicule = [];
let change_etat = [];

console.log("immatriculation", immat)
//telechargconsole.log("data", data);e les listes marque/categorie/model
//déclenchement dès le chargement de la page
fetch('/ListCat')
    .then(response => response.json())
    .then(data => {
      console.log("chargement liste des categories lancée", data)
      MAJSelectionCategorie(data);
        
    })
    .catch(error => {
        console.error('Erreur lors du chargement du JSON:', error);
    });
const Save = document.getElementById('btn_enregistrer');


const data = {
    immatriculation: immat
    };
console.log('données a envoyer',data)

fetch(`/info/vehicule/${encodeURIComponent(immat)}`)
  .then(response => {
    if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
      console.log("Chargement infos véhicule lancé", data);
      MAJInput([data]);
  })
  .catch(error => {
      console.error("Erreur lors de la requête:", error);
  });



document.addEventListener('DOMContentLoaded', () => {

  // Ouvrir le pop up Energie
  document.getElementById('btn_pup_etat').addEventListener('click', async () => {
      pup_etat.classList.add('is-active');
      });
  // Fermer le pop up energie
  document.getElementById('btn_pup_etat_close').addEventListener('click', () => {
      pup_etat.classList.remove('is-active');
      });
  // Fermer la popup Energie en cliquant à l'extérieur
  document.getElementById('pup_etat').querySelector('.modal-background').addEventListener('click', () => {
      pup_etat.classList.remove('is-active');
      });

  document.getElementById('btn_ok').addEventListener('click', async () => {
    change_etat = "en_service";
    SaveChangementEtat();
  });
  document.getElementById('btn_ed').addEventListener('click', async () => {
    change_etat = "endommagé";
    SaveChangementEtat();
  });
  document.getElementById('btn_nr').addEventListener('click', async () => {
    change_etat = "non_roulant";
    SaveChangementEtat();
  });

  });



//fonction ajoutant les categories dans les options
function MAJSelectionCategorie(data){
    const contenu_A = document.getElementById("rdo_categorie");

    data.forEach(items => {
        const radioLabel_A = document.createElement("label");
        radioLabel_A.className = "radio";

        const radioInput_A = document.createElement("input");
        radioInput_A.type = "radio";
        radioInput_A.name = "answer";
        radioInput_A.id = (items.categorie);

        const radioText_A = document.createElement("span")
        radioText_A.textContent =(items.categorie);

        radioLabel_A.appendChild(radioInput_A);
        radioLabel_A.appendChild(radioText_A);
        contenu_A.appendChild(radioLabel_A);

    });
    };


function MAJInput(donnees){
    donnees.forEach(items => {
      document.getElementById('ipt_immatriculation').textContent = items.immat;
      console.log("details véhicule",items.immat);
      document.getElementById('ipt_immatriculation').value = items.immat;
      document.getElementById('ipt_marque').value = items.marque;
      document.getElementById('ipt_model').value = items.modele;
      document.getElementById('ipt_mise_en_circulation').value = items.date_mec;
      document.getElementById('ipt_couleur').value = items.couleur;
      document.getElementById('ipt_kilometrage').value = items.kilometrage;
      document.getElementById('ipt_date_ct').value = items.date_ct;
      document.getElementById('ipt_energie').value = items.energie;
      document.getElementById('ipt_prix').value = items.prix_achat;
      categ = items.categorie
      document.getElementById(categ).checked = true;
      const fld_etat = document.getElementById('fld_etat')
      const conteneurHTML = document.createElement("button");
      if (items.etat === "en_service"){
        conteneurHTML.className = "button is-success"
        conteneurHTML.textContent = "en_service"
        fld_etat.appendChild(conteneurHTML)};
      if (items.etat === "endommagé"){
        conteneurHTML.className = "button is-warning"
        conteneurHTML.textContent = "Endommagé"
        fld_etat.appendChild(conteneurHTML)};
      if (items.etat === "non_roulant"){
        conteneurHTML.className = "button is-danger"
        conteneurHTML.textContent = "Non roulant"
        fld_etat.appendChild(conteneurHTML)};
        
        })
      
    };

function SaveChangementEtat(){
      const data = {
        etat: change_etat,
        immat: immat
        };
    console.log('changement d etat', data)

    fetch('/cars/state', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        });
    window.location.reload();
}
