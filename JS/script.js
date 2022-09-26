// ** Variáveis e constantes
const pokemonName = document.querySelector('.pokemon-name');
const pokemonId = document.querySelector('.pokemon-number');
const pokemonSprite = document.querySelector('.pokemon');
const pokeField = document.querySelector('#search');
const pokeInput = document.querySelector(".poke-input");


// ** Funções
const getPokemonInfo = async (pokemon) => {

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (res.status == 200) {
        const data = await res.json();
        return data
    } else {
        console.log('erro');
    }



}

const showPokemonInfo = async (pokemon) => {

    const info = await getPokemonInfo(pokemon);

    if (info) {
        pokemonName.innerText = info.name;
        pokemonId.innerText = info.id;
        pokemonSprite.src = info["sprites"]["versions"]['generation-v']["black-white"]["animated"]["front_default"];
        pokeInput.value = ''
    }
}


// ** Eventos

pokeField.addEventListener('submit', (e) => {

    e.preventDefault()

    const pokemon = pokeInput.value.toLowerCase();
    showPokemonInfo(pokemon);

})