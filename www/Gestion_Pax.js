

//Telecharge la liste des utilisateurs
fetch("/liste/proprietaire")
  .then(response => response.json())
  .then(data => {
    console.info(data);

    // selection du conteneur HTML
    const contenu = document.getElementById("ListeVhl");

    //parcours du taleau "entree"
    data.forEach(items => {

      //creation du bloc HTML
      const conteneurHTML = document.createElement("tr");

        conteneurHTML.innerHTML= `
            <td>${items.id_proprio}</td>
            <td>${items.nom_proprio}</td>
            <td>${items.prenom_proprio}</td>
        `;
        console.info(typeof(data))
      contenu.appendChild(conteneurHTML);
    });
  })
  .catch(error => console.error("Erreur lors du chargement du JSON :", error));


  document.addEventListener('DOMContentLoaded', () => {
    const tbody = document.getElementById('ListeVhl');

    // Écouteur d'événement pour les clics sur les lignes du tableau
    tbody.addEventListener('click', (event) => {
      const row = event.target.closest('tr'); // Trouve la ligne (<tr>) la plus proche de l'élément cliqué
      if (!row) return; // Si on n'a pas cliqué sur une ligne, on sort

      // Récupère toutes les cellules (<td>) de la ligne
      const cells = row.querySelectorAll('td');

      // Extrait les valeurs de chaque cellule
      const rowData = {
        id_proprio: cells[0].textContent,
      
  }
      console.info(rowData)});
});
