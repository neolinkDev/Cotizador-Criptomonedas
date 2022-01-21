const $formulario = document.getElementById("formulario");

const searchObject = {
  moneda: "",
  criptomoneda: "",
};

// función con el evento submit para el formulario
export function formSubmit() {
  $formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    // destructuración para validar los campos del formularios
    const { moneda, criptomoneda } = searchObject;
    if (moneda === "" || criptomoneda === "") {
      showAlert("Ambos campos son obligatorios");
      return;
    }

    // consultando API para traer los datos del costo de cada moneda
    consultAPI();
  });
}

// conectando con API para mostrar los datos de cada moneda
async function consultAPI() {
  const { moneda, criptomoneda } = searchObject;

  const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

  // spinner
  spinner();

  // Usando Fetch
  // fetch(url)
  //   .then((response) => response.json())
  //   .then((price) => {
  //     // console.log(price.DISPLAY[criptomoneda][moneda]);

  //     // limpiar HTML
  //     cleanHTML();

  //     const { PRICE, HIGH24HOUR, CHANGEPCT24HOUR, LOW24HOUR } =
  //       price.DISPLAY[criptomoneda][moneda];

  //     const $precio = document.createElement("p");
  //     $precio.classList.add("precio");
  //     $precio.innerHTML = `Precio: <span> ${PRICE} </span>`;

  //     const $precioMasAlto24 = document.createElement("p");
  //     $precioMasAlto24.innerHTML = `Precio más alto 24h: <span> ${HIGH24HOUR} </span>`;

  //     const $precioMasBajo24 = document.createElement("p");
  //     $precioMasBajo24.innerHTML = `Precio más bajo 24h: <span> ${LOW24HOUR} </span>`;

  //     const $variacion24 = document.createElement("p");
  //     $variacion24.innerHTML = `Variación 24h: <span> ${CHANGEPCT24HOUR}% </span>`;

  //     resultado.appendChild($precio);
  //     resultado.appendChild($precioMasAlto24);
  //     resultado.appendChild($precioMasBajo24);
  //     resultado.appendChild($variacion24);

  //     formulario.appendChild(resultado);
  //   });

  // Usando Async/Await
  try {
    const response = await fetch(url);
    const price = await response.json();
  
    // limpiar HTML
    cleanHTML();
  
    const { PRICE, HIGH24HOUR, CHANGEPCT24HOUR, LOW24HOUR } =
      price.DISPLAY[criptomoneda][moneda];
  
    const $precio = document.createElement("p");
    $precio.classList.add("precio");
    $precio.innerHTML = `Precio: <span> ${PRICE} </span>`;
  
    const $precioMasAlto24 = document.createElement("p");
    $precioMasAlto24.innerHTML = `Precio más alto 24h: <span> ${HIGH24HOUR} </span>`;
  
    const $precioMasBajo24 = document.createElement("p");
    $precioMasBajo24.innerHTML = `Precio más bajo 24h: <span> ${LOW24HOUR} </span>`;
  
    const $variacion24 = document.createElement("p");
    $variacion24.innerHTML = `Variación 24h: <span> ${CHANGEPCT24HOUR}% </span>`;
  
    resultado.appendChild($precio);
    resultado.appendChild($precioMasAlto24);
    resultado.appendChild($precioMasBajo24);
    resultado.appendChild($variacion24);
  
    formulario.appendChild(resultado);
  } catch (error) {
    console.log(error);
  }
}

// llena el objeto con el tipo de moneda y criptomoneda seleccionada
export function coinsSelect() {
  document.addEventListener("change", (e) => {
    if (e.target.matches("#criptomonedas") || e.target.matches("#moneda")) {
      searchObject[e.target.name] = e.target.value;
      // console.log(searchObject)
    }
  });
}

// funcion que muestra alerta, la usamos en la función formSubmit()
function showAlert(message) {
  // console.log(message);
  const errorClass = document.querySelector(".error");

  if (!errorClass) {
    const pWarning = document.createElement("P");
    pWarning.classList.add("error");
    pWarning.textContent = message;
    $formulario.appendChild(pWarning);

    setTimeout(() => {
      pWarning.remove();
    }, 2000);
  }
}

// función que limpia el html
function cleanHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function spinner() {
  cleanHTML();

  const $spinner = document.createElement("DIV");
  $spinner.classList.add("spinner");

  $spinner.innerHTML = `
    <div class="rect1"></div>
    <div class="rect2"></div>
    <div class="rect3"></div>
    <div class="rect4"></div>
    <div class="rect5"></div>
  `;

  resultado.appendChild($spinner);
}
