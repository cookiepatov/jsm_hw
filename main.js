import Pokemon from "./pokemon.js"
import {removeControls, twoRandoms} from "./utils.js"
import {pokemons} from "./pokemons.js"
import Game from "./game.js"
const $reset=document.getElementById('btn-reset');
$reset.innerText="Перезапустить";

function StartGame()
{
    const r=twoRandoms(pokemons.length);
    const player1 = new Pokemon({
        ...pokemons[r[0]],
        selectors: 'player1'
    })
    
    const player2 = new Pokemon({
        ...pokemons[r[1]],
        selectors: 'player2'
    })
    
    const game = new Game([player1, player2]);
    game.renderAttacks(function(player){ //если передаётся персонаж - значит он умер, если 0 - значит нужна ответная атака от врага
        if(player)
        {
            game.charIsDead(player);
        }
        else if (player===0)
        {
            game.strikeBack();
        }        
    });
    game.hideEnemyControls();
    

}
$reset.addEventListener('click', function( )
{
    removeControls()
    StartGame();
})

StartGame();



