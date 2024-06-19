import mongoose from 'mongoose';

const { Schema } = mongoose;

const AiGenerateSchemma = new Schema({
  prompt: { type :String, required :true },
  photo: { type :String, required :true },
});

const AiGenerate = mongoose.model('AiGenerate', AiGenerateSchemma);

export default AiGenerate;
