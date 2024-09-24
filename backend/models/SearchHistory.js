import mongoose from "mongoose";

const SearchHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  searchHistory: {
    type: [String], 
    validate: [arrayLimit, "Exceeds the limit of 5 searches"],
    default: [],
  },
});

function arrayLimit(val) {
  return val.length <= 5; 
}

const SearchHistoryModel = mongoose.model("SearchHistory", SearchHistorySchema);

export default SearchHistoryModel;
