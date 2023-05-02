//---------------- PAGE DE CONNEXION
const docSwagger = "http://localhost:5678/api-docs/";
const API_USERS_LOGIN = "http://localhost:5678/api/users/login";
const API_ALLWORKS = "http://localhost:5678/api/works";

//-------------------------- FETCH HTTP POST ----------------------//
async function connexionData(email, password) {
  const data = {
    email,
    password,
  };
  const response = await fetch(API_USERS_LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  // const jsonData = await response.json();
  return response;
}

//-------------------- FORMULAIRE --------------------------//
const connexionButton = document.querySelector('input[type="submit"]');
const errorMessage = document.querySelector("small");

connexionButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  if (email && password) {
    // Envoi de la requête de connexion
    const response = await connexionData(email, password);

    if (response.status === 200) {
      // Connexion réussie
      const jsonData = await response.json();
      console.log(jsonData.status);
      localStorage.setItem("userId", jsonData.userId);
      localStorage.setItem("token", jsonData.token);
      // Redirection vers la page d'accueil
      window.location.href =
        "http://127.0.0.1:5500/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
    } else {
      console.log(response.status);
      errorMessage.style.display = "block";
    }
  } else {
    // Affichage du message d'erreur
    errorMessage.style.display = "block";
  }
});

// Vérifier si l'utilisateur est connecté
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

if (userId && token) {
  // Si l'utilisateur est connecté, on modifie l'affichage de la page
  displayConnectedLayout();
}

//--------------- FONCTION MODIFICATION DE LA PAGE INDEX CONNECTE ----------------//
function displayConnectedLayout() {
  setTimeout(() => {
    // attendre que le DOM cree les elements avant de les supprimé
    document.querySelector("#edition").style.display = "flex";
    document.querySelector("#introduction span").style.display = "block";
    document.querySelector(".container-filter").style.display = "none";
    const modifyButton = document.querySelector(
      ".container-button-modified button"
    );
    modifyButton.style.display = "flex";
    modifyButton.addEventListener("click", async () => {
      // création de la modale et on importe les données
      const response = await fetch(API_ALLWORKS);
      const works = await response.json();
      displayModal(works);
    });
  }, 100);
  document.querySelector("header nav ul li a").textContent = "logout";
  document.querySelector("header").style.margin = "100px 0px";
}

//--------------------------- FONCTION AFFICHAGE DE LA MODALE------------------//
function displayModal(works) {
  const modalContainer = document.createElement("div");
  const modal = document.createElement("div");
  const closeModal = document.createElement("span");
  const modalTitle = document.createElement("h1");
  const modalGallery = document.createElement("div");
  const greyLine = document.createElement("div");
  const addPictureButton = document.createElement("button");
  const removeGalleryButton = document.createElement("button");
  modalGallery.className = "modal-gallery";
  greyLine.className = "greyLine-gallery ";
  addPictureButton.className = "modal-button";
  removeGalleryButton.className = "remove-gallery-modal-button";
  modalContainer.className = "modal-container";
  modal.className = "modal";
  closeModal.className = "close-modal";
  modalTitle.className = "modal-title";
  closeModal.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  modalTitle.textContent = "Galerie photo";
  addPictureButton.textContent = "Ajouter une photo";
  removeGalleryButton.textContent = "Supprimer la galerie";

  // Remplir la modale avec les données récupérées
  for (const work of works) {
    const image = document.createElement("img");
    const imageContainer = document.createElement("div");
    const containerIcones = document.createElement("div");
    const containerIconeMove = document.createElement("span");
    containerIconeMove.innerHTML =
      '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
    const containerIconeDelete = document.createElement("span");
    containerIconeDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    const edit = document.createElement("p");
    image.src = work.imageUrl;
    image.className = "modal-gallery-image";
    edit.textContent = "éditer";
    containerIcones.className = "container-icones";
    containerIconeMove.className = "container-icone-move";
    containerIconeDelete.className = "container-icone-delete";
    imageContainer.className = "image-container";

    // (VOIR POUR ICONE DEPLCEMENT PHOTO DANS MAQUETTE )
    //au survol d'une photo on fait apparaître l'icone de déplacement des photos
    image.addEventListener("mouseover", () => {
      containerIconeMove.style.opacity = "1";
    });
    image.addEventListener("mouseout", () => {
      containerIconeMove.style.opacity = "0";
    });

    containerIcones.appendChild(containerIconeMove);
    containerIcones.appendChild(containerIconeDelete);
    imageContainer.appendChild(image);
    imageContainer.appendChild(containerIcones);
    imageContainer.appendChild(edit);
    modalGallery.appendChild(imageContainer);

    containerIconeDelete.addEventListener("click", () => {
      console.log("fetch delete du travail par id :", work.id);
    });
  }

  modal.appendChild(closeModal);
  modal.appendChild(modalTitle);
  modal.appendChild(modalGallery);
  modal.appendChild(greyLine);
  modal.appendChild(addPictureButton);
  modal.appendChild(removeGalleryButton);
  modalContainer.appendChild(modal);
  document.body.insertBefore(modalContainer, document.body.firstChild);

  // fermeture de la modale sur la croix
  closeModal.addEventListener("click", () => {
    modalContainer.remove();
  });
  // ou fermeture de la modale en cliquant en dehors de la modale
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      modalContainer.remove();
    }
  });
}

