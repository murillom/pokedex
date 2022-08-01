const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const sound = document.querySelector('.sound');

let searchPokemon = 1;
const bip = new Audio('./audio/beep.mp3');
const backgroundMusic = new Audio('./audio/littleroot town.mp3');
let musicaLigada = false;

backgroundMusic.volume = 0.1;

const fetchPokemon = async (pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data
    }
}

const renderPokemon = async (pokemon) => {

    pokemon.innerHTML = 'Carregando...';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white'].animated['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = "Não encontrado :C"
        pokemonNumber.innerHTML = '';
        pokemonImage.style.display = 'none';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', (event) => {
    if(searchPokemon > 1) {
        bip.play();
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    }
});

buttonNext.addEventListener('click', (event) => {
    bip.play();
    searchPokemon += 1;
    renderPokemon(searchPokemon)
});

sound.addEventListener('click', (event) => {
    if(!musicaLigada) {
        backgroundMusic.play();
        backgroundMusic.loop = true;
        musicaLigada = true;
        sound.src = './favicons/soundon.png';
    } else {
        backgroundMusic.pause();
        musicaLigada = false;
        sound.src = './favicons/soundoff.png';
    }
})

renderPokemon(searchPokemon);