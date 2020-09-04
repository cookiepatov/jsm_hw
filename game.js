import {random, generateLog, counter, sorryMessage, writeToLog, disableControls} from "./utils.js"
import Button from "./button.js"

class Game
{
    constructor(players)
    {
        this.players=players;        
    }
    renderAttacks = (charIsDeadCb) =>
    {
        this.players.forEach(player=>{
            let attacker; //какой то стрёмный момент тут, но не могу придумать как это сделать нормально
            let defender;
            let mode; //0 - удар наносит игрок, 1 - противник. 1 в целом не нужен, но на всякий случай оставил
            if (player===this.players[0])
            {
                attacker=this.players[0];
                defender=this.players[1];
                mode=0;
            }
            else
            {
                attacker=this.players[1];
                defender=this.players[0];
                mode=1;
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
                        console.log(defender);
                        console.log(count);
                        writeToLog(generateLog(defender, attacker, count))
                        if (currentHealth===0)
                        {
                            charIsDeadCb(defender); 
                        }
                        else if(mode===0) // не очень красиво. Смысл в том, что если никто не умер и удар наносит игрок - то у нас вызывается пустой коллбэк
                        {
                            charIsDeadCb(0);
                        }

                    })


                })
            })
        })
    }
    hideEnemyControls = () =>
    {
        const control2=document.querySelectorAll('.control-player2 .button');
        control2.forEach(item =>item.hidden=true);
    }
    strikeBack = () =>
    {
        console.log("Ответочка");
        const control2=document.querySelectorAll('.control-player2 .button');
        let i=0;
        do { //в этом цикле перебираем все кнопки и удаляем из массива неактивные, которые израсходовали лимит
            if(control2[i].disabled)
            {
                control2.splice(i,1);
            }
            i++
        } while (i<control2.length);
        const $randButton=control2[random(control2.length)-1]
        console.log($randButton.innerText);
        $randButton.click(); //клацаем по случайной активной кнопке
    }
    charIsDead = (player) =>
    {
        const text = sorryMessage(player.name);
        alert(text);
        writeToLog(text);
        disableControls();
    }
}

export default Game; 