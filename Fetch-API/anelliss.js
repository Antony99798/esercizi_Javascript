const input = document.querySelector(".search");
const cerca = document.getElementById("cerca");

async function recuperaPersonaggio() {
  try {
    const data = await fetch(`https://lotrapi.co/api/v1/characters/`);
    const result = await data.json();
    const personaggio = result.results.find((x) => {
      return x.name.toLowerCase() === input.value.toLowerCase();
    });
    renderizzaCard(personaggio);
    return personaggio;
  } catch (error) {
    console.log(error);
  }
}

function renderizzaCard(personaggio) {
  const container = document.querySelector(".container");
  const div = document.createElement("div");
  div.classList.add("card");
  const h1 = document.createElement("h1");
  const altezza = document.createElement("p");
  const capelli = document.createElement("p");
  const occhi = document.createElement("p");
  const arma = document.createElement("p");
  h1.textContent = personaggio.name;
  altezza.textContent = personaggio.height;
  capelli.textContent = personaggio.hair_color;
  occhi.textContent = personaggio.eye_color;
  arma.textContent = personaggio.weapons.join(", ");
  div.appendChild(h1);
  div.appendChild(altezza);
  div.appendChild(capelli);
  div.appendChild(occhi);
  div.appendChild(arma);
  container.appendChild(div);
}

cerca.addEventListener("click", recuperaPersonaggio);
