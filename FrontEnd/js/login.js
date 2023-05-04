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

    //au survol d'une photo apparition de l'icone de déplacement des photos (non fonctionnel)
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
