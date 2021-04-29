////////////////////////////////////////////////////////////////
// Primera consigna

//declaramos los arreglos vacíos
let arreglo = [];
let arregloFinal = [];

//declaramos la variable url de la api
let url = "https://pokeapi.co/api/v2/pokemon/";

//rellenamos el primer arreglo con números aleatorios del 1 al 100
for (let i = 1; i <= 10; i++) {
    let nuevo = Math.floor(Math.random() * 809);
    arreglo.push(nuevo);
}

//tomamos tres números aleatorios del primer arreglo
for(let i = 1; i <= 3; i++){
    let aleatorio = Math.floor(Math.random()*10);

    //vamos rellenando el segundo arreglo
    arregloFinal.push(arreglo[aleatorio]);
    
}

//declaramos los tres fetch para establecer la conexión
const promise1 = fetch("https://pokeapi.co/api/v2/pokemon/" + arregloFinal[0] + "/") 
const promise2 = fetch("https://pokeapi.co/api/v2/pokemon/" + arregloFinal[1] + "/")
const promise3 = fetch("https://pokeapi.co/api/v2/pokemon/" + arregloFinal[2] + "/")

//Hacemos la carrera de promesas
Promise.race([promise1, promise2, promise3])
    .then( pokemon => pokemon.json())
    .then((pokemon) => renderPokemons(pokemon))

//la función que va a contener la data y enviarla al html
function renderPokemons(pokemon) {
      // Crear elementos HTML
      const container = document.createElement("div");
      const title = document.createElement("h2");
      const sprite = document.createElement("img");
      // Agregar atributos
      title.textContent = pokemon.name + " #" + pokemon.id;
      sprite.src = pokemon.sprites.front_default;
      // Agregar al container
      container.appendChild(title);
      container.appendChild(sprite);
      // Agregar al container principal
      document.getElementById("row").appendChild(container);
};

////////////////////////////////////////////////////////////////
// Segunda consigna

//declaramos los arreglos vacíos
let arreglo2 = [];
let arregloFinal2 = [];
let row2 = document.getElementById("row2");

//rellenamos el primer arreglo con números aleatorios del 1 al 100
function armarArreglo() {
    //armamos posiciones numéricas del arreglo
    for (let i = 1; i <= 9; i++) {
        let nuevo = Math.floor(Math.random() * 809);
        arreglo2.push(nuevo);
    }

    //armamos posición string del arreglo
    arreglo2.push("Error");
}

//LLamamos a la función para armar el primer arreglo de donde tomar las posiciones
armarArreglo();

//tomamos tres números aleatorios del primer arreglo y armamos el segundo
for(let i = 1; i <= 3; i++){
    //armamos el número aleatorio para elegir la posición del primer arreglo
    let aleatorio = Math.floor(Math.random()*10);
    //vamos rellenando el segundo arreglo
    arregloFinal2.push(arreglo2[aleatorio]);
}

//vemos el segundo arreglo
console.log(arregloFinal2);


//función para reject en promises
function ErrorNum(){
    let text = document.createElement("p");
    text.textContent = "Error: Pokemon inexistente";
    row2.appendChild(text);
}


//declaramos los primeros fetch para establecer la conexión
let promise4 = new Promise((resolve, reject) => {
    //guardamos el contenido de la primera posición del array
    var poke = arregloFinal2[0];
     //validamos si esta posición del array contiene un número
    if(typeof poke === "number") {
        resolve (fetch("https://pokeapi.co/api/v2/pokemon/" + arregloFinal2[0] + "/")); 
    } else {
        reject(ErrorNum());
    }
});
let promise5 = new Promise((resolve, reject) => {
    //guardamos el contenido de la segunda posición del array
    var poke = arregloFinal2[1];
    //validamos si esta posición del array contiene un número
    if(typeof poke === "number") {
        resolve(fetch("https://pokeapi.co/api/v2/pokemon/" + arregloFinal2[1] + "/")); 
    } else {
        reject(ErrorNum());
    }
});
let promise6 = new Promise((resolve, reject) => {
    //guardamos el contenido de la tercera posición del array
    var poke = arregloFinal2[2];
    //validamos si esta posición del array contiene un número
    if(typeof poke === "number") {
        resolve(fetch("https://pokeapi.co/api/v2/pokemon/" + arregloFinal2[2] + "/")); 
    } else {
        reject(ErrorNum());
    }
});