//////////////////////////////////////////////////////////////////////////////////////////////

// //---------------- PAGE DE CONNEXION
// const docSwagger = "http://localhost:5678/api-docs/";
// const API_USERS_LOGIN = "http://localhost:5678/api/users/login";
// const API_ALLWORKS = "http://localhost:5678/api/works";

// //-------------------------- FETCH HTTP POST ----------------------//
// async function connexionData(email, password) {
//   const data = {
//     email,
//     password,
//   };
//   const response = await fetch(API_USERS_LOGIN, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   // const jsonData = await response.json();
//   return response;
// }

// //-------------------- FORMULAIRE --------------------------//
// const connexionButton = document.querySelector('input[type="submit"]');
// const errorMessage = document.querySelector("small");

// connexionButton.addEventListener("click", async (e) => {
//   e.preventDefault();

//   const email = document.querySelector("#email").value;
//   const password = document.querySelector("#password").value;

//   if (email && password) {
//     // Envoi de la requête de connexion
//     const response = await connexionData(email, password);

//     if (response.status === 200) {
//       // Connexion réussie
//       const jsonData = await response.json();
//       console.log(jsonData.status);
//       localStorage.setItem("userId", jsonData.userId);
//       localStorage.setItem("token", jsonData.token);
//       // Redirection vers la page d'accueil
//       window.location.href =
//         "http://127.0.0.1:5500/Portfolio-architecte-sophie-bluel/FrontEnd/index.html";
//     } else {
//       console.log(response.status);
//       errorMessage.style.display = "block";
//     }
//   } else {
//     // Affichage du message d'erreur
//     errorMessage.style.display = "block";
//   }
// });

// // Vérifier si l'utilisateur est connecté
// const userId = localStorage.getItem("userId");
// const token = localStorage.getItem("token");

// if (userId && token) {
//   // Si l'utilisateur est connecté, on modifie l'affichage de la page
//   displayConnectedLayout();
// }

// //--------------- FONCTION MODIFICATION DE LA PAGE INDEX CONNECTE ----------------//
// function displayConnectedLayout() {
//   setTimeout(() => {
//     // attendre que le DOM cree les elements avant de les supprimé
//     document.querySelector("#edition").style.display = "flex";
//     document.querySelector("#introduction span").style.display = "block";
//     document.querySelector(".container-filter").style.display = "none";
//     const modifyButton = document.querySelector(
//       ".container-button-modified button"
//     );
//     modifyButton.style.display = "flex";
//     modifyButton.addEventListener("click", async () => {
//       // création de la modale et on importe les données
//       const response = await fetch(API_ALLWORKS);
//       const works = await response.json();
//       displayModal(works);
//     });
//   }, 100);
//   document.querySelector("header nav ul li a").textContent = "logout";
//   document.querySelector("header").style.margin = "100px 0px";
// }

