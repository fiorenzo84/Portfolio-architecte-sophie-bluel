//---------------- PAGE DE CONNEXION
const docSwagger = "http://localhost:5678/api-docs/"; // (simplement pour ouvrir rapidement pour travailler)
const API_USERS_LOGIN = "http://localhost:5678/api/users/login";
const API_ALLWORKS = "http://localhost:5678/api/works";

//-------------------------- FETCH HTTP USERS LOGIN  ----------------------//
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

//------------------- FORMULAIRE DE LOGIN (administrateur)-----------------------//
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
      console.log("connexion reussie code :", response.status);
      const jsonData = await response.json();
      // si l'utilisateur est bien connectée on récupère et on stocke le token
      localStorage.setItem("token", jsonData.token);
      // et on redirige vers la page d'accueil
      window.location.href = "../index.html";
    } else {
      console.log("échec connexion code :", response.status);
      errorMessage.style.display = "block";
    }
  } else {
    // Affichage du message d'erreur
    errorMessage.style.display = "block";
  }
});
