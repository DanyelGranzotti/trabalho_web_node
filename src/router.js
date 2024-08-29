const express = require("express");
const pokemonController = require("./controller/pokemonController");

const router = express.Router();

router.get("/pokemons", pokemonController.getAllPokemons);
router.get("/pokemons/:id", pokemonController.getPokemonById);
router.post("/pokemons", pokemonController.postPokemon);
router.put("/pokemons/:id", pokemonController.putPokemon);
router.delete("/pokemons/:id", pokemonController.deletePokemon);

module.exports = router;
