import Pokemon from "./pokemon.js"
import {removeControls, twoRandoms} from "./utils.js"
import {pokemons} from "./pokemons.js"
import Game from "./game.js"
const $reset=document.getElementById('btn-reset');
const $changeEnemy=document.getElementById('btn-change-enemy');
$reset.innerText="Перезапустить";
$changeEnemy.innerText="Сменить противника";

function StartGame()
{
    const r=twoRandoms(pokemons.length);
    const player1 = new Pokemon({
        ...pokemons[r[0]],
        selectors: 'player1'
    })
    
    let player2 = new Pokemon({
        ...pokemons[r[1]],
        selectors: 'player2'
    })
    
    const game = new Game([player1, player2]);
    game.renderEnemyAttacks(function(player){ //если передаётся персонаж - значит он умер
        if(player)
        {
            game.charIsDead(player);
        }     
    });
    game.renderPlayerAttacks(function(player){ //если передаётся персонаж - значит он умер, если 0 - значит нужна ответная атака от врага
        if(player)
        {
            game.charIsDead(player);
        }
        else
        {
            game.strikeBack();
        }        
    });


    game.hideEnemyControls();
    $changeEnemy.addEventListener('click', function( ) //не работает как надо. Понимаю почему, не знаю как это исправить.
    {
        const r=twoRandoms(pokemons.length);
        player2 = new Pokemon({
            ...pokemons[r[0]],
            selectors: 'player2'
        })
        game.changeEnemy(player2);
    })
    

}
$reset.addEventListener('click', function( )
{
    removeControls();
    StartGame();
})

StartGame();



