function vecinos(punto, dataset, distancia)
{
    let neighbours = [];
    for(let i = 0; i < dataset.length; i++)
    {
        let r = ((dataset[i].y - punto.y)**2+(dataset[i].x - punto.x)**2)**(1);
        if(r<=distancia) neighbours.push(dataset[i]);
    }
    return neighbours;
}

// recibe los vecinos y calcula la derivada
function primera_derivada(punto, neighbours)
{
    let derivada = 0;
    let division = 0;
    for(let i = 0; i < neighbours.length; i++)
    {
        let deltax = neighbours[i].x - punto.x;
        derivada += (neighbours[i].y - punto.y)*(deltax);
        division += (deltax)**2;
    }
    return derivada/division;
}

function segunda_derivada(punto, dataset, distancia)
{
    let derivada = 0;
    let division = 0;
    let neighbours = vecinos(punto, dataset, distancia)
    let primera = primera_derivada(punto, neighbours);
    for(let i = 0; i < neighbours.length; i++)
    {
        let punto_der = primera_derivada(neighbours[i], vecinos(neighbours[i], dataset, distancia);
        derivada += (punto_der - primera)*(neighbours[i].x - punto.x);
        division += (neighbours[i].x - punto.x)**2;
    }
    return derivada/division;
}

function smoothness(dataset, distancia)
{
    let c=0
    for(let i=0; i<dataset.length; i++)
    {
        c += segunda_derivada(dataset[i], dataset, distancia);
    }
    return 1/c;
}