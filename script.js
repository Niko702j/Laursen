//Sørger for at alt DOM content er loaded
document.addEventListener("DOMContentLoaded", start);

//Opretter et tomt array til produkterne, og sætter filteret til at starte på alle.
let produkter = [];
let filter = "alle";

//Definerer at data_con er et HTML element med klassen .data_con
const data_con = document.querySelector(".data_con");

//Viser hen til vores JSON sheet
const endPoint = ("https://spreadsheets.google.com/feeds/list/1KlZEqdOHjQesQCn49xAxvVXjlMhofwxfEfwFhagRuKU/od6/public/values?alt=json");

//Definerer funktionen start, hvori vi kalder to nye funktioner.
function start() {
  loadData();
  addEventListenersToButtons();
}

//Definerer funktionen loadData, henter vores data ind fra JSON filen, og kalder funktionen visPordukter
async function loadData() {
  const response = await fetch(endPoint);
  produkter = await response.json();
  console.log(response);

  visProdukter();
}

//Definerer funktionen visProdukter, og starter ud med at fjerne alt innerHTML fra containeren.
function visProdukter() {
  data_con.innerHTML = "";

  const produktTemplate = document.querySelector("template");

  //Laver en funktion, der gælder for hvert produkt.
  produkter.feed.entry.forEach(produkt => {
    if (filter == "alle" || filter == produkt.gsx$kategori.$t) {
      const klon = produktTemplate.cloneNode(true).content;

      //Sætter produktbilleder ind
      klon.querySelector("img").src = `imgs/${produkt.gsx$billede.$t}.jpg`;

      //Tilføjer en eventlistener, der ved klik sender videre til en ny funktion, men beholder informationen om det pågældende produkt.
      klon.querySelector(".detalje").addEventListener("click", () => popup(produkt));

      data_con.appendChild(klon);
    }
  });
}

//Gør filter-knapperne klikbare
function addEventListenersToButtons() {

  document.querySelectorAll(".filter").forEach(elm => {
    elm.addEventListener("click", filtrering);
  });
}

//Opretter en filtrering, der kan sortere efter kategori, samt markere hvilken kategori der er valgt.
function filtrering() {
  console.log("filtrer");

  document.querySelectorAll(".filter").forEach(elm => {
    elm.classList.remove("button_active");
    console.log("remove button active");
  });

  filter = this.dataset.kategori;
  visProdukter();

  this.classList.add("button_active");
  console.log("add button active");

}



//Burger menu

const burger = document.querySelector("#burger");
const nav = document.querySelector(".burgermenu");
const kryds = document.querySelector("#kryds");


//Gør burgermenuknappen klikbar
burger.addEventListener("click", () => {
  nav.classList.add("burgermenu_active");
})

//Tilføjer en luk-funktion til burgermenuen
kryds.addEventListener("click", () => {
  console.log("kryds click")
  nav.classList.remove("burgermenu_active");
})



//popup

//Definerer popup funktionen, der bliver kaldt ved klik på produkt
function popup(produkt) {
  //Gør popup synlig
  document.querySelector("#popup").classList.remove("hide");

  //Gør resten af siden slørret
  document.querySelector("#bg_blur").classList.add("blur");

  //Sørger for at man kan lukke popup
  document.querySelector("#produkt_popup .luk").addEventListener("click", lukDetalje);

  //Definerer indholdet i popup
  document.querySelector("#produkt_popup img").src = `imgs/${produkt.gsx$billede.$t}.jpg`;
  document.querySelector("#poptxt h2").textContent = produkt.gsx$navn.$t;
  document.querySelector("#poptxt p:nth-child(2)").textContent = produkt.gsx$kategori.$t;
  document.querySelector("#poptxt p:nth-child(3)").textContent = produkt.gsx$kort.$t;
  document.querySelector("#poptxt p:nth-child(4)").textContent = produkt.gsx$pris.$t;
}

//Definerer luk-popup funktionen
function lukDetalje() {
  document.querySelector("#popup").classList.add("hide");
  document.querySelector("#bg_blur").classList.remove("blur");
}



//Scroll back up pil

//Peger på knappen
mybutton = document.getElementById("myBtn");

//Kalder på en funktion, der sker når brugeren scroller ned ad siden
window.onscroll = function () {
  scrollFunction()
};

//Definerer, at knappen skal vises når brugeren scroller 20px ned ad siden
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

//Definerer, at siden skal scrolle til top, når brugeren klikker på knappen.
function topFunction() {
  document.documentElement.scrollTop = 0;
}
