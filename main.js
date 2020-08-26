function $getElById(el)
{
    return document.getElementById(el);
}
const $btn1 = $getElById('btn-kick');
const $btn2 = $getElById('btn-punch');




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
}

const sorryMessage =
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



$btn1.addEventListener('click', function( )
{
    enemy.changeHP(random(20));
    character.changeHP(random(20));
});

$btn2.addEventListener('click', function( )
{
    enemy.changeHP(random(40));
});


function init()
{
    character.renderHP();
    enemy.renderHP();
}

function renderHP()
{
    this.renderHPLife();
    this.renderProgressBar();
}

function renderHPLife()
{
    this.elHP.innerText = this.damageHP +' / '+this.defaultHP;
}

function renderProgressBar()
{
    this.elProgressbar.style.width = (this.damageHP/this.defaultHP)*100 + '%';
}

function changeHP(count)
{
    this.damageHP -=count;
    if (this.damageHP-count<=0) 
    {
        this.damageHP=0;
        disableControls();
        alert(this.name+sorryMessage[random(sorryMessage.length)-1]);  
    }
    this.renderHP()
}

function random(num)
{
    return Math.ceil(Math.random()*num);
}

function disableControls()
{
    $btn1.disabled = true;
    $btn2.disabled = true;
}

init();
