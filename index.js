const baseURL = "https://pokeapi.co/api/v2/pokemon/"

const div = document.getElementById("div");

const traerPokemones = async () => {
try {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
  const data = await response.json()
  const array = data.results.map((poke) => 
    fetch(poke.url).then((res) => res.json())
  );
  const resultados = await Promise.all(array)
  mapearPokemones(resultados);
} catch (err) {
    console.log(err);
}
}

const mapearPokemones = (resultados) => {
    const html = resultados
    .map(
        (pokemon) =>
        `<p styles="display: flex; justift-content: center; align-items: center;">
         <img src="${pokemon.sprites.front_default}"
         <h2> ${pokemon.name} </h2>
         <h3> ${pokemon.height} </h3>
         <h3> ${pokemon.weight} </h3>
        </p>'
        `
    ).join('')
    div.innerHTML = html;
}

const buscarPokemones = async () => {
    const input = document.getElementById('input');
    const pokemon = input.value.toLowerCase();
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await res.json();
        const html =
      `
      <div> 
      <div class="info-cards">
        <img src="${data.sprites.front_default}"
        </div>
        <div>
        <h2> Nombre: ${data.name} </h2>
        </div>
        <div class="tipo">
        <h3> Tipo: ${data.types[0].type.name} </h3>
        </div>
        <div>
        <h4> Altura: ${data.height/10}m</h4>
        </div>
        <div>
        <h5> Peso: ${data.weight/10}Kg</h5>
        </div>
       </div>
       `
       div.innerHTML = html;
    } catch (error) {
        console.log(error);
    }
}

const btn = document.getElementById('btn');
btn.addEventListener('click', buscarPokemones)

// traerPokemones()