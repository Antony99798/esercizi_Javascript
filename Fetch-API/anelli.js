const input = document.querySelector(".search");
const cerca = document.getElementById("cerca");
const container = document.querySelector(".container");

const immagini = [
  { nome: "frodo baggins", img: "/signoredeglianelli/lordofring/frodo.jpg" },
  { nome: "samwise gamgee", img: "/signoredeglianelli/lordofring/sam.jpg" },
  { nome: "gandalf", img: "/signoredeglianelli/lordofring/gandalf.webp" },
  { nome: "bilbo baggins", img: "/signoredeglianelli/lordofring/bilbo.jpg" },
  { nome: "aragorn ii", img: "/signoredeglianelli/lordofring/aragon.jpg" },
  {
    nome: "meriadoc brandybuck",
    img: "/signoredeglianelli/lordofring/merry.avif",
  },
  { nome: "peregrin took", img: "/signoredeglianelli/lordofring/pippi.avif" },
  { nome: "legolas", img: "/signoredeglianelli/lordofring/legolas.jpg" },
  { nome: "gimli", img: "/signoredeglianelli/lordofring/gim.webp" },
  { nome: "boromir", img: "/signoredeglianelli/lordofring/boro.jpg" },
];

async function recuperaPersonaggio() {
  try {
    const data = await fetch(`https://lotrapi.co/api/v1/characters/`);
    const result = await data.json();

    const personaggio = result.results.find(
      (x) => x.name.toLowerCase() === input.value.toLowerCase()
    );

    if (!personaggio) {
      console.log("Personaggio non trovato!");
      return;
    }

    renderizzaCard(personaggio);
  } catch (error) {
    console.error("Errore nel recupero dati:", error);
  }
}

function renderizzaCard(personaggio) {
  container.innerHTML = "";

  const div = document.createElement("div");
  div.classList.add("card");

  const titolo = document.createElement("h1");
  const altezza = document.createElement("p");
  const capelli = document.createElement("p");
  const occhi = document.createElement("p");
  const arma = document.createElement("p");
  const imgs = document.createElement("img");
  const cont = document.createElement("div");
  cont.setAttribute("class", "container_img");
  const ximg = immagini.find(
    (x) => x.nome.toLowerCase() === personaggio.name.toLowerCase()
  );

  imgs.setAttribute("src", ximg.img);

  titolo.textContent = personaggio.name;
  altezza.textContent = `Altezza: ${personaggio.height}`;
  capelli.textContent = `Capelli: ${personaggio.hair_color}`;
  occhi.textContent = `Occhi: ${personaggio.eye_color}`;
  arma.textContent = `Armi: ${personaggio.weapons.join(", ")}`;

  div.appendChild(titolo);
  div.appendChild(imgs);
  div.appendChild(altezza);
  div.appendChild(capelli);
  div.appendChild(occhi);
  div.appendChild(arma);
  container.appendChild(cont);

  container.appendChild(div);
}

cerca.addEventListener("click", recuperaPersonaggio);
