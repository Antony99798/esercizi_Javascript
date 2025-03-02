const input = document.getElementById("pokemon");
const btn = document.getElementById("btn");
const btnOrder = document.getElementById("btn-order");
const selectType = document.getElementById("sel");
const inputType = document.getElementById("type");
const btnType = document.getElementById("btn-type");
const container = document.querySelector(".container");
let database = [];
const btnload = document.createElement("button");
btnload.innerText = "carica altro";
let offset = 0;
const limit = 20;

function colorePerTipo(type) {
  const tipoColore = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };

  return tipoColore[type];
}

//innerhtml, per svuotare il contenitore per mostrare i nuovi dati
// ogni volta che viene chiamata la funzione la svuota

async function recuperaPokemon(nome) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${nome}`);
    const result = await data.json();
    database.push(result);
    renderizzaDati(database);
    // container.innerHTML = "";
  } catch (error) {
    console.error(error);
  }
}
async function recuperaTipi(tipo) {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/type/${tipo}`);
    const result = await data.json();
    const pokeLista = result.pokemon.map((x) => x.pokemon.name);
    database = [];
    pokeLista.forEach((x) => recuperaPokemon(x));
    //container.innerHTML = "";
  } catch (error) {
    console.error(error);
  }
}
function orderPokemon(array) {
  array.sort((a, b) => a.name.localeCompare(b.name)); ///aggiunto localcompare sort in base ai valori di unicode tipo qwerty, localcompare in base alla lingua
  renderizzaDati(database);
}

async function fetchpokemon() {
  try {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const result = await data.json();
    result.results.forEach((x) => recuperaPokemon(x.name));
    document.body.appendChild(btnload);
    offset += 20;
  } catch (error) {
    console.log(error);
  }
}

fetchpokemon();

async function selezionaTipi() {
  try {
    const data = await fetch(`https://pokeapi.co/api/v2/type/`);
    const result = await data.json();
    result.results.forEach((x) => {
      const option = document.createElement("option");
      option.value = x.name;
      option.innerHTML = x.name;
      selectType.appendChild(option);
    });
  } catch (error) {
    console.error(error);
  }
}
selezionaTipi();

async function opzioni() {
  try {
    const option = selectType.value;
    recuperaTipi(option);
  } catch (error) {
    console.log(error);
  }
}
function renderizzaDati(pokemons) {
  container.innerHTML = "";

  pokemons.forEach((pokemon) => {
    const div = document.createElement("div");
    div.classList.add("card");
    const h1 = document.createElement("h1");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const container = document.querySelector(".container");
    const types = pokemon.types.map((x) => x.type.name);
    const immagine = pokemon.sprites.front_default;
    const name = pokemon.name;
    h1.textContent = name;
    img.setAttribute("src", immagine);
    p.textContent = types.join(", ");
     div.style.backgroundColor = colorePerTipo(types[0]);
    div.appendChild(h1);
    div.appendChild(img);
    div.appendChild(p);
    container.appendChild(div);
  });
}

btn.addEventListener("click", () => {
  const nome = input.value;
  recuperaPokemon(nome);
});
btnType.addEventListener("click", () => {
  const tipo = inputType.value;
  recuperaTipi(tipo);
});
btnOrder.addEventListener("click", () => {
  orderPokemon(database);
});

selectType.addEventListener("change", opzioni);

btnload.addEventListener("click", fetchpokemon);
