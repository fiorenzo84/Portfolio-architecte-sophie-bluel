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

//--------------------------- MODALE DES TRAVAUX ------------------//
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

    //-------------------------- FETCH  DELETE (au clic sur corbeille)----------------------//
    containerIconeDelete.addEventListener("click", async (event) => {
      // on récupère le token dans le local storage
      const token = localStorage.getItem("token");
      console.log("fetch delete du travail par id :", work.id);
      const workId = work.id; // on récupére l'identifiant à supprimer
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
        console.log("travaux supprimée:", response);

        // Actualiser la galerie
        const response = await fetch(API_ALLWORKS);
        const works = await response.json();
        modalGallery.innerHTML = "";
      } else {
        // Erreur de suppression
        console.log("Erreur lors de la suppression de l'œuvre.");
      }
      event.stopPropagation();
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

  //--------------------------- MODALE POUR AJOUT IMAGE ------------------//
  addPictureButton.addEventListener("click", () => {
    // cache la modale des travaux
    modalContainer.remove();
    modal.remove();
    //creer la modale photo avec ses éléments
    const modalContainerPicture = document.createElement("div");
    const modalPicture = document.createElement("div");
    const closeModalPicture = document.createElement("span");
    const leftArrowBack = document.createElement("span");
    const modalTitlePicture = document.createElement("h1");
    const form = document.createElement("form");
    const labelInputText = document.createElement("label");
    const containerAddPictureInput = document.createElement("div");
    const inputText = document.createElement("input");
    const labelSelect = document.createElement("label");
    const select = document.createElement("select");
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    const option3 = document.createElement("option");
    const greyLine = document.createElement("div");
    const button = document.createElement("button");
    const worksErrorMessage = document.createElement("small");

    addPictureButton.className = "modal-button";
    modalContainerPicture.className = "modal-container";
    modalPicture.className = "modal-picture";
    closeModalPicture.className = "close-modal";
    leftArrowBack.innerHTML = '<i class="fa-solid fa-arrow-left-long"></i>';
    modalTitlePicture.className = "modal-title";
    form.className = "modal-form";
    containerAddPictureInput.innerHTML =
      '<i class="fa-sharp fa-regular fa-image" style="color:#b9c5cc; font-size: 65px;"></i>' +
      '<div class="custom-file-upload">' +
      '<label for="photo" class="add-picture-button">' +
      '<input type="file" id="photo" name="photo" style="display:none;">' +
      " + Ajouter photo" +
      "</label>" +
      "<p>jpg, png : 4mo max</p>" +
      "</div>";

    containerAddPictureInput.className = "container-addImg-input";
    leftArrowBack.className = "back-arrow";
    greyLine.className = "greyLine-img";
    labelInputText.textContent = "Titre:";
    labelSelect.textContent = "Catégorie:";
    option1.value = "1";
    option1.text = "Objets";
    option2.value = "2";
    option2.text = "Appartements";
    option3.value = "3";
    option3.text = "Hotels & restaurants";
    button.type = "submit";
    button.textContent = "Valider";
    closeModalPicture.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    modalTitlePicture.textContent = "Ajout photo";
    inputText.type = "text";
    inputText.id = "image-url";
    select.id = "image-category";
    worksErrorMessage.className = "works-error-message";
    worksErrorMessage.textContent = "Veuillez remplir le formulaire";

    select.appendChild(option1);
    select.appendChild(option2);
    select.appendChild(option3);

    form.appendChild(containerAddPictureInput);
    form.appendChild(labelInputText);
    form.appendChild(inputText);
    form.appendChild(labelSelect);
    form.appendChild(select);
    form.appendChild(greyLine);
    form.appendChild(button);
    form.appendChild(worksErrorMessage);
    modalPicture.appendChild(closeModalPicture);
    modalPicture.appendChild(leftArrowBack);
    modalPicture.appendChild(modalTitlePicture);
    modalPicture.appendChild(form);
    // modalPicture.appendChild(greyLine);
    modalContainerPicture.appendChild(modalPicture);
    document.body.insertBefore(modalContainerPicture, document.body.firstChild);

    // récupérer l'input "file" pour aller chercher des photos
    const inputPhoto = document.getElementById("photo");
    // ajouter un événement "change" à l'input "file"
    inputPhoto.addEventListener("change", () => {
      // récupérer le fichier image sélectionné
      const imageFile = inputPhoto.files[0];

      // créer un élément d'image et lui attribuer l'URL de l'image sélectionnée
      const imageElement = document.createElement("img");
      imageElement.src = URL.createObjectURL(imageFile);

      //récupère le contenair de l'input file
      const containerFileUpload = document.querySelector(".custom-file-upload");

      // ajouter l'image à la page a la place du contenair input file
      containerAddPictureInput.removeChild(containerAddPictureInput.firstChild);
      containerAddPictureInput.appendChild(imageElement);
      containerFileUpload.style.display = "none";
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const title = inputText.value;
      const category = select.value;
      const fileInput = document.querySelector("#photo");
      const file = fileInput.files[0];
      console.log(file, title, category);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("image", file);

      const token = localStorage.getItem("token");
      if (file && title && category) {
        // FETCH POUR ENVOYER TRAVAUX //
        const response = await fetch(API_ALLWORKS, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        });

        if (response.ok) {
          form.reset();
          console.log(response.status);
        } else {
          worksErrorMessage.style.display = "block";
        }
        console.log(response.status);
        modalContainerPicture.remove();
      } else {
        worksErrorMessage.style.display = "block";
      }
    });

    // flèche retour sur modale des travaux
    leftArrowBack.addEventListener("click", () => {
      modalPicture.remove();
      modalContainer.appendChild(modal);
      document.body.insertBefore(modalContainer, document.body.firstChild);
      modalContainerPicture.remove();
    });

    // fermeture de la modale image sur la croix
    closeModalPicture.addEventListener("click", () => {
      modalContainerPicture.remove();
    });
    // ou fermeture de la modale image en cliquant en dehors de la modale
    modalContainerPicture.addEventListener("click", (e) => {
      if (e.target === modalContainerPicture) {
        modalContainerPicture.remove();
      }
    });
  });
}
