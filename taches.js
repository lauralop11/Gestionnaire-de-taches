class Tache {
    
    constructor(titreTch, descriptionTch, dateEcheanceTch){
        this.titreTch = titreTch;
        this.descriptionTch = descriptionTch;
        this.dateEcheanceTch = dateEcheanceTch;
        this.etat = 'En cours';
    }
    terminee (){
        this.etat = 'Terminée'
        alert ("Etez-vous sur de termine la tache?");
    }
}

class Gestionaire {

    constructor(){
        this.listeTache = [];
    }
    ajouterTch(nouvelleTache){
        this.listeTache.push(nouvelleTache);
    }
    afficherToutesTch(){
        const tablePlace = document.getElementById('tableTacheCours');
        tablePlace.innerHTML= "";
        this.listeTache.forEach((indice) => {
            affichagDonneeTable (tablePlace,indice);
        }); 
    }
    afficherTchCours(){
        const tablePlace = document.getElementById('tableTacheCours');
        tablePlace.innerHTML= "";
        this.listeTache.forEach((indice) => {
            if (indice.etat == 'En cours'){
                affichagDonneeTable (tablePlace,indice)
             }
        });  
    }
    afficherTchTerminee(){
        const tablePlace = document.getElementById('tableTacheCours');
        tablePlace.innerHTML= "";
        this.listeTache.forEach((indice) => {
            if (indice.etat == 'Terminée'){
                affichagDonneeTable (tablePlace,indice)
             }
        }); 
    }
    supprimerTch(){
        this.listeTache.forEach((indice) => {
            this.listeTache.splice(indice,1); 
             alert("Vous avez bien suprime la tache");   
             console.log(this.listeTache);
         });   
    }
}


const placeAjoute = document.getElementById ('divFormulaire');
var nouveauxGestionnaire = new Gestionaire ();
nouveauxGestionnaire.afficherTchCours(); 

function creerTache(){
    const tablePlace = document.getElementById('tableTacheCours');
    tablePlace.innerHTML= "";
    const titreTch = document.getElementById ('tchTitre').value;
    const descriptionTch = document.getElementById ('tchDescription').value;
    const dateEcheanceBase = new Date(document.getElementById ('dtEcheance').value);
    console.log(dateEcheanceBase);
    let mois = dateEcheanceBase.getMonth();
    let jour = dateEcheanceBase.getDate();
    let anee = dateEcheanceBase.getFullYear();
    let dateEcheanceTch = `${++jour} ${++mois} ${anee}`;

    var nouvelleTache = new Tache (titreTch, descriptionTch, dateEcheanceTch);
    nouveauxGestionnaire.ajouterTch(nouvelleTache);
    nouveauxGestionnaire.afficherTchCours();

    placeAjoute.classList.add('d-none');
}

function afficherDefault(){
    const tablePlace = document.getElementById('tableTacheCours');
    const tableTxt = document.createElement('tr');
    const tableLigne = document.createElement('td');
    tableLigne.setAttribute("colspan", "5");
    tableLigne.textContent = "Il n'y a pas des taches";
    tableTxt.appendChild(tableLigne);
    tablePlace.appendChild(tableTxt);
}
// function pour ajouter les donnes dans la cellule de la table
function affichagDonneeTable (tablePlace,tache){
    const tableTxt = document.createElement('tr');
    const td1= document.createElement('td');
    td1.textContent = tache.titreTch;
    const td2 = document.createElement('td');
    td2.textContent = tache.dateEcheanceTch;
    const td3= document.createElement('td');
    td3.textContent = tache.descriptionTch;
    const td4 = document.createElement('td');
    td4.textContent = tache.etat;

    const tdCheck = document.createElement('td');
    tdCheck.className = "form-check";
    tdCheck.classList.add ("form-switch");
    
    const inputCheck = document.createElement('input');
    inputCheck.className = "form-check-input";
    inputCheck.setAttribute("type", "checkbox")
    inputCheck.setAttribute("id", "flexSwitchCheckDefault")

    const labelCheck = document.createElement('label');
    labelCheck.className = "form-check-label";
    labelCheck.setAttribute("type", "checkbox")
    labelCheck.setAttribute("for", "flexSwitchCheckDefault")
    labelCheck.textContent = "Termine"

    const tdSuprimer = document.createElement('td');
    const logSuprimer = document.createElement('span');
    logSuprimer.className = "fa-solid fa-trash";
    
    tableTxt.appendChild(td1);
    tableTxt.appendChild(td2);
    tableTxt.appendChild(td3);
    tableTxt.appendChild(td4);
    tdCheck.appendChild(inputCheck);
    tdCheck.appendChild(labelCheck );
    tableTxt.appendChild(tdCheck);
    tdSuprimer.appendChild(logSuprimer);
    tableTxt.appendChild(tdSuprimer);
    tablePlace.appendChild(tableTxt);
    

        //Validation bouton checked pour le tache dans le table.
    inputCheck.addEventListener('change', function() {
        if (this.checked) {
            tache.terminee();
            etat = "Terminee";
            td4.textContent = etat;  
            td4.className = "text-danger";
            nouveauxGestionnaire.afficherTchCours()  
        }else {  
            etat = "En cours";  
        }
      });
      //Validation suprimer
      tdSuprimer.addEventListener('click', function() {
        nouveauxGestionnaire.supprimerTch();
        nouveauxGestionnaire.afficherTchCours()  
    });
}
// function pour devenir visible le formulaire
function activeBtnAjoute(){
    document.getElementById('tchTitre').value= "";
    document.getElementById('tchDescription').value= "";
    document.getElementById('dtEcheance').value= "";
    placeAjoute.classList.remove('d-none');
 }
function afficherTerminee() {
    nouveauxGestionnaire.afficherTchTerminee();
}
function afficherTous() {
    nouveauxGestionnaire.afficherToutesTch();
}
function supprimer(){
    const effacerTitre= document.getElementById('effacerTitre').value;
    nouveauxGestionnaire.supprimerTch(effacerTitre);
    document.getElementById('effacerTitre').value = "";
}
  

