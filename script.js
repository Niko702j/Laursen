//const googleid = "1KlZEqdOHjQesQCn49xAxvVXjlMhofwxfEfwFhagRuKU";
//const googleURL = "https://spreadsheets.google.com/feeds/list/" + googleid + "/od6/public/values?alt=json";


document.addEventListener("DOMContentLoaded", start);

let produkter = [];
let filter = "alle";

const data_con = document.querySelector(".data_con");

//const detalje = document.querySelector("#popup");

const endPoint = ("https://spreadsheets.google.com/feeds/list/1KlZEqdOHjQesQCn49xAxvVXjlMhofwxfEfwFhagRuKU/od6/public/values?alt=json");



function start() {
  loadData();

  addEventListenersToButtons();
}


async function loadData() {
  const response = await fetch(endPoint);
  produkter = await response.json();
  console.log(response);

  visProdukter();

}


function visProdukter() {
  data_con.innerHTML = "";

  const produktTemplate = document.querySelector("template");

  produkter.feed.entry.forEach(produkt => {
    if (filter == "alle" || filter == produkt.gsx$kategori.$t) {
      const klon = produktTemplate.cloneNode(true).content;

      klon.querySelector("img").src = `imgs/${produkt.gsx$billede.$t}.jpg`;

      klon.querySelector(".detalje").addEventListener("click", () => popup(produkt));

      data_con.appendChild(klon);

    }
  })
}

function addEventListenersToButtons() {

  document.querySelectorAll(".filter").forEach(elm => {
    elm.addEventListener("click", filtrering);
  })
}

function filtrering() {
  console.log("filtrer");

  document.querySelectorAll(".filter").forEach(elm => {
    elm.classList.remove("button_active");
  })

  filter = this.dataset.kategori;
  visProdukter();

  this.classList.add("button_active");

}

//Burger menu

const burger = document.querySelector("#burger");
const nav = document.querySelector(".burgermenu");
const kryds = document.querySelector("#kryds");



burger.addEventListener("click", () => {
  nav.classList.add("burgermenu_active");

})

kryds.addEventListener("click", () => {
  console.log("kryds click")
  nav.classList.remove("burgermenu_active");
})

//popup

function popup(produkt) {
  document.querySelector("#popup").classList.remove("hide");

  document.querySelector("#produkt_popup .luk").addEventListener("click", lukDetalje);

  document.querySelector("#produkt_popup img").src = `imgs/${produkt.gsx$billede.$t}.jpg`;
  document.querySelector("#produkt_popup h2").textContent = produkt.gsx$navn.$t;
  document.querySelector("#produkt_popup p:nth-child(3)").textContent = produkt.gsx$kategori.$t;
  document.querySelector("#produkt_popup p:nth-child(4)").textContent = produkt.gsx$kort.$t;
  document.querySelector("#produkt_popup p:nth-child(5)").textContent = produkt.gsx$pris.$t;
}


function lukDetalje() {
  document.querySelector("#popup").classList.add("hide");
}
