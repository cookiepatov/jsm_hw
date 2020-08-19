function checkForLetters(inp) //проверка на наличие посторонних символов после первого
{
    for (let i=1; i<=inp.length; i++)
    {
        if (!isNumber(inp.charAt(i)))
        {
            console.log("один из символов не цифра")
            return true
        }
        else
        {
            return false
        }
        
    }
}
function isNumber(char) //проверка на цифру
{
    for (let i=0; i<10; ++i)
    {
        if (char==i)
        {
            return true
        }
    }
    console.log(char+" не цифра")
    return false
}
function formattedPhone(inp)
{
    let result=""
    if (inp.length!=12||checkForLetters(inp)||inp.charAt(0)!="+") //проверка на длину, наличие "+" в начале и посторонние символы
    {
        return "Некорректный ввод"
    }
    for (let i=0; i<=inp.length; i++)
    if (i===2)
    {
        result+=" ("+inp.charAt(i)
    }
    else if (i===4)
    {
        result+=inp.charAt(i)+") "
    }
    else if (i===8)
    {
        result+="-"+inp.charAt(i)
    }
    else if (i===9)
    {
        result+=inp.charAt(i)+"-"
    }
    else
    {
        result+=inp.charAt(i)
    }
    return result

}
alert(formattedPhone(prompt("Введите номер телефона","+xxxxxxxxxxx")))