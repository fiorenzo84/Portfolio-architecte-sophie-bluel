import { fetchData } from "./fetchData.js";

//-------------------- AFFICHAGE DES TRAVAUX -------------------------//
const worksData = await fetchData();
const gallery = document.querySelector(".gallery");

function displayArchitectWorks(allWorks) {
  allWorks.forEach((workData) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.src = workData.imageUrl;
    image.alt = workData.title;
    const figcaption = document.createElement("figcaption");
    figcaption.textContent = workData.title;
    // on rattache l'image et la figcation dans la balise 'parent' figure
    figure.appendChild(image);
    figure.appendChild(figcaption);
    // on rattache les figures dans la gallerie
    gallery.appendChild(figure);
  });
}
displayArchitectWorks(worksData);

//------------------ CREATION DE LA DIV EDITION -----------------------//
const editionDiv = document.createElement("div");
editionDiv.id = "edition";
// Création du span
const span = document.createElement("span");
// Création de l'icône
const icon = document.createElement("i");
icon.classList.add("fa-regular", "fa-pen-to-square");
span.textContent = "mode édition";
// Ajout de l'icône dans le span
span.appendChild(icon);
// Ajout du span dans la div
editionDiv.appendChild(span);
// Création du bouton
const button = document.createElement("button");
button.textContent = "publier les changements";
// Ajout du bouton dans la div
editionDiv.appendChild(button);
// Ajout de la div dans le body
document.body.insertBefore(editionDiv, document.body.firstChild);

//---------------- CREATION SPAN (non fonctionnel sous photo) -------------------//
const spanModifier = document.createElement("span");
spanModifier.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';
// sélectionner la figure contenant l'image et le span existant
const figure = document.querySelector("#introduction figure");
// ajouter le span nouvellement créé sous l'image
figure.appendChild(spanModifier);

//--------------- CREATION DU BOUTON MODIFIER POUR AJOUTER LES MEDIAS ----------------//
const buttonContainer = document.querySelector(".container-button-modified");
const modifierButton =
  '<button><span><i class="fa-regular fa-pen-to-square"></i>modifier</span></button>';
buttonContainer.insertAdjacentHTML("beforeend", modifierButton);

//------------- CREATION ET AFFICHAGE DU CONTENAIR DES FILTRES --------------//
const portfolio = document.querySelector("#portfolio"); //parent
const secondChildOfPortfolio = portfolio.children[1];
const containerFilter = document.createElement("div");
containerFilter.classList.add("container-filter");
portfolio.insertBefore(containerFilter, secondChildOfPortfolio); //affichage du filtre dessous le titre

//----------------- CREATION DU BOUTON FILTRE TOUS ----------------------//
const allCategories = document.createElement("button");
allCategories.textContent = "Tous";
containerFilter.insertBefore(allCategories, containerFilter.firstChild);

allCategories.addEventListener("click", () => {
  gallery.innerHTML = "";
  displayArchitectWorks(worksData);
});

//----------- SET CATEGORIE OBJET / APPARTEMENT / HOTEL ET RESTAURANT ------------//
// tableau de données unique de noms de catégories à partir de "worksData"
const categories = new Set(worksData.map((work) => work.category.name));

//------------ BOUCLE DANS TABLEAU CATEGORIE POUR CREER LES AUTRES BOUTONS ---------//
categories.forEach((category) => {
  const button = document.createElement("button");
  button.textContent = category;
  containerFilter.appendChild(button);
  // écouteur d'évènement pour les boutons catégories
  button.addEventListener("click", () => {
    gallery.innerHTML = "";
    const filteredData = worksData.filter(
      (work) => work.category.name === category
    );
    displayArchitectWorks(filteredData);
  });
});

//-------------- SELECTION DE L'ELEMENT POUR LA DECONNEXION -------------------//
const deconnexionButton = document.querySelector("nav ul li a ");

deconnexionButton.addEventListener("click", () => {
  // on supprime les infromations de l'utilisateur du localstorage
  localStorage.removeItem("userId");
  localStorage.removeItem("token");
  // et on redirige vers la page de connexion (login)
  window.location.href = "http://localhost:5500/login.html";
});

//------------------- AFFICHAGE DE LA PAGE CONNECTEE ------------------------//
function displayConnectedLayout() {
  document.querySelector("#edition").style.display = "flex";
  document.querySelector("#introduction span").style.display = "block";
  document.querySelector(".container-filter").style.display = "none";
  const modifyButton = document.querySelector(
    ".container-button-modified button"
  );
  modifyButton.style.display = "flex";
  modifyButton.addEventListener("click", async () => {
    // on importe les données et création de la modale galerie photo
    const response = await fetch(API_ALLWORKS);
    const works = await response.json();
    displayModal(works);
  });
  document.querySelector("header nav ul li a").textContent = "logout";
  document.querySelector("header").style.margin = "100px 0px";
}

//------------------- VERIFIE SI L'UTILISATEUR EST CONNECTEE ------------------------//
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");
// Si l'utilisateur est connecté alors on modifie l'affichage de la page
if (userId && token) {
  displayConnectedLayout();
}
