import Pokemon from "./pokemon.js"
import {random, generateLog, counter, sorryMessage} from "./utils.js"
import Button from "./button.js"
import {pokemons} from "./pokemons.js"
const $logs = document.querySelector('#logs');
const $control = document.querySelector('.control');


const pl1 = pokemons[random(pokemons.length)-1];
const pl2 = pokemons[random(pokemons.length)-1];

function $getElById(el)
{
    return document.getElementById(el);
}

function SetImage(player,pic)
{
    const $elImg = $getElById(`img-player${player}`);
    $elImg.src =pic;

}

function SetName(player,name)
{
    const $elName = $getElById(`name-player${player}`);
    $elName.innerText = name;
}

function init() //хрень. Естественно надо убирать в класс Game
{
    SetImage(1,player1.img);
    SetImage(2,player2.img);
    SetName(1,player1.name);
    SetName(2,player2.name);
}


const player1 = new Pokemon({
    ...pl1,
    selectors: 'player1'
})

const player2 = new Pokemon({
    ...pl2,
    selectors: 'player2'
})





player1.attacks.forEach(item=>
{
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = item.name;
    $control.appendChild($btn);
    const btn = new Button($btn,item.maxCount)
    const cnt=counter(btn);
    $btn.addEventListener('click', function( )
    {
        cnt();
        player2.changeHP(random(item.maxDamage,item.minDamage), function(count, currentHealth){
            writeToLog(generateLog(player2, player1, count))
            if (currentHealth===0)
            {
                charIsDead(player2);
            }
        })
        const randattack=player2.attacks[random(player2.attacks.length)-1]
        player1.changeHP(random(randattack.maxDamage,randattack.minDamage), function(count, currentHealth){
            writeToLog(generateLog(player1, player2, count))
            if (currentHealth===0)
            {
                charIsDead(player1);
            }
        })      
    })
    
})



function charIsDead(player) //функция вызываемая в случае смерти персонажа
{
    const text = sorryMessage(player.name);
    alert(text);
    writeToLog(text);
    disableControls()

}



function disableControls()
{
    const controls=document.querySelectorAll('.control .button')
    controls.forEach(item =>item.disabled=true);
}

function writeToLog(text)
{
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
}

init();