Listes =[];


//RECEPTION DU NOMBRE DE VEHICULES PAR ETAT (box "Etat des vehicules")
fetch("/liste/etat/vehicule")
  .then(response => response.json())
  .then(data => {
    data.forEach(items => {
      if(items.etat === "en service"){
        document.getElementById("tag_info_ok").textContent = items.nbr_etat}
      if(items.etat === "maintenance"){
        document.getElementById("tag_info_ed").textContent = items.nbr_etat}
      if(items.etat === "hors service"){
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

    //parcours du taleau "entree"
    data.forEach(items => {
      //MEF de la colonne categorie
      if (items.categorie === "Voiture"){
        source_logo = "images/icone_voiture.png"
        alter = "icône voiture"}
      if (items.categorie === "Camion"){
        source_logo = "images/icone_camion.png"
        alter = "icône camion"}
      if (items.categorie === "Autobus"){
        source_logo = "images/icone_bus.png"
        alter = "icône Autobus"}
      if (items.categorie === "Moto"){
        source_logo = "images/icone_moto.png"
        alter = "icône Moto"}
      insert = `<img src="${source_logo}" alt="${alter}" width="50" height="50"></img>`;
      if(items.categorie !=="Voiture" && items.categorie !=="Camion" && items.categorie !=="Autobus"&& items.categorie !=="Moto"){
        insert = `<h1>${items.categorie}</h1>`;}

      //MEF de la colonne etat
      if(items.etat === "en service"){
        val_etat = `<td class="is-success">${items.etat}</td>`}
      if(items.etat === "maintenance"){
        val_etat = `<td class="is-warning">${items.etat}</td>`}
      if(items.etat === "hors service"){
        val_etat = `<td class="is-danger">${items.etat}</td>`}

      const conteneurHTML = document.createElement("tr");
      conteneurHTML.innerHTML= `
        <td>${items.immat}</td>
        <td>${insert}</td>
        <td>${items.marque}</td>
        <td>${items.modele}</td>
        <td>${items.dateCT}</td>
        <td>${val_etat}</td>
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

      // Extrait les valeurs de chaque cellule
      const rowData = {
        id_proprio: cells[0].textContent,
      }})

});