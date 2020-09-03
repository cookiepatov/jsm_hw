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
        console.log(left+' нажатий осталось');
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


export  {random, generateLog, counter, sorryMessage};