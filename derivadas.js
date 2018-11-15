function vecinos(x0, y0, dataset, distancia, x, y)
{
    let neighbours = [];
    for(let i = 0; i < dataset.length; i++)
    {
        let r = ((dataset[i][y] - y0)**2+(dataset[i][x] - x0)**2)**(1/2);
        if(r != 0 && r<=distancia) neighbours.push(dataset[i]);
    }
    return neighbours;
}

// calcula la derivada
function primera_derivada(x0, y0, dataset, distancia, x, y)
{
    let neighbours = vecinos(x0, y0, dataset, distancia, x, y);
    if(neighbours.length == 0) return 0;
    let derivada = 0;
    let division = 0;
    for(let i = 0; i < neighbours.length; i++)
    {
        let deltax = neighbours[i][x] - x0;
        derivada += (neighbours[i][y] - y0)*(deltax);
        division += (deltax)**2;
    }
    if(division == 0) return 0; // Hay que preocuparse de los casos en que es infinito
    return derivada/division;
}

function segunda_derivada(x0, y0, dataset, distancia, x, y)
{
    let derivada = 0;
    let division = 0;
    let primera = primera_derivada(x0, y0, dataset, distancia, x, y);
    for(let i = 0; i < neighbours.length; i++)
    {
        let punto_der = primera_derivada(neighbours[i][x], neighbours[i][y],
                                         dataset, distancia, x, y);
        derivada += (punto_der - primera)*(neighbours[i][x] - x0);
        division += (neighbours[i][x] - x0)**2;
    }
    if (division == 0) return 0;
    return derivada/division;
}

function smoothness(dataset, distancia, x, y)
{
    let c=0
    for(let i=0; i<dataset.length; i++)
    {
        c += segunda_derivada(dataset[i][x], dataset[i][y], dataset, distancia, x, y);
    }
    return 1/c;
}

function streamline(x0, y0, dataset, distancia, x, y, limix, limsx, limy, deltax)
{
    let puntos = [{x:x0, y:y0}];
    let x1 = x0;
    let y1 = y0;
    let k1, k2, k3, k4;
    while(limix < x1 && x1< limsx && 0 < y1 && y1 < limy)
    {
        k1 = primera_derivada(x1, y1, dataset, distancia, x, y);
        k2 = primera_derivada(x1 + 0.5*deltax, y1 + 0.5 * k1, dataset, distancia, x, y);
        k3 = primera_derivada(x1 + 0.5*deltax, y1 + 0.5 * k2, dataset, distancia, x, y);
        k4 = primera_derivada(x1 + deltax, y1 + k3, dataset, distancia, x, y);
        x1 = x1 + deltax;
        y1 = y1 - (k1 + (2*k2 + 2*k3) + k4)/6;
        puntos.push({x:x1, y:y1});
    };

    x1 = x0;
    y1 = y0;
    
    while(limix < x1 && x1< limsx && 0 < y1 && y1 < limy)
    {
        k1 = deltax * primera_derivada(x1, y1, dataset, distancia, x, y);
        k2 = deltax * primera_derivada(x1 - 0.5*deltax, y1 - 0.5 * k1, dataset, distancia, x, y);
        k3 = deltax * primera_derivada(x1 - 0.5*deltax, y1 - 0.5 * k2, dataset, distancia, x, y);
        k4 = deltax * primera_derivada(x1 - deltax, y1 - k3, dataset, distancia, x, y);

        x1 = x1 - deltax;
        y1 = y1 + (k1 + (2*k2) + (2*k3) + k4)/6;
        puntos.unshift({x:x1, y:y1});
    };
    return puntos;
}