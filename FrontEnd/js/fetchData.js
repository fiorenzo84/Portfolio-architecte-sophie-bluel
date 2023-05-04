//---------------- RECUPERATION DES TRAVAUX ----------------//
const API_ALLWORKS = "http://localhost:5678/api/works";

export async function fetchData() {
  //const worksUrl = ;
  const response = await fetch(API_ALLWORKS);
  const data = await response.json();
  return data;
}
