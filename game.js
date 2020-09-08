import {random, generateLog, counter, sorryMessage, writeToLog, disableControls} from "./utils.js"
import Button from "./button.js"

class Game
{
    constructor(players)
    {
        this.players=players;        
    }
    
    renderPlayerAttacks = (charIsDeadCb) =>
    {
        const player=this.players[0];
        const enemy=this.players[1];
        player.attacks.forEach(attack=>{
            const attackId=attack.id;
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            $btn.innerText = attack.name;
            player.elControl.appendChild($btn);
            const btn = new Button($btn,attack.maxCount);
            const cnt=counter(btn);
            $btn.addEventListener('click', async function( ){
                const {kick:{player1, player2}} = await getAttack(player.id,attackId,enemy.id);
                cnt();
                enemy.changeHP(player1, function(count, currentHealth){
                    writeToLog(generateLog(enemy,player,count));
                    if (currentHealth===0)
                    {
                        charIsDeadCb(enemy);
                    }
                    else
                    {
                        charIsDeadCb(player2);
                    }
                })

            })
        })
    }
    renderEnemyAttacks = (charIsDeadCb) =>
    {
        this.deleteEnemyControls();
        const player=this.players[0]
        const enemy=this.players[1]
        enemy.attacks.forEach(attack=>{
            const $btn = document.createElement('button');
            $btn.classList.add('button');
            $btn.innerText = attack.name;
            enemy.elControl.appendChild($btn);
            const btn = new Button($btn,attack.maxCount);
            const attackId=attack.id;
            const cnt=counter(btn);
            $btn.addEventListener('click', async function( ){
                cnt();
                player.changeHP(random(attack.maxDamage,attack.minDamage), function(count, currentHealth){
                    writeToLog(generateLog(player,enemy ,count));
                    if (currentHealth===0)
                    {
                        charIsDeadCb(player);
                    }
                    else
                    {
                        charIsDeadCb(0);
                    }
                })

            })
        })
    }
    changeEnemy = (enemy) =>
    {
        this.players[1]=enemy;
    }
    deleteEnemyControls = () =>
    {
        const control2=document.querySelectorAll('.control-player2 .button');
        control2.forEach(item =>item.remove());       
    }
    hideEnemyControls = () =>
    {
        const control2=document.querySelectorAll('.control-player2 .button');
        control2.forEach(item =>item.hidden=true);
    }
    strikeBack = (dmg, charIsDeadCb) =>
    {
  /*       const control2=document.querySelectorAll('.control-player2 .button');
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
        $randButton.click(); //клацаем по случайной активной кнопке */
        const player=this.players[0];
        const enemy=this.players[1];
        player.changeHP(dmg, function(count, currentHealth)
        {
            writeToLog(generateLog(enemy,player,dmg));
            if (currentHealth===0)
            {
                charIsDeadCb(player);
            }
        })
    }
    charIsDead = (player) =>
    {
        const text = sorryMessage(player.name);
        alert(text);
        writeToLog(text);
        disableControls();
    }
}
async function getAttack(p1,a1,p2)
{
    const response = await fetch(`https://reactmarathon-api.netlify.app/api/fight?player1id=${p1}&attackId=${a1}&player2id=${p2}`);
    const body = await response.json();
    return body;
}
async function getPokemon(id=0)
{
    let response
    if (id!=0){
        response = await fetch(`https://reactmarathon-api.netlify.app/api/pokemons?id=${id}`);
    }
    else{
        response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons?random=true');
    }
    const body = await response.json();
    return body;

    
}
export {Game, getPokemon}; 