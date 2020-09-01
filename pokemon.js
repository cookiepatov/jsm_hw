class Selectors
{
    constructor (name)
    {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
    }
}
class Pokemon extends Selectors
{
    constructor({name, hp, type, selectors})
    {
        super(selectors);
        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.renderHP();

    }
    changeHP= (count, cb) =>
{
    this.hp.current -=count;
    if (this.hp.current-count<=0) 
    {
        this.hp.current=0;
    }
    this.renderHP();
    cb(count, this.hp.current);
}
    renderHP = () =>
    {
        this.renderHPLife();
        this.renderProgressBar();
    }
    
    renderHPLife = () =>
    {
        const {elHP, hp:{current, total}} =this;
        elHP.innerText = current +' / '+total;
    }
    
    renderProgressBar = () =>
    {
        const {elProgressbar, hp:{current, total}} =this;
        elProgressbar.style.width = (current/total)*100 + '%';
    }





}






export default Pokemon; 