let vehicules = [];
let immatriculation = [];

//fonction chargeant la liste des vehicules en .json
//déclenchement dès le chargement de la page
fetch('/liste/vehicule')
    .then(response => response.json())
    .then(data => {
        console.log("liste des véhicules chargées",data)
        vehicules = data; // Stocke les données dans la variable globale
        MAJSelectionImmat();
    })
    .catch(error => {
        console.error('Erreur lors du chargement du JSON:', error);
});

document.addEventListener('DOMContentLoaded', () => {

    const btn_enregitrer = document.getElementById("btn_enregistrer")
    //lecture du bouton enregistrer
    btn_enregitrer.addEventListener('click',async function(){
        console.info("click");
        const donnees = ControleRemplissage();
        
    });
    //Lecture de la selection de la depense
    const slt_depense = document.getElementById('slt_depense')
    slt_depense.addEventListener('change',async function() {
            const choix = this.value;
        console.info("depense choisie:");
        console.info(choix);
        // Vérifie si la valeur sélectionnée n'est pas l'option par défaut
        if (choix === "Plein") {
            ChoixPlein()};
        if (choix === "Nettoyage" || choix === "Réparation") {
            ChoixNettoyage()};
        if (choix === "Contrôle technique") {
            ChoixCT()};
        if (choix === "Parking/Gardienage") {
            ChoixParking()};
    });

    //Lecture de la selection de la valeur immatriculation
    const slt_immatriculation = document.getElementById('slt_immatriculation')
    slt_immatriculation.addEventListener('change',async function() {
    const valeur = this.value;
    console.info(valeur)
    // Vérifie si la valeur sélectionnée n'est pas l'option par défaut
    if (this.value !== "--Sélectionner--") {
        MAJinformationsVhl(this.value)
    // Ici, tu peux faire ce que tu veux avec la valeur sélectionnée
    } else {
    console.log("Aucune immatriculation sélectionnée.");
    }
    });

    //MEF de l'input date
    //Lecture en continue
    document.getElementById("ipt_date").addEventListener("input", function(e) {

    let value = e.target.value.replace(/\D/g, ""); // Supprime tout sauf chiffres

    if (value.length > 2) {
        value = value.slice(0,2) + "-" + value.slice(2);
    }

    if (value.length > 5) {
        value = value.slice(0,5) + "-" + value.slice(5,9);
    }

    e.target.value = value;
    });
});




//fonction ajoutant les immatriculations dans la liste déroulante
function MAJSelectionImmat(){
    console.info("fonction integration des immatriculation lancé");
    const contenu =document.getElementById("slt_immatriculation");
    vehicules.forEach(items => {
         const conteneurHTML = document.createElement("option");

         conteneurHTML.value = `${items.immat}`;
         conteneurHTML.textContent = `${items.immat}`;
         contenu.appendChild(conteneurHTML);
    });
    };

