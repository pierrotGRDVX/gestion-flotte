//reception des donnees


//lecteurs devenements

document.addEventListener('DOMContentLoaded', () => {
    //lecture du bouton remise à zero de la base de donnees
    document.getElementById("btn_reset").addEventListener('click', async () => {
            fetch('/razBDD')
            console.log("BDD effacé")
    });

});


//maj des elements HTML


//intervention utilisateur


//controle des donnees utilisateur

//envoie des donnees