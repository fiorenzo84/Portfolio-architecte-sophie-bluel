//---------------- PAGE DE CONNEXION

//-------------------------- FETCH HTTP POST ----------------------//
async function connexionData(email, password) {
  const data = {
    email,
    password,
  };
  const response = await fetch("http://localhost:5678/api/users/login", {
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
    console.log(response); // Vérifier le statut de la réponse

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

//---- FONCTION MODIFICATION D'ELEMENT DE LA PAGE UNE FOIS CONNECTE -----//
function displayConnectedLayout() {
  setTimeout(() => {
    // attendre que le DOM cree les elements avant de les supprimé
    document.querySelector("#edition").style.display = "flex";
    document.querySelector("#introduction span").style.display = "block";
    document.querySelector(".container-filter").style.display = "none";
    document.querySelector(".container-button-modified button").style.display =
      "flex";
  }, 100);
  document.querySelector("header nav ul a li").textContent = "logout";
  document.querySelector("header").style.margin = "100px 0px";
}

//////////////////// TODO : faire intégration de la modale ///////////////

// ATTENDRE QUE LE BOUTON SOIT AFFICHER POUR FAIRE L'ECOUTEUR EVENEMENT CLICK
setTimeout(() => {
  const modifyButton = document.querySelector(
    ".container-button-modified button"
  );
  console.log(modifyButton);
  modifyButton.addEventListener("click", () => {
    console.log("creer la modale");
  });
}, 100);
