const express = require('express');
const router = express.Router();
let PokemonModel = require('../models/pokemon')
let CustomerModel = require('../models/customer')
const jwt = require('jsonwebtoken');


router.post('/handle_register', async function(req,res) {
    //const randomly_generated_id = nanoid(48)
    const email = req.body.email;
    const password = req.body.password;
    //let salted_hashed_pw = crypto.createHmac('sha256', password+''+email).digest('hex');
    try {
        let customerCreated = await CustomerModel.create({
            email: email,
            password: password,
        })
        console.log(customerCreated)
        res.status(200).json('ok')
    } catch (error) {
        console.log("error",error)
        res.json({error:error})
    }
})

router.post('/handle_login', async function(req,res) {
    const email = req.body.email
    const password = req.body.password;
  //let salted_hashed_pw = crypto.createHmac('sha256', password+''+email).digest('hex');
  let existing_customer = await CustomerModel.findOne({email: email})
  if(existing_customer) {
    const jwt_token = jwt.sign({email: email},'secret_jwt_word',{ expiresIn: '90d' });
    res.json(jwt_token)
  } else {
      console.log("customer not found")
      res.json({error:"customer not found"})
  }
})

// router.get('/top_secret_seed_route', async function(req,res) {
//     try {
//         await PokemonModel.create({
//             name: "bulbasaur",
//             number: 1
//         })
//         await PokemonModel.create({
//             name: "charmander",
//             number: 4
//         })
//         res.json({message: "added another bulbasaur + charmander to DB"})
//     } catch(error) {
//         res.json({error: 'error seeding'})
//     }
// })

router.post('/allPokemon', async function(req,res) {
    let jwt = req.body.jwt;
    // ADD A LINE OF CODE HERE so that we an verify the incoming jwt
    // hint: us ethe jwt verify method
    if (jwt) {
        try {
            let pokemonList = await PokemonModel.find({})
            res.json(pokemonList)
        } catch (err) {
            res.json({error: err})
        }
    } else {
        res.json({error: "no jwt"})
    }
})

module.exports = router;