import Pokemon from "./pokemon.js"
import {removeControls, twoRandoms} from "./utils.js"
import {Game, getPokemon} from "./game.js"
const $reset=document.getElementById('btn-reset');
const $changeEnemy=document.getElementById('btn-change-enemy');
$reset.innerText="Перезапустить";
$changeEnemy.innerText="Сменить противника";


async function StartGame()
{
    const pokemon1 = await getPokemon();
    const pokemon2 = await getPokemon();
    const pokemons= [pokemon1, pokemon2];
    const player1 = new Pokemon({
        ...pokemons[0],
        selectors: 'player1'
    })
    
    let player2 = new Pokemon({
        ...pokemons[1],
        selectors: 'player2'
    })
    
    const game = new Game([player1, player2]);
/*     game.renderEnemyAttacks(function(player){ //если передаётся персонаж - значит он умер
        if(player)
        {
            game.charIsDead(player);
        }     
    }); */
    game.renderPlayerAttacks(function(player){ //если передаётся персонаж - значит он умер, если 0 - значит нужна ответная атака от врага
        if(typeof(player)==='object')
        {
            game.charIsDead(player);
        }
        else
        {
            game.strikeBack(player, function(DeadPlayer)
            {
                game.charIsDead(DeadPlayer);
            });
        }        
    });


    game.hideEnemyControls();
    $changeEnemy.addEventListener('click', async function( ) //не работает как надо. Понимаю почему, не знаю как это исправить.
    {
        const pokemon2 = await getPokemon();
        player2 = new Pokemon({
            ...pokemon2,
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



