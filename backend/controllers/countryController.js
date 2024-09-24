import FavoritesModel from "../models/Favorites.js";
import UserModel from "../models/User.js";
import SearchHistoryModel from "../models/SearchHistory.js";

class CountryController {
  static async getCountryCodes(req, res) {
    try {
      const countryCodes = await CountryCodeModel.find();
      res.status(200).json({ status: "success", data: countryCodes });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "failed", message: "Unable to fetch country codes" });
    }
  }

  static async addFavorite(req, res) {
    const { countryName } = req.body; // Get country name from request body
    const userId = req.user._id; // Extract user ID from the authenticated user

    try {
      // Retrieve the user to get the username (or any other user data if necessary)
      const user = await UserModel.findById(userId).select("name"); // Adjust fields as needed

      if (!user) {
        return res
          .status(404)
          .json({ status: "failed", message: "User not found" });
      }

      let favorites = await FavoritesModel.findOne({ userId });

      if (!favorites) {
        // Create a new favorites document if it doesn't exist
        favorites = new FavoritesModel({
          userId,
          username: user.name, // Use the user's name from the UserModel
          favorites: [countryName],
        });
      } else {
        // Update existing favorites document
        if (!favorites.favorites.includes(countryName)) {
          favorites.favorites.push(countryName);
        }
      }

      await favorites.save(); // Save the favorites document

      res.status(200).json({
        status: "success",
        message: "Country added to favorites",
        data: favorites,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "failed", message: "Unable to add favorite" });
    }
  }

  static async getFavorites(req, res) {
    const userId = req.user._id; // Extract user ID from the authenticated user

    try {
      // Retrieve favorites for the user
      const favorites = await FavoritesModel.findOne({ userId });

      if (!favorites) {
        return res
          .status(404)
          .json({ status: "failed", message: "Favorites not found" });
      }

      res.status(200).json({ status: "success", data: favorites });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "failed", message: "Unable to fetch favorites" });
    }
  }
  // Add a search to the user's search history
  static async addSearchHistory(req, res) {
    const { currencyCode } = req.body; // Get the search query (currency code)
    const userId = req.user._id; // Extract user ID from the authenticated user

    try {
      let searchHistory = await SearchHistoryModel.findOne({ userId });

      if (!searchHistory) {
        // Create a new search history document if it doesn't exist
        searchHistory = new SearchHistoryModel({
          userId,
          searchHistory: [currencyCode],
        });
      } else {
        // Update existing search history
        if (!searchHistory.searchHistory.includes(currencyCode)) {
          if (searchHistory.searchHistory.length >= 5) {
            searchHistory.searchHistory.shift();
          }
          searchHistory.searchHistory.push(currencyCode);
        }
      }

      await searchHistory.save(); 

      res.status(200).json({
        status: "success",
        message: "Search added to history",
        data: searchHistory,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "failed", message: "Unable to add search history" });
    }
  }

  // Get the search history for the logged-in user
  static async getSearchHistory(req, res) {
    const userId = req.user._id; 

    try {
      const searchHistory = await SearchHistoryModel.findOne({ userId });

      if (!searchHistory) {
        return res
          .status(404)
          .json({ status: "failed", message: "Search history not found" });
      }

      res.status(200).json({ status: "success", data: searchHistory });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ status: "failed", message: "Unable to fetch search history" });
    }
  }
}

export default CountryController;
