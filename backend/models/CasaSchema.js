const {mongoose, Schema} = require("../database/mongo");

const MoradorSchema = require("./MoradorSchema")


const CasaSchema = new mongoose.Schema( {


  cep: {
    type: String,
    required: true,
  },
  cidade: {
    type: String,
    required: true,
  },
  logradouro: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: true,
  },
  complemento: {
    type: String,
    required: true,
  },

moradores: [
  {
    type:mongoose.Schema.Types.ObjectId,
    ref:"morador"
  }
]
});






module.exports = mongoose.model("casa",CasaSchema)