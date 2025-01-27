const $logs = document.querySelector('#logs');
function random(max, min=0)
{
    const diff=max-min
    return Math.ceil(Math.random()*diff)+min;
}

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
        pointer.innerText=defaultCaption+` [${left}/${limit}] `;
        if (left===0)
        {
            pointer.disabled=true;
        }
    }
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

function writeToLog (text)
{
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
/*      if($logs.children.length>8)
    {
        console.log("Длинный лог");

    } */
}


function disableControls() //Должно быть в классе Game
{
    const control1=document.querySelectorAll('.control-player1 .button');
    const control2=document.querySelectorAll('.control-player2 .button');
    control1.forEach(item =>item.disabled=true);
    control2.forEach(item =>item.disabled=true);
}
function removeControls() //Должно быть в классе Game
{
    const control1=document.querySelectorAll('.control-player1 .button');
    const control2=document.querySelectorAll('.control-player2 .button');
    control1.forEach(item =>item.remove());
    control2.forEach(item =>item.remove());
}
function twoRandoms(max)
{
    const r1=random(max)-1;
    let r2;
    do{
        r2=random(max)-1;        
    } while (r2===r1);
    const result=[r1, r2];
    return result;

}
export  {random, generateLog, counter, sorryMessage, writeToLog, disableControls, removeControls, twoRandoms};