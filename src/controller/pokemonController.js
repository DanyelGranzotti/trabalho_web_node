const pokemonModel = require("../models/pokemon");

const getAllPokemons = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const pokemons = await pokemonModel.find({}).skip(skip).limit(limit);

    const total = await pokemonModel.countDocuments({});

    res.status(200).send({
      pokemons,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPokemons: total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: error.message });
  }
};

const getPokemonById = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemon = await pokemonModel.find({ _id: id });
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
