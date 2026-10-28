//reception des donnees


//lecteurs devenements

document.addEventListener('DOMContentLoaded', () => {
    //lecture du bouton remise a zero de la base de donnees
    document.getElementById("btn_reset").addEventListener('click', async () => {
        if (!confirm("Attention : toutes les données vont être effacées. Continuer ?")) return;
        const reponse = await fetch('/razBDD');
        afficherMessage(reponse);
    });

    //lecture du bouton insertion des donnees factices
    document.getElementById("btn_insert_donnees").addEventListener('click', async () => {
        const reponse = await fetch('/api/parametres/injecterDonneesFactices', { method: 'POST' });
        afficherMessage(reponse);
        chargerTables();
    });

    //lecture du bouton export CSV
    document.getElementById("btn_export_csv").addEventListener('click', () => {
        const table = document.getElementById("select_table_export").value;
        if (table) window.location = '/api/parametres/exportCSV/' + table;
    });

    //lecture du bouton import CSV (ouvre le selecteur de fichier)
    document.getElementById("btn_import_csv").addEventListener('click', () => {
        document.getElementById("input_file_csv").click();
    });

    //lecture du fichier CSV choisi puis envoi vers le serveur
    document.getElementById("input_file_csv").addEventListener('change', async (event) => {
        const table = document.getElementById("select_table_import").value;
        const fichier = event.target.files[0];
        if (!table || !fichier) return;
        const formData = new FormData();
        formData.append('fichier', fichier);
        const reponse = await fetch('/api/parametres/importCSV/' + table, { method: 'POST', body: formData });
        afficherMessage(reponse);
        chargerCategories();
        event.target.value = '';
    });

    //lecture du bouton ajout d'une categorie
    document.getElementById("btn_add_categorie").addEventListener('click', async () => {
        const categorie = document.getElementById("input_new_categorie").value.trim();
        if (!categorie) return;
        const reponse = await fetch('/nouvelle/categorie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ categorie: categorie })
        });
        afficherMessage(reponse);
        document.getElementById("input_new_categorie").value = '';
        chargerCategories();
    });

    //chargement initial
    chargerTables();
    chargerCategories();
});


//maj des elements HTML

//affiche les tables dans les deux listes deroulantes
async function chargerTables() {
    const reponse = await fetch('/api/parametres/listeTables');
    const donnees = await reponse.json();
    if (donnees.status !== 'success') return;
    for (const selectId of ["select_table_export", "select_table_import"]) {
        const select = document.getElementById(selectId);
        select.innerHTML = '';
        for (const table of donnees.tables) {
            const option = document.createElement('option');
            option.value = table;
            option.textContent = table;
            select.appendChild(option);
        }
    }
}

//affiche la liste des categories dans le tableau
async function chargerCategories() {
    const reponse = await fetch('/liste/categorie');
    const categories = await reponse.json();
    const tbody = document.getElementById("tbody_categories");
    tbody.innerHTML = '';
    for (const item of categories) {
        const categorie = item.categorie;
        const ligne = document.createElement('tr');

        const celluleNom = document.createElement('td');
        celluleNom.textContent = categorie;
        ligne.appendChild(celluleNom);

        const celluleActions = document.createElement('td');
        celluleActions.appendChild(boutonModifier(categorie));
        celluleActions.appendChild(boutonSupprimer(categorie));
        ligne.appendChild(celluleActions);

        tbody.appendChild(ligne);
    }
}

//cree le bouton modifier d'une categorie
function boutonModifier(categorie) {
    const bouton = document.createElement('button');
    bouton.className = 'button is-small is-warning';
    bouton.textContent = 'Modifier';
    bouton.addEventListener('click', async () => {
        const nouvelleCategorie = prompt('Nouveau nom de la catégorie :', categorie);
        if (!nouvelleCategorie || nouvelleCategorie === categorie) return;
        const reponse = await fetch('/api/parametres/categories/' + encodeURIComponent(categorie), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nouvelleCategorie: nouvelleCategorie })
        });
        afficherMessage(reponse);
        chargerCategories();
    });
    return bouton;
}

//cree le bouton supprimer d'une categorie
function boutonSupprimer(categorie) {
    const bouton = document.createElement('button');
    bouton.className = 'button is-small is-danger';
    bouton.textContent = 'Supprimer';
    bouton.addEventListener('click', async () => {
        if (!confirm('Supprimer la catégorie ' + categorie + ' ?')) return;
        const reponse = await fetch('/supprimer/categorie', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ categorie: categorie })
        });
        afficherMessage(reponse);
        chargerCategories();
    });
    return bouton;
}

//affiche le message retourne par le serveur
async function afficherMessage(reponse) {
    const donnees = await reponse.json();
    const message = document.getElementById("message_parametres");
    message.textContent = donnees.status === 'success'
        ? '✔ ' + donnees.message
        : '✘ Erreur : ' + donnees.message;
    message.style.color = donnees.status === 'success' ? 'green' : 'red';
}


//intervention utilisateur


//controle des donnees utilisateur

//envoie des donnees
