
const $btn1 = $getElById('btn-kick');
const $btn2 = $getElById('btn-punch');
const $logs = document.querySelector('#logs');
const countAllClicks=counter()

function $getElById(el)
{
    return document.getElementById(el);
}


const btn1 =  //объект кнопка
{
    pointer: $btn1, //с указателем на саму кнопку,
    defaultCaption: $btn1.innerText, //текстом, который там первоначально забит,
    limit: 20, //лимитом нажатий
    renderButtonLimits: renderButtonLimits //и функцией который этот лимит первоначально прописывает в innerText

}

const btn2 =
{
    pointer: $btn2,
    defaultCaption: $btn2.innerText,
    limit: 5,
    renderButtonLimits: renderButtonLimits

}

const countBtn1=counter(btn1);
const countBtn2=counter(btn2);


const character = 
{
    name: 'Pikachu',
    defaultHP: 200,
    damageHP: 200,
    elHP: $getElById('health-character'),
    elProgressbar: $getElById('progressbar-character'),
    renderHP: renderHP,
    changeHP: changeHP,
    renderHPLife: renderHPLife,
    renderProgressBar: renderProgressBar,
    sorryMessage: sorryMessage,


}

const enemy = 
{
    name: 'Charmander',
    defaultHP: 250,
    damageHP: 250,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHP: renderHP,
    changeHP: changeHP,
    renderHPLife: renderHPLife,
    renderProgressBar: renderProgressBar,
    sorryMessage: sorryMessage,
}

function sorryMessage() {
    
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
return this.name+sorryText[random(sorryText.length)-1]
}
;

function generateLog(reciever, giver, damage)
{
const {name, damageHP, defaultHP}=reciever;
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
return logs[random(logs.length)-1]+`\n-${damage}, [${damageHP}/${defaultHP}]`;
}
$btn1.addEventListener('click', function( )
{
    enemy.changeHP(random(20));
    character.changeHP(random(20));
    countAllClicks();
    countBtn1(btn1);
});

$btn2.addEventListener('click', function( )
{
    enemy.changeHP(random(40));
    countAllClicks();
    countBtn2(btn2);
});


function init()
{
    character.renderHP();
    enemy.renderHP();
    btn1.renderButtonLimits();
    btn2.renderButtonLimits();
}

function renderButtonLimits()
{
    const {pointer, limit, defaultCaption} = this;
    pointer.innerText=defaultCaption+` [${limit}/${limit}] `;
}

function renderHP()
{
    this.renderHPLife();
    this.renderProgressBar();
}

function renderHPLife()
{
    const {damageHP, defaultHP} =this;
    this.elHP.innerText = damageHP +' / '+defaultHP;
}

function renderProgressBar()
{
    const {damageHP, defaultHP} =this;
    this.elProgressbar.style.width = (damageHP/defaultHP)*100 + '%';
}

function changeHP(count)
{
    this.damageHP -=count;
    const logText= this === enemy ? generateLog(this, character, count) :generateLog(this, enemy, count);
    writeToLog(logText);
    if (this.damageHP-count<=0) 
    {
        this.damageHP=0;
        disableControls();
        const mes=this.sorryMessage()
        alert(mes);
        writeToLog(mes);
    }
    this.renderHP()
}

function random(MaxNum)
{
    return Math.ceil(Math.random()*MaxNum);
}

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
    return function (btn)
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
        pointer.innerText=defaultCaption+` [${limit-i}/${limit}] `;
        if (left===0)
        {
            pointer.disabled=true;
        }
            
        
        
    }
}


init();
