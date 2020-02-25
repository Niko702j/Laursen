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
        console.log("remove button active");
    })

    filter = this.dataset.kategori;
    visProdukter();

    this.classList.add("button_active");
    console.log("add button active");

}



//Burger menuuu

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

    document.querySelector("#bg_blur").classList.add("blur");

    document.querySelector("#produkt_popup .luk").addEventListener("click", lukDetalje);

    document.querySelector("#produkt_popup img").src = `imgs/${produkt.gsx$billede.$t}.jpg`;
    document.querySelector("#poptxt h2").textContent = produkt.gsx$navn.$t;
    document.querySelector("#poptxt p:nth-child(2)").textContent = produkt.gsx$kategori.$t;
    document.querySelector("#poptxt p:nth-child(3)").textContent = produkt.gsx$kort.$t;
    document.querySelector("#poptxt p:nth-child(4)").textContent = produkt.gsx$pris.$t;
}


function lukDetalje() {
    document.querySelector("#popup").classList.add("hide");
    document.querySelector("#bg_blur").classList.remove("blur");
}








//Scroll back up pil

//Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
