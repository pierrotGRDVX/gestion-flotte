const urlParams = new URLSearchParams(window.location.search);
const immat = urlParams.get("valeur");
let vehicule = [];
let change_etat = [];

console.log("immatriculation", immat)
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
      MAJInput(data);
  })
  .catch(error => {
      console.error("Erreur lors de la requête:", error);
  });

fetch(`/liste/intervention/${encodeURIComponent(immat)}`)
  .then(response => response.json())
  .then(data => {
      console.log("Chargement interventions lancé", data);
      MAJTableauInterventions(data);
      MAJGraphiquePleins(data);
  })
  .catch(error => {
      console.error("Erreur lors de la requête:", error);
  });



document.addEventListener('DOMContentLoaded', () => {

  // Gestion des onglets
  document.querySelectorAll('.tabs li[data-tab]').forEach(function(onglet){
    onglet.addEventListener('click', function(){
      document.querySelectorAll('.tabs li').forEach(function(li){ li.classList.remove('is-active'); });
      onglet.classList.add('is-active');
      document.querySelectorAll('.tab-content').forEach(function(contenu){ contenu.style.display = 'none'; });
      document.getElementById(onglet.dataset.tab).style.display = 'block';
    });
  });

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

function formatDate(iso){
      if (!iso) return "";
      const parties = iso.split("-");
      if (parties.length !== 3) return iso;
      return parties[2] + "/" + parties[1] + "/" + parties[0];
    };

//met a jour le tag CT selon la date et le resultat du dernier controle technique
function MAJTagCT(dateCtIso, resultatCt){
    const tag = document.getElementById('tag_ct');
    if (!tag) return;
    let classe = "is-success";
    let texte = "";
    let icone = '<i class="fas fa-check-square"></i>';

    if (dateCtIso && resultatCt) {
        const dateCt = new Date(dateCtIso + "T00:00:00");
        const maintenant = new Date();
        maintenant.setHours(0, 0, 0, 0);
        const ilY2Ans = new Date(maintenant);
        ilY2Ans.setFullYear(ilY2Ans.getFullYear() - 2);
        const dans2Mois = new Date(maintenant);
        dans2Mois.setMonth(dans2Mois.getMonth() + 2);

        if (resultatCt === "refuse") {
            classe = "is-danger";
            texte = "CT refusé";
            icone = '<i class="fas fa-ban"></i>';
        } else if (resultatCt === "reporte") {
            classe = "is-warning";
            texte = "CT à repasser";
            icone = '<i class="fas fa-exclamation-triangle"></i>';
        } else if (dateCt < ilY2Ans) {
            classe = "is-danger";
            texte = "CT dépassé";
            icone = '<i class="fas fa-ban"></i>';
        } else if (dateCt < dans2Mois) {
            classe = "is-warning";
            texte = "CT bientôt expiré";
            icone = '<i class="fas fa-exclamation-triangle"></i>';
        }
    }

    tag.className = "tag " + classe;
    tag.innerHTML = '<span class="icon">' + icone + '</span>' + texte;
}

function MAJInput(items){
      document.getElementById('ipt_immatriculation').value = items.immat;
      document.getElementById('ipt_marque').value = items.marque;
      document.getElementById('ipt_model').value = items.modele;
      document.getElementById('ipt_mise_en_circulation').value = formatDate(items.date_mec);
      document.getElementById('ipt_couleur').value = items.couleur;
      document.getElementById('ipt_kilometrage').value = items.kilometrage;
      document.getElementById('ipt_date_ct').value = formatDate(items.date_ct);
      MAJTagCT(items.date_ct, items.resultat_ct);
      document.getElementById('ipt_energie').value = items.energie;
      document.getElementById('ipt_prix').value = items.prix_achat;
      document.getElementById('ipt_categorie').value = items.categorie;
      const fld_etat = document.getElementById('fld_etat')
      fld_etat.innerHTML = "";
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
    };

function ligneTableau(valeurs){
      const tr = document.createElement("tr");
      valeurs.forEach(function(valeur){
        const td = document.createElement("td");
        td.textContent = (valeur === null || valeur === undefined) ? "" : valeur;
        tr.appendChild(td);
      });
      return tr;
    };

function MAJTableauInterventions(interventions){
      const tbodyPleins = document.getElementById('body_pleins');
      const tbodyInter = document.getElementById('body_interventions');
      tbodyPleins.innerHTML = "";
      tbodyInter.innerHTML = "";
      interventions.forEach(function(inter){
        if (inter.nom_intervention === "plein"){
          tbodyPleins.appendChild(ligneTableau([formatDate(inter.date), inter.kilometrage, inter.cout_inter, inter.prix_litre, inter.volume]));
        } else {
          tbodyInter.appendChild(ligneTableau([formatDate(inter.date), inter.nom_intervention, inter.kilometrage, inter.cout_inter, inter.observation]));
        }
      });
    };

function MAJGraphiquePleins(interventions){
      const canvas = document.getElementById('graph_pleins');
      if (!canvas || typeof Chart === 'undefined') return;
      const pleins = interventions
        .filter(function(inter){ return inter.nom_intervention === "plein" && inter.kilometrage != null && inter.volume != null; })
        .sort(function(a, b){ return a.kilometrage - b.kilometrage; });
      new Chart(canvas.getContext('2d'), {
        type: 'scatter',
        data: {
          datasets: [{
            label: 'Volume (L)',
            data: pleins.map(function(p){ return { x: p.kilometrage, y: p.volume }; }),
            backgroundColor: 'rgba(0, 209, 178, 0.7)'
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: { title: { display: true, text: 'Kilométrage (km)' } },
            y: { title: { display: true, text: 'Consommation (L)' }, beginAtZero: true }
          },
          plugins: { legend: { display: true } }
        }
      });
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
