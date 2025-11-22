const { mongoose } = require("../database/mongo");

const MoradorSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },

  cpf:{
    type: String,
    required: true,
  },
  data_nascimento: {
    type: Date,
    required: true,
  },
  sexo: {
    type: String,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
  },
  proprietario_casa: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("morador", MoradorSchema);
