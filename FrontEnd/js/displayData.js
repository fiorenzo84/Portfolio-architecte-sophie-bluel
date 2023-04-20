import { fetchData } from "./fetchData.js";

//-------------------------------- AFFICHAGE DES TRAVAUX
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

// BOUTON FILTRE TOUS
const allCategoryButton = document.querySelector(".allCategory");
allCategoryButton.addEventListener("click", () => {
  gallery.innerHTML = "";
  console.log(worksData);
  displayArchitectWorks(worksData);
});

// BOUTON FILTRE OBJETS
const objectsButton = document.querySelector(".objects");
objectsButton.addEventListener("click", () => {
  gallery.innerHTML = "";
  const objectsData = worksData.filter((work) => work.category.id === 1);
  console.log(objectsData);
  displayArchitectWorks(objectsData);
});

// BOUTON FILTRE APPARTEMENTS
const apartmentButton = document.querySelector(".apartment");
apartmentButton.addEventListener("click", () => {
  gallery.innerHTML = "";
  const apartmentData = worksData.filter((work) => work.category.id === 2);
  console.log(apartmentData);
  displayArchitectWorks(apartmentData);
});

// BOUTON FILTRE HOTELS ET RESTAURANTS
const hotelAndRestaurantButton = document.querySelector(".hotelAndRestaurant");
hotelAndRestaurantButton.addEventListener("click", () => {
  gallery.innerHTML = "";
  const hotelAndRestaurantData = worksData.filter(
    (work) => work.category.id === 3
  );
  console.log(hotelAndRestaurantData);
  displayArchitectWorks(hotelAndRestaurantData);
});
