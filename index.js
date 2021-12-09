import express from 'express'
const app = express()
const port = 3000
import cors from 'cors'
/*import fetch from 'node-fetch'*/

app.use(cors());

const areas = [
    {
        name: 'Toulouse',
        lattitude :43.6044622,
        longitude :1.4442469,
        pokemon: ''
    },
    {
        name: 'Paris',
        lattitude :48.8534,
        longitude :2.3488,
        pokemon: ''
    },
    {
        name: 'Bordeaux',
        lattitude :44.841225,
        longitude :-0.5800364,
        pokemon: ''
    },
    {
        name: 'Lyon',
        lattitude :45.758,
        longitude :4.835,
        pokemon: ''
    },
    {
        name: 'Nantes',
        lattitude :47.239367,
        longitude :-1.555335,
        pokemon: ''
    },
    {
        name: 'Nice',
        lattitude :43.712854,
        longitude :7.253866,
        pokemon: ''
    },
    {
        name: 'Marseille',
        lattitude :43.282,
        longitude :5.405,
        pokemon: ''
    },
];

app.get('/pokemon', (req, res) => {
    let city = areas.find(element => (element.lattitude === parseFloat(req.query.lat) && element.longitude === parseFloat(req.query.long)));
    let id_poke = getRandomInt(898);
    city.pokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id_poke}.png`
    res.send(city);
    /*fetch(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id_poke}.png`)
        .then(function(response) {
            console.log(response)
            return response.blob();
        })
        .then(function(myPoke) {
            /!*const objectURL = URL.createObjectURL(myPoke);
            myImage.src = objectURL;*!/
            res.send(myPoke);
        });*/
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}
