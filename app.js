let boton = document.querySelector("button");
let inputMaster = document.querySelector("input");
let temperatura = document.querySelector("#temperatura");
let wicon = document.querySelector("#wicon");
let descripcion = document.querySelector("#descripcion");
let eventos = ["click", "keypress"];
boton.addEventListener("click", cargarCiudad);

function cargarCiudad(event) {
  console.log(inputMaster.value.length);
  if (inputMaster.value.length < 1) {
    return alert("No has ingresado una ciudad, escriba una ciudad");
  }
  let ciudad = inputMaster.value;
  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    ciudad +
    "&lang=es&appid=95176c8edea30e33338e0eaddd53a916&units=metric";
  document.querySelector("#ciudad").textContent = ciudad;
  document.querySelector(".container").style.visibility = "visible";
  $.getJSON(url, function (data) {
    temperatura.innerHTML = `${data.main.temp}<sup>°C</sup>`;
    let icon = data.weather[0].icon;
    let imgUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    wicon.setAttribute("src", imgUrl);
    descripcion.textContent = data.weather[0].description;
  }).fail(function (event) {
    document.querySelector(".container").style.visibility = "hidden";
    if (event.responseJSON.cod == 400) {
      alert("No has ingresado una ciudad, escriba una ciudad");
    }
    if (event.responseJSON.cod == 404) {
      alert("Ciudad no encontrada");
    }
  });
  inputMaster.value = "";
}