//affichage du choix plein
function ChoixPlein(){
    console.info("MEF avec Plein")
    const contenu = document.getElementById("box_depense");
    contenu.innerHTML = "";
    const conteneurHTML = document.createElement("div");
    conteneurHTML.id = "box_plein";
    //creation du conteneur choix du plein
    conteneurHTML.innerHTML = `
                    <h1 id="titreCategorie">Détail des dépenses</h1>
                    <div class="fixed-grid has-5-cols">
                        <div class="grid">
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Date:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="txa_date" rows="1" placeholder="00/00/0000"/>    
                                    </div>
                                </div>
                            </div>
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Kilomètrage:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="txa_kilometrage" rows="1" placeholder="km"/>    
                                    </div>
                                </div>
                            </div>
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Prix/L:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="txa_cout" rows="1" placeholder="€/L"/>    
                                    </div>
                                </div>
                            </div>
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Prix:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="txa_prix" rows="1" placeholder="€"/>    
                                    </div>
                                </div>
                            </div>
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Volume:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="txa_volume" rows="1" placeholder="L"/>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    contenu.appendChild(conteneurHTML);
}

function MAJinformationsVhl(valeur){
    console.info("fonction maj informations vhl installées");
    // Selectionne le model correspondant a la marque selectionné
    const tableau = vehicules.filter(v => v.immat === valeur);
    const choix = tableau[0];
    console.info(choix);
    const km = choix.kilometrage;
    const marque = choix.marque;
    const model = choix.modele;
    document.getElementById("txa_marque").value = marque;
    document.getElementById("txa_model").value = model;
    document.getElementById("txa_kilometrage").value = km;
    };

//affichage du choix netoyage ou réparation
function ChoixNettoyage(){
    console.info("MEF avec Nettoyage ou réparation")
    const contenu = document.getElementById("box_depense");
    contenu.innerHTML = "";
    const conteneurHTML = document.createElement("div");
    
    //creation du conteneur choix du plein
    conteneurHTML.innerHTML = `
                    <h1 id="titreCategorie">Détail des dépenses</h1>
                    <div class="fixed-grid has-3-cols">
                        <div class="grid">
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Date:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="ipt_date" rows="1" placeholder="00/00/0000"/>    
                                    </div>
                                </div>
                            </div>
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Kilomètrage:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="txa_kilometrage" rows="1" placeholder="km"/>    
                                    </div>
                                </div>
                            </div>
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Prix:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="txa_prix" rows="1" placeholder="€"/>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>      
    `;
    contenu.appendChild(conteneurHTML);
    //MEF de l'input date
    //Lecture en continue
    document.getElementById("ipt_date").addEventListener("input", function(e) {

    let value = e.target.value.replace(/\D/g, ""); // Supprime tout sauf chiffres

    if (value.length > 2) {
        value = value.slice(0,2) + "-" + value.slice(2);
    }

    if (value.length > 5) {
        value = value.slice(0,5) + "-" + value.slice(5,9);
    }

    e.target.value = value;
    });
    };

function ChoixCT(){
    console.info("MEF avec plein")
    const contenu = document.getElementById("box_depense");
    contenu.innerHTML = "";
    const conteneurHTML = document.createElement("div");
    conteneurHTML.id = "box_plein";
    //creation du conteneur choix du plein
    conteneurHTML.innerHTML = `
                    <h1 id="titreCategorie">Détail des dépenses</h1>
                    <div class="fixed-grid has-3-cols">
                        <div class="grid">
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Date:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="ipt_date" rows="1" placeholder="00/00/0000"/>    
                                    </div>
                                </div>
                            </div>
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Kilomètrage:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="txa_kilometrage" rows="1" placeholder="km"/>    
                                    </div>
                                </div>
                            </div>
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Prix:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="txa_prix" rows="1" placeholder="€"/>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
    `;
    contenu.appendChild(conteneurHTML);
    //MEF de l'input date
    //Lecture en continue
    document.getElementById("ipt_date").addEventListener("input", function(e) {

    let value = e.target.value.replace(/\D/g, ""); // Supprime tout sauf chiffres

    if (value.length > 2) {
        value = value.slice(0,2) + "-" + value.slice(2);
    }

    if (value.length > 5) {
        value = value.slice(0,5) + "-" + value.slice(5,9);
    }

    e.target.value = value;
    });
};

//affichage du choix netoyage ou réparation
function ChoixParking(){
    console.info("MEF avec Nettoyage ou réparation")
    const contenu = document.getElementById("box_depense");
    contenu.innerHTML = "";
    const conteneurHTML = document.createElement("div");
    
    //creation du conteneur choix du plein
    conteneurHTML.innerHTML = `
                    <h1 id="titreCategorie">Détail des dépenses</h1>
                    <div class="fixed-grid has-2-cols">
                        <div class="grid">
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Date:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="ipt_date" rows="1" placeholder="00/00/0000"/>    
                                    </div>
                                </div>
                            </div>
                            <div class="cell">
                                <div class="field">
                                    <div class="label">Prix:</div>
                                    <div class="control">
                                        <input class="textarea has-fixed-size" id="txa_prix" rows="1" placeholder="€"/>    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>      
    `;
    contenu.appendChild(conteneurHTML);
    //MEF de l'input date
    //Lecture en continue
    document.getElementById("ipt_date").addEventListener("input", function(e) {

    let value = e.target.value.replace(/\D/g, ""); // Supprime tout sauf chiffres

    if (value.length > 2) {
        value = value.slice(0,2) + "-" + value.slice(2);
    }

    if (value.length > 5) {
        value = value.slice(0,5) + "-" + value.slice(5,9);
    }

    e.target.value = value;
    });
    };

//Controle si les case necessaire sont bien remplis
function ControleRemplissage(){
    console.info("Fonction controle cases vides")
    const val_immat = document.getElementById("slt_immatriculation").value
    const choix = document.getElementById("slt_depense")?.value ||"";
    const val_date = document.getElementById("ipt_date")?.value ||"";
    const val_kilometrage = document.getElementById("txa_kilometrage").value;
    const val_cout = document.getElementById("txa_cout")?.value|| "";
    const val_prix = document.getElementById("txa_prix").value;
    const val_volume = document.getElementById("txa_volume")?.value|| "";
    //depense plein
    if (choix === "Plein") {
        if(val_date === "" || val_kilometrage === "" || val_cout === "" || val_prix === "" || val_volume === ""){
            alert('Remplir toutes les données');
        }else{
            alert('donnees remplies');
            data = {
                dateIntervention: val_date,
                kilometrage: val_kilometrage,
                prix: val_prix,
                cout: val_cout,
                volume: val_volume,
                immat : val_immat };
            fetch('/cars/newPlein', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
            return data}};

    //depense Nettoyage et Reparation
    if (choix === "Nettoyage" ) {
        if(val_date === "" || val_kilometrage === "" || val_prix === "" ){
            alert('Remplir toutes les données');
        }else{
            alert('donnees remplies');
            data = {
                dateIntervention: val_date,
                prix: val_prix,
                immat : val_immat}
            fetch('/cars/newClean', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
            return data}};

    //depense Nettoyage et Reparation
    if (choix === "Réparation" ) {
        if(val_date === "" || val_kilometrage === "" || val_prix === "" ){
            alert('Remplir toutes les données');
        }else{
            alert('donnees remplies');
            data = {
                dateIntervention: val_date,
                kilometrage: val_kilometrage,
                prix: val_prix,
                immat : val_immat}
            fetch('/cars/newIntervention', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
            return data}};

     //depense Nettoyage et Reparation
    if (choix === "Contrôle technique" ) {
        if(val_date === "" || val_kilometrage === "" || val_prix === "" ){
            alert('Remplir toutes les données');
        }else{
            alert('donnees remplies');
            data = {
                dateIntervention: val_date,
                kilometrage: val_kilometrage,
                prix: val_prix,
                immat: val_immat}
            fetch('/cars/newCT', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
            return data}};
    
             //depense Nettoyage et Reparation
    if (choix === "Parking/Gardienage" ) {
        if(val_date === "" || val_prix === "" ){
            alert('Remplir toutes les données');
        }else{
            alert('donnees remplies');
            data = {
                dateIntervention: val_date,
                id: 5,
                prix: val_prix}
            return data}};

};