const $btn1 = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-punch');




const character = 
{
    name: 'Pikachu',
    defaultHP: 200,
    damageHP: 200,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHP: renderHP,
    changeHP: changeHP,
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
    renderHPLife(this);
    renderProgressBar(this);
}

function renderHPLife(person)
{
    person.elHP.innerText = person.damageHP +' / '+person.defaultHP;
}

function renderProgressBar(person)
{
    person.elProgressbar.style.width = (person.damageHP/person.defaultHP)*100 + '%';
}

function changeHP(count)
{
    if (this.damageHP-count<0) 
    {
        this.damageHP=0;
        disableControls();
        alert(this.name+sorryMessage[random(sorryMessage.length)-1]);  
    }
    else
    {
        this.damageHP -=count;
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
