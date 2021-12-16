import express from 'express'
const app = express()
const port = 3000
import cors from 'cors'
/*import fetch from 'node-fetch'*/

app.use(cors());

function set_type(code){
    if([71, 73, 75, 77, 85, 86].includes(code)){
        return "ice";
    }
    if([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)){
        return "water";
    }
    if([45, 48].includes(code)){
        return "ghost";
    }
    if([95, 96, 99].includes(code)){
        return "electric";
    }
    if(code === 0){
        return "fire";
    }
    if([1, 2, 3].includes(code)){
        return "dark";
    }
}

app.get('/pokemon', (req, res) => {
    let type = "";
    if (Object.keys(req.query).length !== 0) {
        type = set_type(parseInt(req.query.meteo));
    } else {
        type = "normal";
    }
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
        .then(function(response) {
            console.log(response)
            return response.json();
        })
        .then(function(myPoke) {
            let poke = getRandomInt(myPoke.pokemon.length);
            fetch(`https://pokeapi.co/api/v2/pokemon/${myPoke.pokemon[poke].pokemon.name}/`).then(function(response) {
                console.log(response)
                return response.json();
            })
                .then(function(pokemon) {
                    let poke_id = pokemon.id
                    res.send(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke_id}.png`);
                });
        });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}
