const div$$ = document.querySelector(".container");
const ol$$ = document.querySelector("#pokedex");
const input$$ = document.querySelector(".finder");
const btn$$ = document.querySelector(".btn");
const btnReset$$ = document.querySelector(".btnReset");
const olSearch$$ = document.querySelector("#searchPoke");
const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const allPoke = [];

const pokemonPet = async () =>  { 

    for (let i = 1; i <= 151; i++){    
    const pokemonApi = await fetch(`${baseUrl}${i}`);
    const pokeRes = await pokemonApi.json();
    allPoke.push(pokeRes);
    }
    printPokemons ();    
}
console.log(allPoke);   

const printPokemons = () => {
    for (const pokemon of allPoke){
        const li$$ = document.createElement('li');
        li$$.innerHTML = 
        `<h1 class="pokeName">${pokemon.name.toUpperCase()}</h1>
        <div class="divCards"><img src="${pokemon.sprites.other.dream_world.front_default}" class="image"/></div>
        <p><span>Id:</span> ${pokemon.id}</p>
        <p><span>Tipo:</span> ${pokemon.types[0].type.name.toUpperCase()}</p>  
        <p><span>Peso:</span> ${pokemon.weight/10} Kgs</p>`       
        ol$$.appendChild(li$$);       
    }    
}

btn$$.addEventListener("click", () => {search()});

const search = () => {     
    const finderPoke = allPoke.filter( poke => 
    poke.name.includes(input$$.value.toLowerCase()));
    ol$$.style.display ="none";  
    
    for (let i = 0; i < finderPoke.length; i++) {
        const pokemon = finderPoke[i];
        const li$$ = document.createElement('li');               
        li$$.innerHTML = 
        `<input class="btnDelete" type="submit" value="X">
        <h1 class="pokeName">${pokemon.name.toUpperCase()}</h1>
        <div class="divCards"><img src="${pokemon.sprites.other.dream_world.front_default}" class="image"/></div>
        <p><span>Id:</span> ${pokemon.id}</p>
        <p><span>Tipo:</span> ${pokemon.types[0].type.name.toUpperCase()}</p>
        <p><span>Peso:</span> ${pokemon.weight/10} Kgs</p>`                                      
        olSearch$$.appendChild(li$$);
        const deleteBtn$$ = document.querySelector(".btnDelete");
        deleteBtn$$.addEventListener("click", () => {deleteCard(deleteBtn$$, li$$)} );                             
    }       
}

const deleteCard = (param1, param2) => {
    param1.remove();
    param2.remove();
};

btnReset$$.addEventListener("click", () => {reset()});

const reset = () => {
    location.reload();
} 

pokemonPet();
