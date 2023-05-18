//---------------- PAGE DE CONNEXION
const docSwagger = "http://localhost:5678/api-docs/";
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
      console.log(response.status);
      const jsonData = await response.json();
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
