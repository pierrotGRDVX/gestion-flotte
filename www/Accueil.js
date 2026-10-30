Listes =[];
let val_etat = 0;

//RECEPTION DU NOMBRE DE VEHICULES PAR ETAT (box "Etat des vehicules")
fetch("/liste/etat/vehicule")
  .then(response => response.json())
  .then(data => {
    console.log("nombre de vehicule pour chaque etat", data);
    data.forEach(items => {
      if(items.etat === "en_service"){
        document.getElementById("tag_info_ok").textContent = items.nbr_etat}
      if(items.etat === "endommagé"){
        document.getElementById("tag_info_ed").textContent = items.nbr_etat}
      if(items.etat === "non_roulant"){
        document.getElementById("tag_info_nr").textContent = items.nbr_etat}
    });
  })
  .catch(error => console.error("Erreur lors du chargement des etats :", error));


//RECEPTION DES DONNEES
fetch("/liste/vehicule")
  .then(response => response.json())
  .then(data => {
    console.info(data);
    Listes = data

    // selection du conteneur HTML
    const contenu = document.getElementById("tab_vehicule");

    // date du jour et limite CT a 2 mois
    const aujourdhui = new Date();
    const limiteCT = new Date();
    limiteCT.setMonth(limiteCT.getMonth() + 2);

    // priorite de tri : 0 = CT depasse, 1 = non_roulant, 2 = CT < 2 mois, 3 = endommage, 4 = autres
    function priorite(items){
      const dateCT = items.date_ct ? new Date(items.date_ct) : null;
      if(dateCT && dateCT < aujourdhui) return 0;
      if(items.etat === "non_roulant") return 1;
      if(dateCT && dateCT <= limiteCT) return 2;
      if(items.etat === "endommagé") return 3;
      return 4;
    }
    data.sort((a, b) => priorite(b) - priorite(a));

    //parcours du tableau trie
    data.forEach(items => {
      let source_logo = "";
      let alter = "";
      let insert = "";
      let val_etat = "";

      //MEF de la colonne etat (icone selon l'etat)
      if(items.etat === "en_service"){
        val_etat = `<td><span class="icon has-text-success"><i class="fas fa-check-square"></i></span></td>`}
      if(items.etat === "endommagé"){
        val_etat = `<td><span class="icon has-text-warning"><i class="fas fa-exclamation-triangle"></i></span></td>`}
      if(items.etat === "non_roulant"){
        val_etat = `<td><span class="icon has-text-danger"><i class="fas fa-ban"></i></span></td>`}

      //MEF de la colonne CT (icone selon echeance)
      const dateCT = items.date_ct ? new Date(items.date_ct) : null;
      let val_ct = `<td><span class="icon has-text-success"><i class="fas fa-check-square"></i></span></td>`;
      if(dateCT && dateCT < aujourdhui){
        val_ct = `<td><span class="icon has-text-danger"><i class="fas fa-ban"></i></span></td>`}
      else if(dateCT && dateCT <= limiteCT){
        val_ct = `<td><span class="icon has-text-warning"><i class="fas fa-exclamation-triangle"></i></span></td>`}

      const conteneurHTML = document.createElement("tr");
      conteneurHTML.innerHTML= `
        <td>${items.immat}</td>
        <td>${items.categorie}</td>
        <td>${items.marque}</td>
        <td>${items.modele}</td>
        ${val_ct}
        ${val_etat}
        `;
      contenu.appendChild(conteneurHTML);
    });
  })
  .catch(error => console.error("Erreur lors du chargement du JSON :", error));

//MISE EN PLACE LECTEUR 
// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('tab_vehicule');

    // Écouteur d'événement pour les clics sur les lignes du tableau
    tbody.addEventListener('click', (event) => {
      const row = event.target.closest('tr'); // Trouve la ligne (<tr>) la plus proche de l'élément cliqué
      if (!row) return; // Si on n'a pas cliqué sur une ligne, on sort

      // Récupère toutes les cellules (<td>) de la ligne
      const cells = row.querySelectorAll('td');

      // première cellule = immatriculation du véhicule
      const immat = cells[0].textContent;

      // ouvre la page Infos_Vhl du véhicule sélectionné
      window.location.href = `/pageInfoVhl?valeur=${encodeURIComponent(immat)}`;
    });

});