// //--------------------------- FONCTION AFFICHAGE DE LA MODALE------------------//
// function displayModal(works) {
//   const modalContainer = document.createElement("div");
//   const modal = document.createElement("div");
//   const closeModal = document.createElement("span");
//   const modalTitle = document.createElement("h1");
//   const modalGallery = document.createElement("div");
//   const greyLine = document.createElement("div");
//   const addPictureButton = document.createElement("button");
//   const removeGalleryButton = document.createElement("button");
//   modalGallery.className = "modal-gallery";
//   greyLine.className = "greyLine-gallery ";
//   addPictureButton.className = "modal-button";
//   removeGalleryButton.className = "remove-gallery-modal-button";
//   modalContainer.className = "modal-container";
//   modal.className = "modal";
//   closeModal.className = "close-modal";
//   modalTitle.className = "modal-title";
//   closeModal.innerHTML = '<i class="fa-solid fa-xmark"></i>';
//   modalTitle.textContent = "Galerie photo";
//   addPictureButton.textContent = "Ajouter une photo";
//   removeGalleryButton.textContent = "Supprimer la galerie";

//   // Remplir la modale avec les données récupérées
//   for (const work of works) {
//     const image = document.createElement("img");
//     const imageContainer = document.createElement("div");
//     const containerIcones = document.createElement("div");
//     const containerIconeMove = document.createElement("span");
//     containerIconeMove.innerHTML =
//       '<i class="fa-solid fa-arrows-up-down-left-right"></i>';
//     const containerIconeDelete = document.createElement("span");
//     containerIconeDelete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
//     const edit = document.createElement("p");
//     image.src = work.imageUrl;
//     image.className = "modal-gallery-image";
//     edit.textContent = "éditer";
//     containerIcones.className = "container-icones";
//     containerIconeMove.className = "container-icone-move";
//     containerIconeDelete.className = "container-icone-delete";
//     imageContainer.className = "image-container";

//     // (VOIR POUR ICONE DEPLCEMENT PHOTO DANS MAQUETTE )
//     //au survol d'une photo on fait apparaître l'icone de déplacement des photos
//     image.addEventListener("mouseover", () => {
//       containerIconeMove.style.opacity = "1";
//     });
//     image.addEventListener("mouseout", () => {
//       containerIconeMove.style.opacity = "0";
//     });

//     containerIcones.appendChild(containerIconeMove);
//     containerIcones.appendChild(containerIconeDelete);
//     imageContainer.appendChild(image);
//     imageContainer.appendChild(containerIcones);
//     imageContainer.appendChild(edit);
//     modalGallery.appendChild(imageContainer);

//     // --- suppression des travaux --- //
//     containerIconeDelete.addEventListener("click", async (event) => {
//       const workId = work.id; // récupérer l'identifiant à supprimer
//       const response = await fetch(
//         `http://localhost:5678/api/works/${workId}`,
//         {
//           method: "DELETE",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Bearer " + token,
//           },
//         }
//       );
//       if (response.ok) {
//         console.log("travaux supprimée");
//         // Actualiser la galerie
//         const response = await fetch(API_ALLWORKS);
//         const works = await response.json();
//         modalGallery.innerHTML = "";
//       } else {
//         // Erreur de suppression
//         console.log("Erreur lors de la suppression de l'œuvre.");
//       }
//       event.stopPropagation();
//     });

//     modal.appendChild(closeModal);
//     modal.appendChild(modalTitle);
//     modal.appendChild(modalGallery);
//     modal.appendChild(greyLine);
//     modal.appendChild(addPictureButton);
//     modal.appendChild(removeGalleryButton);
//     modalContainer.appendChild(modal);
//     document.body.insertBefore(modalContainer, document.body.firstChild);

//     // fermeture de la modale sur la croix
//     closeModal.addEventListener("click", () => {
//       modalContainer.remove();
//     });
//     // ou fermeture de la modale en cliquant en dehors de la modale
//     modalContainer.addEventListener("click", (e) => {
//       if (e.target === modalContainer) {
//         modalContainer.remove();
//       }
//     });
//   }
// }
