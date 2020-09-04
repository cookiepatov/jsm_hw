import {random, generateLog, counter, sorryMessage, writeToLog, deleteControls} from "./utils.js"
import Button from "./button.js"

class Game
{
    constructor(players)
    {
        this.players=players;
        this.renderattacks();
    }
    renderattacks = () =>
    {
        console.log(this);
        this.players.forEach(player=>{
            let attacker; //какой то стрёмный момент тут, но не могу придумать как это сделать нормально
            let defender; 
            if (player===this.players[0])
            {
                attacker=this.players[0];
                defender=this.players[1];
            }
            else
            {
                attacker=this.players[1];
                defender=this.players[0];
            }
            player.attacks.forEach(attack=>{
                const $btn = document.createElement('button');
                $btn.classList.add('button');
                $btn.innerText = attack.name;
                player.elControl.appendChild($btn);
                const btn = new Button($btn,attack.maxCount);
                const cnt=counter(btn);
                $btn.addEventListener('click', function( )
                {
                    cnt();
                    defender.changeHP(random(attack.maxDamage,attack.minDamage), function(count, currentHealth){
                        writeToLog(generateLog(defender, attacker, count))
                        if (currentHealth===0)
                        {
                            charIsDead(defender); //сначала прописал эту ф-цию внутри класса, но тогда не получалось её отсюда вызвать 
                        }
                    })


                })
            })
        })
    }
}

function charIsDead(player) 
{
    const text = sorryMessage(player.name); //должна быть внутри класса
    alert(text);
    writeToLog(text);
    deleteControls();

}


export default Game; 