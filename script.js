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

    //    addEventListenersToButtons();
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

            data_con.appendChild(klon);

        }
    })
}
