import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user', // Ensure this matches the model name exactly
  },
  username: {
    type: String,
    required: true,
  },
  favorites: {
    type: [String], 
    default: [],
  },
}, { timestamps: true }); 

const FavoritesModel = mongoose.model('Favorites', favoriteSchema);

export default FavoritesModel;
