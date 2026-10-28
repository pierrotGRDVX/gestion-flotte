Listes =[];
let nbr_ok = 0;
let nbr_nr = 0;
let nbr_ed = 0;


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
      if(items.etat === "Ok"){
        nbr_ok= nbr_ok + 1
        val_etat = `<td class="is-success">${items.etat}</td>`} 
      if(items.etat === "Endommage"){
        nbr_ed = nbr_ed + 1
        val_etat = `<td class="is-warning">${items.etat}</td>`}   
      if(items.etat === "Non_roulant"){
        nbr_nr = nbr_nr + 1
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

      //MAJ tag ok
      tag_info_ok.innerHTML = '';
      tag_info_ok = document.getElementById("tag_info_ok")
      const conteneurHTML_ok = document.createElement("div");
      conteneurHTML_ok.innerHTML =   `<span>${nbr_ok}</span>`;
      tag_info_ok.appendChild(conteneurHTML_ok);

      //MAJ tag roulant
      tag_info_ed.innerHTML = '';
      tag_info_ed = document.getElementById("tag_info_ed")
      const conteneurHTML_ed = document.createElement("div");
      conteneurHTML_ed.innerHTML =   `<span>${nbr_ed}</span>`;
      tag_info_ed.appendChild(conteneurHTML_ed);

      //MAJ tag non roulant
      tag_info_nr.innerHTML = '';
      tag_info_nr = document.getElementById("tag_info_nr")
      const conteneurHTML_nr = document.createElement("div");
      conteneurHTML_nr.innerHTML =   `<span>${nbr_nr}</span>`;
      tag_info_nr.appendChild(conteneurHTML_nr);
      
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