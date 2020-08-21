const $btn1 = document.getElementById('btn-kick');
const $btn2 = document.getElementById('btn-punch');

const character = 
{
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
}

const enemy = 
{
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
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
    changeHP(random(20), enemy);
    changeHP(random(20), character);
});

$btn2.addEventListener('click', function( )
{
    changeHP(random(40), enemy);
});


function init()
{
    renderHP(character);
    renderHP(enemy);
}

function renderHP(person)
{
    renderHPLife(person);
    renderProgressBar(person);
}

function renderHPLife(person)
{
    person.elHP.innerText = person.damageHP +' / '+person.defaultHP;
}

function renderProgressBar(person)
{
    person.elProgressbar.style.width = person.damageHP + '%';
}

function changeHP(count, person)
{
    if (person.damageHP-count<0) 
    {
        person.damageHP=0;
        disableControls();
        alert(person.name+sorryMessage[random(sorryMessage.length)-1]);  
    }
    else
    {
        person.damageHP -=count;
    }
    renderHP(person)
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
