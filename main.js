import Pokemon from "./pokemon.js"
import {random} from "./utils.js"
import {pokemons} from "./pokemons.js"
import Game from "./game.js"

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


