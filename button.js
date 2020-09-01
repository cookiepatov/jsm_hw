class Button //класс кнопка, с указателем на саму кнопку, лимитом нажатий и первоначальным текстом
{
    constructor(pointer,limit)
    {
        this.pointer=pointer;
        this.defaultCaption=pointer.innerText;
        this.limit=limit;
        this.renderButtonLimits();
        
    }
    renderButtonLimits = () => //функция которая при создании объекта прописывает в кнопку максимальный лимит
    {
        const {pointer, limit, defaultCaption} = this;
        pointer.innerText=defaultCaption+` [${limit}/${limit}] `;
    }    
}

export default Button; 