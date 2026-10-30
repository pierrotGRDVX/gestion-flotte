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

    //date du jour affichée par défaut et formatage auto JJ/MM/AAAA
    initChampDate("ipt_date");
});

//retourne la date du jour au format JJ/MM/AAAA
function dateDuJourJJMMAAAA(){
    const d = new Date();
    const jj = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const aaaa = d.getFullYear();
    return jj + "/" + mm + "/" + aaaa;
}

//remplit le champ avec la date du jour et formate la saisie en JJ/MM/AAAA
function initChampDate(idChamp){
    const champ = document.getElementById(idChamp);
    if (!champ) return;
    champ.value = dateDuJourJJMMAAAA();
    champ.addEventListener("input", function(e) {
        let value = e.target.value.replace(/\D/g, "").slice(0, 8); // Supprime tout sauf chiffres
        if (value.length > 2) {
            value = value.slice(0,2) + "/" + value.slice(2);
        }
        if (value.length > 5) {
            value = value.slice(0,5) + "/" + value.slice(5,9);
        }
        e.target.value = value;
    });
}




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
    document.getElementById("txa_kilometrage_prec").value = km;
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
    initChampDate("txa_date");
    //calcul auto du 3e champ quand 2 des 3 sont remplis (volume * prix/L = prix)
    const champVolume = document.getElementById("txa_volume");
    const champCout = document.getElementById("txa_cout");
    const champPrix = document.getElementById("txa_prix");
    function calculAutoPlein(source){
        const volume = parseFloat(champVolume.value.replace(",", "."));
        const cout = parseFloat(champCout.value.replace(",", "."));
        const prix = parseFloat(champPrix.value.replace(",", "."));
        if (source !== champVolume && !isNaN(volume) && !isNaN(cout)) {
            champPrix.value = (volume * cout).toFixed(2);
        } else if (source !== champCout && !isNaN(volume) && !isNaN(prix)) {
            champCout.value = (prix / volume).toFixed(2);
        } else if (source !== champPrix && !isNaN(cout) && !isNaN(prix)) {
            champVolume.value = (prix / cout).toFixed(2);
        }
    }
    champVolume.addEventListener("input", () => calculAutoPlein(champVolume));
    champCout.addEventListener("input", () => calculAutoPlein(champCout));
    champPrix.addEventListener("input", () => calculAutoPlein(champPrix));
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
                    <div class="field">
                        <div class="label">Résultat du contrôle:</div>
                        <div class="control">
                            <label class="radio">
                                <input type="radio" name="rdl_resultat_ct" id="rdl_ct_accepte" value="ok"/> Accepté
                            </label>
                            <label class="radio">
                                <input type="radio" name="rdl_resultat_ct" id="rdl_ct_reporte" value="reporte"/> Reporté
                            </label>
                            <label class="radio">
                                <input type="radio" name="rdl_resultat_ct" id="rdl_ct_refuse" value="refuse"/> Refusé
                            </label>
                        </div>
                    </div>
    `;
    contenu.appendChild(conteneurHTML);
    initChampDate("ipt_date");
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
    initChampDate("ipt_date");
    };

//colorie un champ en rouge (invalide) ou le remet normal (valide)
function coloreChamp(champ, invalide){
    if (!champ) return;
    champ.classList.toggle("is-danger", invalide);
}

//recupere le champ date affiche (statique ou dynamique selon le choix de depense)
function champDateAffiche(){
    return document.getElementById("ipt_date") || document.getElementById("txa_date");
}

//Controle si les cases affichees sont bien remplies, si le kilometrage saisi
//est superieur au precedent kilometrage, puis envoie l'intervention au serveur
function ControleRemplissage(){
    console.info("Fonction controle cases vides")
    const slt_immatriculation = document.getElementById("slt_immatriculation");
    const choix = document.getElementById("slt_depense")?.value || "";
    const champDate = champDateAffiche();
    const val_immat = slt_immatriculation.value;
    const val_date = champDate?.value || "";
    const champKm = document.getElementById("txa_kilometrage");
    const val_kilometrage = champKm?.value || "";
    const champCout = document.getElementById("txa_cout");
    const val_cout = champCout?.value || "";
    const champPrix = document.getElementById("txa_prix");
    const val_prix = champPrix?.value || "";
    const champVolume = document.getElementById("txa_volume");
    const val_volume = champVolume?.value || "";
    const kmPrec = parseFloat(document.getElementById("txa_kilometrage_prec")?.value) || 0;

    //liste des champs obligatoires selon le type de depense choisi
    let champsObligatoires = [slt_immatriculation, champDate, champPrix];
    let idTypeInter = null;
    if (choix === "Plein") {
        champsObligatoires = champsObligatoires.concat([champKm, champCout, champVolume]);
        idTypeInter = 1;
    } else if (choix === "Nettoyage") {
        champsObligatoires = champsObligatoires.concat([champKm]);
        idTypeInter = 2;
    } else if (choix === "Réparation") {
        champsObligatoires = champsObligatoires.concat([champKm]);
        idTypeInter = 3;
    } else if (choix === "Contrôle technique") {
        champsObligatoires = champsObligatoires.concat([champKm]);
        idTypeInter = null; // le CT part dans controle_technique/ct_effectue, pas dans intervention
    } else if (choix === "Parking/Gardienage") {
        idTypeInter = 4;
    } else {
        coloreChamp(slt_immatriculation, false);
        coloreChamp(champDate, false);
        coloreChamp(champPrix, true);
        alert("Choisir un type de dépense");
        return false;
    }

    //verifie que tous les champs affiches sont remplis et les colore en rouge sinon
    let toutRempli = true;
    champsObligatoires.forEach(champ => {
        const vide = !champ || champ.value.trim() === "" || (champ === slt_immatriculation && champ.value === "--Sélectionner--");
        coloreChamp(champ, vide);
        if (vide) toutRempli = false;
    });
    if (!toutRempli) {
        alert("Remplir toutes les données (champs en rouge)");
        return false;
    }

    //verifie que le kilometrage saisi est superieur au precedent kilometrage
    if (champKm && val_kilometrage !== "") {
        const kmSaisi = parseFloat(val_kilometrage.replace(",", "."));
        if (isNaN(kmSaisi) || kmSaisi <= kmPrec) {
            coloreChamp(champKm, true);
            alert("Le kilométrage doit être supérieur au précédent kilométrage (" + kmPrec + " km)");
            return false;
        }
    }

    //convertit la date JJ/MM/AAAA en AAAA-MM-JJ pour la base de donnees
    const dateBDD = val_date.split("/").reverse().join("-");

    //cas du controle technique : un resultat (radio) est obligatoire
    if (choix === "Contrôle technique") {
        const radioCoche = document.querySelector('input[name="rdl_resultat_ct"]:checked');
        if (!radioCoche) {
            alert("Choisir le résultat du contrôle (Accepté / Reporté / Refusé)");
            return false;
        }
        const donneesCT = {
            immat: val_immat,
            date_ct: dateBDD,
            resultat_ct: radioCoche.value,
            observation_ct: null
        };
        fetch("/nouvelle/controle-technique", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(donneesCT),
        })
            .then(response => {
                if (!response.ok) throw new Error("Erreur serveur: " + response.status);
                return response.json();
            })
            .then(data => {
                console.info("contrôle technique enregistré", data);
                alert("Contrôle technique enregistré");
            })
            .catch(error => {
                console.error("Erreur lors de l'enregistrement:", error);
                alert("Erreur lors de l'enregistrement du contrôle technique");
            });
        return donneesCT;
    }

    const donnees = {
        immat: val_immat,
        date: dateBDD,
        cout_inter: val_cout !== "" ? parseFloat(val_cout.replace(",", ".")) : null,
        prix_litre: val_cout !== "" && choix === "Plein" ? parseFloat(val_cout.replace(",", ".")) : null,
        volume: val_volume !== "" ? parseFloat(val_volume.replace(",", ".")) : null,
        kilometrage: val_kilometrage !== "" ? parseFloat(val_kilometrage.replace(",", ".")) : null,
        id_type_inter: idTypeInter,
        observation: null
    };
    //envoi de la nouvelle intervention au serveur Flask pour insertion en BDD
    fetch("/nouvelle/intervention", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(donnees),
    })
        .then(response => {
            if (!response.ok) throw new Error("Erreur serveur: " + response.status);
            return response.json();
        })
        .then(data => {
            console.info("intervention enregistrée", data);
            alert("Intervention enregistrée");
        })
        .catch(error => {
            console.error("Erreur lors de l'enregistrement:", error);
            alert("Erreur lors de l'enregistrement de l'intervention");
        });
    return donnees;
};
