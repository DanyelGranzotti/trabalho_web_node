const pokemonModel = require("../models/pokemon");

const getAllPokemons = async (_req, res) => {
  try {
    const pokemons = await pokemonModel.find({});
    res.status(200).send(pokemons);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const getPokemonById = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await pokemonModel.find({ id: id });
    if (!pokemon) {
      return res.status(404).send({ message: "Pokémon não encontrado" });
    }
    res.send(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const postPokemon = async (req, res) => {
  const { name, number, pokemon_type, image } = req.body;
  try {
    const pokemon = new pokemonModel({ name, number, pokemon_type, image });
    await pokemon.save();
    res.status(201).send(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const putPokemon = async (req, res) => {
  const { id } = req.params;
  const { name, number, pokemon_type, image } = req.body;
  try {
    const pokemon = await pokemonModel.findByIdAndUpdate(
      id,
      { name, number, pokemon_type, image },
      { new: true }
    );
    if (!pokemon) {
      return res.status(404).send({ message: "Pokémon não encontrado" });
    }
    res.status(200).send(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const deletePokemon = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await pokemonModel.findByIdAndDelete(id);
    if (!pokemon) {
      return res.status(404).send({ message: "Pokémon não encontrado" });
    }
    res.status(200).send(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

module.exports = {
  getAllPokemons,
  getPokemonById,
  postPokemon,
  putPokemon,
  deletePokemon,
};
