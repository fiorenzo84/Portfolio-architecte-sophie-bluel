//---------------- RECUPERATION DES TRAVAUX

export async function fetchData() {
  const worksUrl = "http://localhost:5678/api/works";
  const response = await fetch(worksUrl);
  const data = await response.json();
  return data;
}
