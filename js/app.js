import { checkCrypto } from "./api.js";
import { coinsSelect, formSubmit } from "./eventos.js";

document.addEventListener("DOMContentLoaded", () => {
  checkCrypto();
  formSubmit();
  coinsSelect();
});
