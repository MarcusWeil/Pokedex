// ** Variáveis e constantes
const pokemonData = document.querySelector('#pokemon-data')
const pokemonName = document.querySelector('.pokemon-name');
const pokemonId = document.querySelector('.pokemon-number');
const pokemonSprite = document.querySelector('#pokemon');
const space = document.querySelector('.space');
const prevBtn = document.querySelector('#prev-btn');
const NextBtn = document.querySelector('#next-btn');
const pokeField = document.querySelector('#search');
const pokeInput = document.querySelector(".poke-input");
const silhouetteImg = document.querySelector(".silhouetteImg");
const loading = document.querySelector("#loading");

let number = 1;
let CurrentPokemon = 1;
let click = false;



// ** Funções
//Define o que deve ser exibido ou não após receber os dados do Pokemon
const initValues = () => {
    loading.classList.add('hide');
    silhouetteImg.src = '';
    silhouetteImg.classList.add('hide');
    pokemonSprite.classList.remove('hide');
    pokemonData.classList.remove('hide');
    pokemonId.classList.remove('hide');
    space.classList.remove('hide');
    pokemonName.classList.remove('notFound');
    pokeInput.value = ''
}
//Gera um número aleatório que será usado pra buscar um Sprite
const randomNumber = () => {
    number = Math.floor(Math.random() * 100) + 1

    return number;
};
//Exibe o loading no HTML e esconde o nome atual do pokemon
const toggleLoading = () => {
    pokemonData.classList.add('hide');
    loading.classList.remove('hide');
}
//Função que converte uma imagem em uma silhuta
function silhouette(
) {
    //Oculto o Sprite atual
    pokemonSprite.classList.add('hide');
    //Obtenho o número a ser usado na busca abaixo
    randomNumber();
    pokemonSprite.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/${number}.png`

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext('2d');

    loadedImage = new Image();

    loadedImage.src = pokemonSprite.src;
    loadedImage.crossOrigin = "Anonymous";

    loadedImage.onload = function () {
        canvas.width = loadedImage.width;
        canvas.height = loadedImage.height;


        ctx.drawImage(loadedImage, 0, 0, canvas.width, canvas.height);


        let rawImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // Pra cada pixel encontrado através da altura e largura, será feito uma conversão
        for (let i = 0; i < rawImage.data.length; i += 4) {
            if (rawImage.data[i + 3] >= 100) {
                rawImage.data[i] = 30;
                rawImage.data[i + 1] = 30;
                rawImage.data[i + 2] = 30;
                rawImage.data[i + 3] = 255;
            } else {
                rawImage.data[i + 3] = 0;
            }
        }

        ctx.putImageData(rawImage, 0, 0);
        // Minha nova imagem convertida será exibida ao final da função
        silhouetteImg.src = canvas.toDataURL();
        silhouetteImg.classList.remove('hide');

        /* 
        Pra mais informações sobre a conversão acima, acessar 
        https://dominoc925.blogspot.com/2012/08/javascript-example-code-to-create.html ,
        o contexto utilizado é o mesmo, e um projeto que aplica isso na prática que usei de referência é este:
        https://github.com/Menardi/whosthatpokemon ; em index.ts na linha 821.
         https://gearoid.me/pokemon/
        
        */

    };
}



const getPokemonInfo = async (pokemon) => {

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (!click) {
        //Curto delay pra exibir o Loading
        const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));

        await waitFor(400);
    }

    if (res.status == 200) {
        const data = await res.json();
        return data
    } else {
        // pokeInput.value
    }



}

const showPokemonInfo = async (pokemon) => {

    toggleLoading()

    const info = await getPokemonInfo(pokemon);

    initValues();

    if (info) {
        let GifUrl = info["sprites"]["versions"]['generation-v']["black-white"]["animated"]["front_default"];
        let ImgUrl = info["sprites"]["versions"]['generation-v']["black-white"]["front_default"];
        let vanillaImg = info["sprites"]["front_default"];
        pokemonName.innerText = info.name;
        pokemonId.innerText = info.id;
        pokemonSprite.classList.remove("hide");
        CurrentPokemon = info.id
        pokemonSprite.src = (GifUrl != null) ? GifUrl : ImgUrl != null ? ImgUrl : vanillaImg
    } else {
        silhouette();
        pokemonName.classList.add('notFound');
        pokemonId.classList.add('hide');
        space.classList.add('hide');
        pokemonName.innerText = "Não encontrado!";

    }
}


// ** Eventos

pokeField.addEventListener('submit', (e) => {

    e.preventDefault()

    click = false;
    const pokemon = pokeInput.value.toLowerCase();
    showPokemonInfo(pokemon);

})
prevBtn.addEventListener('click', () => {
    if (CurrentPokemon > 1) {
        CurrentPokemon--
        click = true;
        showPokemonInfo(CurrentPokemon)
    }
})
NextBtn.addEventListener('click', () => {
    if (CurrentPokemon < 905) {
        CurrentPokemon++
        click = true;
        showPokemonInfo(CurrentPokemon)
    }
})

showPokemonInfo(CurrentPokemon)