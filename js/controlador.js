//API de StarWars: https://swapi.dev/

//fetch conectar con apis externas
//fetch devuelve una promesa, necesita url y el metodo (GET-obtener o POST-enviar), devuelve el resolve
//primero ejecuto fetch (me conecta con el servidor) y segundo json

//https://swapi.dev/api/people/?page=2


//get All devuelve una lista de objetos
async function getAll(pUrl) {
    let url = pUrl;
    let peticion = await fetch(url, { method: 'GET' }); //promesa
    if (peticion.status == 200) {
        let json = await peticion.json(); //promesa
        console.log(json); //consola page : next - previous
        //console.log(json.results); //consola : objeto -> results
        let pagenext = json.next;
        let pageprev = json.previous;
        printResults(json.results, pageprev, pagenext);
    }
}

getAll('https://swapi.dev/api/people/?page=1');

//getOne devuelve un objeto
async function getOne(pUrl, pType = "people") {
    //console.log con el objeto personaje y sus datos
    let peticion = await fetch(pUrl, { method: 'GET' }); //promesa
    if (peticion.status == 200) {
        let json = await peticion.json(); //promesa
        //console.log(json);
        if (pType == "people") {
            printCharacter(json);
        } else {
            printFilm(json);
        }
    }
}
