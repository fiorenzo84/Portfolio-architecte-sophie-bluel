//--------------------------- LA MODALE DES TRAVAUX ------------------//
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

  modal.appendChild(closeModal);
  modal.appendChild(modalTitle);
  modal.appendChild(modalGallery);
  modal.appendChild(greyLine);
  modal.appendChild(addPictureButton);
  modal.appendChild(removeGalleryButton);
  modalContainer.appendChild(modal);
  document.body.insertBefore(modalContainer, document.body.firstChild);

  // Remplir la modale avec la fonction qui crée les vignettes des travaux
  for (const work of works) {
    createImageModal(work);
  }
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

  //------------ LES VIGNETTES DE LA MODALE ------------------------//
  function createImageModal(work) {
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

    containerIcones.appendChild(containerIconeMove);
    containerIcones.appendChild(containerIconeDelete);
    imageContainer.appendChild(image);
    imageContainer.appendChild(containerIcones);
    imageContainer.appendChild(edit);

    //au survol d'une vignette, apparition de l'icone de déplacement des photos (non fonctionnel)
    image.addEventListener("mouseover", () => {
      containerIconeMove.style.opacity = "1";
    });
    image.addEventListener("mouseout", () => {
      containerIconeMove.style.opacity = "0";
    });

    //-------------------------- FETCH  DELETE (au clic sur corbeille)----------------------//
    containerIconeDelete.addEventListener("click", (e) => {
      e.stopPropagation();
      console.log("icone cliquée");
      deleteWork(work);
    });

    async function deleteWork(work) {
      // on récupère le token dans le local storage
      const token = localStorage.getItem("token");
      const workId = work.id; // on récupére l'identifiant à supprimer

      try {
        const response = await fetch(
          `http://localhost:5678/api/works/${workId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.ok) {
          // prend en compte les status de 200 à 300
          console.log("travaux supprimée code :", response.status);
          imageContainer.remove();
        } else {
          console.log(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    }

    modalGallery.appendChild(imageContainer);
  }

  //----------------- AU CLICK "Ajouter une photo" ON APPELLE LA MODALE IMAGE ------------------//
  //écoute au click de "Ajouter une photo"
  addPictureButton.addEventListener("click", () => {
    addWork(); // fichier addWorkModal.js
  });
}
