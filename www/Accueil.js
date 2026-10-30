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

      //MEF de la colonne etat
      if(items.etat === "en_service"){
        val_etat = `<td class="has-background-success has-text-white">${items.etat}</td>`}
      if(items.etat === "endommagé"){
        val_etat = `<td class="has-background-warning has-text-black">${items.etat}</td>`}
      if(items.etat === "non_roulant"){
        val_etat = `<td class="has-background-danger has-text-white">${items.etat}</td>`}

      //MEF de la colonne CT (mise en evidence si a moins de 2 mois), format JJ/MM/AAAA
      const dateCT = items.date_ct ? new Date(items.date_ct) : null;
      let date_ct_fr = "";
      if(dateCT){
        const jj = String(dateCT.getDate()).padStart(2, "0");
        const mm = String(dateCT.getMonth() + 1).padStart(2, "0");
        date_ct_fr = `${jj}/${mm}/${dateCT.getFullYear()}`}
      let val_ct = `<td>${date_ct_fr}</td>`;
      if(dateCT && dateCT <= limiteCT){
        val_ct = `<td class="has-background-warning has-text-black">${date_ct_fr}</td>`}

      //couleur de la ligne selon la priorite
      const prio = priorite(items);
      let classe_ligne = "";
      if(prio === 0 || prio === 2 || prio === 3){
        classe_ligne = "has-background-warning-light"}
      if(prio === 1){
        classe_ligne = "has-background-danger-light"}

      const conteneurHTML = document.createElement("tr");
      conteneurHTML.innerHTML= `
        <td>${items.immat}</td>
        <td>${items.categorie}</td>
        <td>${items.marque}</td>
        <td>${items.modele}</td>
        ${val_ct}
        ${val_etat}
        `;
      if(classe_ligne !== ""){
        conteneurHTML.setAttribute("class", classe_ligne)}
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