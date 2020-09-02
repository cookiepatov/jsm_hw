function random(max, min=0)
{
    const diff=max-min
    return Math.ceil(Math.random()*diff)+min;
}


export default random;