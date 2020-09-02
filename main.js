import Pokemon from "./pokemon.js"
import random from "./utils.js"
import Button from "./button.js"
const $logs = document.querySelector('#logs');
const countAllClicks=counter()
const $btn1 = $getElById('btn-kick');
const $btn2 = $getElById('btn-punch');

function $getElById(el)
{
    return document.getElementById(el);
}

const player1 = new Pokemon({
    name: 'Pickachu',
    type: 'Electric',
    hp: 300,
    selectors: 'character'
})

const player2 = new Pokemon({
    name: 'Charmander',
    type: 'Fire',
    hp: 400,
    selectors: 'enemy'
})

const btn1 = new Button($btn1,20);
const btn2 = new Button($btn2,5);


const countBtn1=counter(btn1);
const countBtn2=counter(btn2);

function charIsDead(player) //функция вызываемая в случае смерти персонажа
{
    disableControls();
    const text = sorryMessage(player.name);
    alert(text);
    writeToLog(text);

}

function sorryMessage(name) //рандомное сообщение при смерти персонажа
{

    const sorryText =
    [
    ' не выдержал издевательств!',
    ' покинул чат.',
    ' ушёл, но обещал вернуться.',
    ' помер.',
    ' хотел дружить, а его убили :(',
    ' не думал что всё так закончится!',
    ' погиб как герой!',
    ' уже на пути в покемонью вальгаллу!',
    ' был наказан судьбой.',
    ' был смертельно ранен пластиковым стаканчиком.'
    ]
    return name+sorryText[random(sorryText.length)-1]
};

function generateLog(reciever, giver, damage)
{
const {name, hp:{current, total}}=reciever;
const {name: nameSecond}=giver;
const logs = [
    `${name} вспомнил что-то важное, но неожиданно ${nameSecond}, не помня себя от испуга, ударил в предплечье врага.`,
    `${name} поперхнулся, и за это ${nameSecond} с испугу приложил прямой удар коленом в лоб врага.`,
    `${name} забылся, но в это время наглый ${nameSecond}, приняв волевое решение, неслышно подойдя сзади, ударил.`,
    `${name} пришел в себя, но неожиданно ${nameSecond} случайно нанес мощнейший удар.`,
    `${name} поперхнулся, но в это время ${nameSecond} нехотя раздробил кулаком \<вырезанно цензурой\> противника.`,
    `${name} удивился, а ${nameSecond} пошатнувшись влепил подлый удар.`,
    `${name} высморкался, но неожиданно ${nameSecond} провел дробящий удар.`,
    `${name} пошатнулся, и внезапно наглый ${nameSecond} беспричинно ударил в ногу противника`,
    `${name} расстроился, как вдруг, неожиданно ${nameSecond} случайно влепил стопой в живот соперника.`,
    `${name} пытался что-то сказать, но вдруг, неожиданно ${nameSecond} со скуки, разбил бровь сопернику.`
];
return logs[random(logs.length)-1]+`\n-${damage}, [${current}/${total}]`;
}

$btn1.addEventListener('click', function( )
{
    player1.changeHP(random(20, 10), function(count, currentHealth){ //добавил в коллбэк здоровье персонажа, который получает урон, чтобы отследить его смерть
        writeToLog(generateLog(player1, player2, count))
        if (currentHealth===0)
        {
            charIsDead(player1);
        }      
    })
    player2.changeHP(random(20, 10), function(count, currentHealth){
        writeToLog(generateLog(player2, player1, count))
        if (currentHealth===0)
        {
            charIsDead(player2);
        }   
    });
    countAllClicks();
    countBtn1(btn1);
});

$btn2.addEventListener('click', function( )
{
    player2.changeHP(random(40,20), function(count, currentHealth){
        writeToLog(generateLog(player2, player1, count))
        if (currentHealth===0)
        {
            charIsDead(player2);
        }   
    });
    countAllClicks();
    countBtn2(btn2);
});

function disableControls()
{
    $btn1.disabled = true;
    $btn2.disabled = true;
}


function writeToLog(text)
{
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
}

function counter(btn)
{
    let i=0;
    
    return function ()
    {
        i++;
        if (btn===undefined) // если объект кнопка не передаётся - то у нас просто счётчик кликов
        {
            console.log(i);
            return;
        }
        const {limit, defaultCaption, pointer}=btn;
        const left=limit-i;
        console.log(left+' нажатий осталось');
        pointer.innerText=defaultCaption+` [${left}/${limit}] `;
        if (left===0)
        {
            pointer.disabled=true;
        }
    }
}