//Hacemos la cadena de promesas

//primera promesa
promise4.then((pokemon2) => {
        return pokemon2.json();
    }).then((pokemon2) => {
        renderPokemons2(pokemon2);
        return promise5; //devuelve segunda promesa
    })

    //segunda promesa
    .then((pokemon3) => {
        return pokemon3.json();
    }).then((pokemon3) => {
        renderPokemons2(pokemon3);
        return promise6; //devuelve tercera promesa
    })

    //tercera promesa
    .then((pokemon4) => {
        return pokemon4.json();
    }).then((pokemon4) => {
        renderPokemons2(pokemon4);
    })
    .catch((err) => {
        console.log("Pokemon no encontrado: " + err);
    });

/*
Promise.all([promise4, promise5, promise6])
    .then(([pokemonA, pokemonB, pokemonC]) => Promise.all([pokemonA.json(), pokemonB.json(), pokemonC.json()]))
    .then(([pokemonA, pokemonB, pokemonC]) => renderPokemons([pokemonA, pokemonB, pokemonC]))
    .catch((err) => {
        console.log(err);
    }); */

//la función que va a contener la data y enviarla al html
function renderPokemons2(pokemon) {
      // Crear elementos HTML
      const container = document.createElement("div");
      const title = document.createElement("h2");
      const sprite = document.createElement("img");
      // Agregar atributos
      title.textContent = pokemon.name + " #" + pokemon.id;
      sprite.src = pokemon.sprites.front_default;
      // Agregar al container
      container.appendChild(title);
      container.appendChild(sprite);
      // Agregar al container principal
      row2.appendChild(container);
};

////////////////////////////////////////////////////////////////
// Tercera consigna

//Declaramos los inputs, el boton search, el contenedor y el arreglo vacío a usar
let inputsId = document.getElementsByClassName('search');
let search_btn = document.querySelector('.btn_search');
let row3 = document.getElementById("row3");
let arreglo3 = [];


//Tomamos el evento clic del botón de búsqueda para empezar a tomar los datos
search_btn.addEventListener('click', function (event) {

    //Convertimos en array el HTMLCollection de los inputs
    Array.prototype.forEach.call(inputsId, (inputsId)=> {

    //En caso de que el contenido de cada input no sea un número y esté vacío
    if (isNaN(inputsId.value) || inputsId.value === "") {
        //Tiramos un alert con mensaje de error
        alert("Error, por favor ingrese un número");
    }
    //En caso contrario, sumamos cada contenido al array nuevo
    else {
        arreglo3.push(inputsId.value);
    }
})

    //Validamos que haya quedado el arreglo armado en consola
    console.log(arreglo3);

    //Declaramos las promesas 
//declaramos los primeros fetch para establecer la conexión
let promise7 = fetch("https://pokeapi.co/api/v2/pokemon/" + arreglo3[0] + "/");
let promise8 = fetch("https://pokeapi.co/api/v2/pokemon/" + arreglo3[1] + "/");
let promise9 = fetch("https://pokeapi.co/api/v2/pokemon/" + arreglo3[2] + "/");

    //De a una promesa, las enviamos al HTML como pokemons
    //primera promesa
promise7.then((pokemon3) => {
    return pokemon3.json();
}).then((pokemon3) => {
    renderPokemons3(pokemon3);
    return promise8; //devuelve segunda promesa
})

//segunda promesa
.then((pokemon3) => {
    return pokemon3.json();
}).then((pokemon3) => {
    renderPokemons3(pokemon3);
    return promise9; //devuelve tercera promesa
})

//tercera promesa
.then((pokemon3) => {
    return pokemon3.json();
}).then((pokemon3) => {
    renderPokemons3(pokemon3);
})
/* .catch((err) => {
    console.log("Pokemon no encontrado: " + err);
}); */
});


//Función con la que enviamos al HTML los contenidos para ser mostrados
    function renderPokemons3(pokemon3) {
        
        // Crear elementos HTML
        const container = document.createElement("div");
        const title = document.createElement("h2");
        const sprite = document.createElement("img");
        
        // Agregar atributos
        title.textContent = pokemon3.name + " #" + pokemon3.id;
        sprite.src = pokemon3.sprites.front_default;
        
        // Agregar al container
        container.appendChild(title);
        container.appendChild(sprite);
        
        // Agregar al container principal
        row3.appendChild(container);
    };