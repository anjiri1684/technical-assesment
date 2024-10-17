import { useState, useEffect } from "react";
import axios from "axios";

const ChuckNorrisJokes = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [foodQuery, setFoodQuery] = useState("burger");

  const foodCategories = [
    "animal",
    "career",
    "celebrity",
    "dev",
    "explicit",
    "fashion",
    "food",
    "history",
    "money",
    "movie",
    "music",
    "political",
    "religion",
    "science",
    "sport",
    "travel",
  ];

  const fetchJokes = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `https://api.chucknorris.io/jokes/search?query=${query}`
      );
      setJokes(response.data.result);
    } catch (error) {
      setError(error.message);
      setError("Failed to fetch jokes");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJokes(foodQuery);
  }, [foodQuery]);

  return (
    <div>
      <h1 className="food_title">Chuck Norris Food Jokes</h1>

      <div className="food__buttons">
        {foodCategories.map((food) => (
          <button
            key={food}
            className={`food__button ${food === foodQuery ? "active" : ""}`}
            onClick={() => setFoodQuery(food)}
          >
            {food.charAt(0).toUpperCase() + food.slice(1)}
          </button>
        ))}
      </div>

      {loading && <p>Loading jokes...</p>}
      {error && <p>{error}</p>}

      <div className="food__container">
        {jokes.length > 0 &&
          jokes.map((joke) => (
            <section className="food__card" key={joke.id}>
              <img src={joke.icon_url} alt="Chuck Norris Icon" />
              <div>
                <h2>
                  {foodQuery.charAt(0).toUpperCase() + foodQuery.slice(1)} Joke
                </h2>
                <p>
                  Date Created: {new Date(joke.created_at).toLocaleDateString()}
                </p>
                <p>Joke ID: {joke.id}</p>
                <p>
                  Last Updated: {new Date(joke.updated_at).toLocaleDateString()}
                </p>
                <p>{joke.value}</p>
              </div>
            </section>
          ))}
      </div>
    </div>
  );
};

export default ChuckNorrisJokes;
