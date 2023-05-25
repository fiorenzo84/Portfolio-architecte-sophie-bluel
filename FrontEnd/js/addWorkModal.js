//--------------------------- MODALE POUR AJOUT IMAGE ------------------//

function addWork() {
  const modalContainer = document.querySelector(".modal-container");
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

  modalPicture.className = "modal-picture";
  closeModalPicture.className = "close-modal";
  leftArrowBack.innerHTML = '<i class="fa-solid fa-arrow-left-long"></i>';
  modalTitlePicture.className = "modal-title";
  form.className = "modal-form";
  // petite fenêtre avec l'input et la photo pour les travaux
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
  modalContainer.appendChild(modalPicture);

  const inputPhoto = document.getElementById("photo");
  // ajouter un événement "change" à l'input "file" pour aller chercher des photos
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
    // on cache l'input pour "switcher" avec l'image
    containerFileUpload.style.display = "none";
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = inputText.value;
    const category = select.value;
    const fileInput = document.querySelector("#photo");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", file);
    const token = localStorage.getItem("token");

    // SI LES INPUTS SONT BON ON FETCH POUR ENVOYER DES TRAVAUX //
    if (file && title && category) {
      const response = await fetch(API_ALLWORKS, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (response.status === 201) {
        // gérer vignette page accueil
        console.log("Travaux ajoutée code :", response.status);
        // récupère la réponse en json et affiche les données
        const responseJSON = await response.json();
        console.log(responseJSON);
        const gallery = document.querySelector(".gallery");
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = responseJSON.imageUrl;
        image.alt = responseJSON.title;
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = responseJSON.title;
        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      } else {
        worksErrorMessage.style.display = "block";
      }
    } else {
      worksErrorMessage.style.display = "block";
    }
  });

  // flèche retour sur modale des travaux
  leftArrowBack.addEventListener("click", () => {
    modalPicture.remove();
  });

  // fermeture de la modale image sur la croix
  closeModalPicture.addEventListener("click", () => {
    modalContainer.remove();
  });
  // ou fermeture de la modale image en cliquant en dehors de la modale
  modalContainer.addEventListener("click", (e) => {
    if (e.target === modalContainer) {
      modalContainer.remove();
    }
  });
}
