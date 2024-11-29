try {
  const params = new URLSearchParams(window.location.search);
  const countryName = params.get("name");
  const detailsContainer = document.getElementById("details-container");

  async function showDetails() {
    let response = await fetch("https://restcountries.com/v3.1/all");
    let data = await response.json();

    const country = data.find((c) => c.name.common === countryName);

    if (!country) {
      detailsContainer.innerHTML = `<h2>Country not found</h2>`;
      return;
    }

    const detailsContent = `
    <div class="details rep-info">
      <img src="${country.flags.png}" alt="${country.name.common}" class="flag">
      <h2>${country.name.common}</h2>
      <p><strong>Population:</strong> ${country.population}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Subregion:</strong> ${country.subregion}</p>
      <p><strong>Capital:</strong> ${country.capital}</p>
      <p><strong>Languages:</strong> ${Object.values(country.languages)}</p>
    <button id="backButton">Back</button>
      </div>
    
  `;

    detailsContainer.innerHTML = detailsContent;

    document.getElementById("backButton").addEventListener("click", () => {
      window.location.replace("./index.html");
    });
  }

  showDetails();
} catch (err) {
  console.log(err);
}
