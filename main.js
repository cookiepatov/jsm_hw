import Pokemon from "./pokemon.js"
import {random, deleteControls} from "./utils.js"
import {pokemons} from "./pokemons.js"
import Game from "./game.js"
const $reset=document.getElementById('btn-reset');
$reset.innerText="Перезапустить"
function StartGame()
{
    let player1 = new Pokemon({
        ...pokemons[random(pokemons.length)-1],
        selectors: 'player1'
    })
    
    let player2 = new Pokemon({
        ...pokemons[random(pokemons.length)-1],
        selectors: 'player2'
    })
    
    const game = new Game([player1, player2]);
}
StartGame();

$reset.addEventListener('click', function( ){
    deleteControls();
    StartGame();
})

