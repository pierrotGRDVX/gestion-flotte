const urlParams = new URLSearchParams(window.location.search);
const id_proprio = urlParams.get("valeur");

console.log("id du personnel", id_proprio)


// 1. FETCH

fetch(`/info/proprio/${encodeURIComponent(id_proprio)}`)
  .then(response => {
    if (!response.ok) {
        throw new Error(`Erreur HTTP! statut: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
      console.log("Chargement infos personnel lancé", data);
      MAJTitre(data);
      MAJInput(data);
  })
  .catch(error => {
      console.error("Erreur lors de la requête:", error);
  });


// 2. LECTEURS D'ÉVÈNEMENT HTML

// 3. GESTION DES INTERVENTIONS UTILISATEUR

// 4. CONTRÔLE DES DONNÉES UTILISATEUR

// 5. ENVOI DES DONNÉES UTILISATEUR

// 6. FONCTIONS

function formatDate(val){
      if (!val) return "";
      const parties = String(val).split(/[-/]/);
      if (parties.length === 3 && parties[0].length === 4) {
        return parties[2] + "/" + parties[1] + "/" + parties[0];
      }
      if (parties.length === 3 && parties[2].length === 4) {
        const jj = parties[0].padStart(2, "0");
        const mm = parties[1].padStart(2, "0");
        return jj + "/" + mm + "/" + parties[2];
      }
      const d = new Date(val);
      if (!isNaN(d)) {
        const jj = String(d.getDate()).padStart(2, "0");
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        return jj + "/" + mm + "/" + d.getFullYear();
      }
      return val;
    };

function MAJTitre(items){
      const nom = (items.nom_proprio || "").toUpperCase();
      const prenom = items.prenom_proprio || "";
      const titre = (nom + " " + (prenom.charAt(0).toUpperCase() + prenom.slice(1))).trim();
      document.getElementById('tag_base_title').textContent = titre;
      document.title = titre;
    };

function MAJInput(items){
      document.getElementById('ipt_id').value = items.id_proprio;
      document.getElementById('ipt_nom').value = items.nom_proprio;
      document.getElementById('ipt_prenom').value = items.prenom_proprio;
      document.getElementById('ipt_naissance').value = formatDate(items.date_naissance);
      document.getElementById('ipt_sexe').value = items.sexe;
      document.getElementById('ipt_email').value = items.email_proprio;
      document.getElementById('ipt_rue').value = ((items.num_rue || "") + " " + (items.rue || "")).trim();
      document.getElementById('ipt_complement').value = items.complement || "";
      document.getElementById('ipt_code_postal').value = items.code_postal || "";
      document.getElementById('ipt_ville').value = items.nom_ville || "";
      document.getElementById('ipt_num_permis').value = items.num_permis || "";
      const tag_fld_categorie = document.getElementById('tag_fld_categorie');
      tag_fld_categorie.innerHTML = "";
      (items.liste_categorie || []).forEach(function(categorie){
        const tag = document.createElement("span");
        tag.className = "tag is-info";
        tag.textContent = categorie;
        tag_fld_categorie.appendChild(tag);
      });
    };
