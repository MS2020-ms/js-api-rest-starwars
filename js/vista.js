let ulPersonajes = document.querySelector('#personajes');
let sectionPersonaje = document.querySelector('#vistaPersonaje');
let btnNext = document.querySelector('.botones div:last-child');
let btnPrev = document.querySelector('.botones div:first-child');


function printResults(pCharacterList, pPagePrev, pPageNext) {
    //borrar los anteriores al click siguientes
    ulPersonajes.innerHTML = "";

    for (let character of pCharacterList) {
        let li = document.createElement('li');
        let characterName = document.createTextNode(character.name); //name buscar en la API

        li.dataset.url = character.url;
        li.addEventListener('click', getInfoCharacter);

        li.appendChild(characterName);
        ulPersonajes.appendChild(li);
    }

    btnPrev.dataset.page = pPagePrev;
    btnNext.dataset.page = pPageNext;

    //cuando no haya pagina anterior -> boton prev no se vea.
    //cuando no haya pagina posterior -> boton next no se vea.
    console.log(pPagePrev, pPageNext);

    /*  equivalente: if (pPagePrev != null) {
        btnPrev.style.display = "block";
    } else {
        btnPrev.style.display = "none";
    }*/

    btnPrev.style.display = (pPagePrev) ? "block" : "none";
    btnNext.style.display = (pPageNext) ? "block" : "none";

    btnPrev.addEventListener('click', goPage);
    btnNext.addEventListener('click', goPage);
}

function goPage(event) {
    getAll(event.target.dataset.page);
}

//---Fin del getAll
//---Inicio del getOne

function getInfoCharacter(event) {
    //necesito recoger la url y mandarsela a getOne()
    getOne(event.target.dataset.url);
}

function printCharacter(pObjectCharacter) {
    sectionPersonaje.innerHTML = `<h2>${pObjectCharacter.name}</h2>
                        <ul>
                            <li>Altura: ${pObjectCharacter.height}</li>
                            <li>Peso: ${pObjectCharacter.mass}</li>
                            <li>Color de la piel: ${pObjectCharacter.skin_color}</li>
                            <li>Color de pelo: ${pObjectCharacter.hair_color}</li>
                            <li>Genero: ${pObjectCharacter.gender}</li>
                            <li>Año de nacimiento: ${pObjectCharacter.birth_year}</li>
                        </ul>
                        <h2>Peliculas donde aparece</h2>
                        <div id="peliculas"></div>`

    const films = pObjectCharacter.films;
    for (film of films) {
        console.log(film);
        getOne(film, 'film')
    }
}


function printFilm(pObjectFilm) {
    let divFilm = document.querySelector('#peliculas');
    divFilm.innerHTML += `<article>
                            <h3>${pObjectFilm.title}</h3>
                            <ul>
                                <li>Capitulo: ${pObjectFilm.episode_id}</li>
                                <li>Director: ${pObjectFilm.director}</li>
                                <li>Año: ${pObjectFilm.release_date}</li>
                            </ul>
                          </article>`
}