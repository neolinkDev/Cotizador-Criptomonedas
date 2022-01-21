// Variable para llenar el select con las criptomonedas
const $cryptocurrenciesSelect = document.getElementById("criptomonedas");

// Promesa la cual toma el arreglo que viene de la API con diferentes criptomonedas
const getCryptocurrencies = (cryptocurrencies) =>
  new Promise((resolve) => resolve(cryptocurrencies));

// función que conecta a la API
export async function checkCrypto() {
  const url =
    "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

  // Usando Fetch
  // fetch(url)
  //   .then((response) =>
  //     response.ok ? response.json() : Promise.reject(response)
  //   )
  //   .then((result) => {
  //     // console.log(result);
  //     // console.log(result.Data);
  //     return getCryptocurrencies(result.Data);
  //   })
  //   .then((cryptocurrencies) => cryptocurrenciesSelect(cryptocurrencies))
  //   .catch((err) => console.log(err));

  // Usando async/await
  try {
    const response = await fetch(url);
    const result = await response.json(); 
    const crypto = await getCryptocurrencies(result.Data);
    cryptocurrenciesSelect(crypto);
  } catch (error) {
    console.log(error);
  }
}

// llenamos el select con el nombre de las criptomonedas dinamicamente con forEach
function cryptocurrenciesSelect(cryptocurrencies) {
  cryptocurrencies.forEach((crypto) => {
    const { FullName, Name } = crypto.CoinInfo;

    const option = document.createElement("option");
    option.value = Name;
    option.textContent = FullName;
    $cryptocurrenciesSelect.appendChild(option);
  });
}
