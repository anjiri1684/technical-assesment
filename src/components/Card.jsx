import { useState, useEffect } from "react";
import axios from "axios";

const Card = () => {
  const [jokes, setJokes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await axios.get(
          "https://api.chucknorris.io/jokes/search?query=food"
        );
        setJokes(response.data.result);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch jokes");
        setLoading(false);
      }
    };

    fetchJokes();
  }, []);

  return (
    <div>
      <h1>Chuck Norris Food Jokes</h1>
      {loading && <p>Loading jokes...</p>}
      {error && <p>{error}</p>}

      <div className="food__container">
        {jokes.length > 0 &&
          jokes.map((joke) => (
            <section className="food__card" key={joke.id}>
              <div>
                <img
                  className="card__image"
                  src={joke.icon_url}
                  alt="Chuck Norris Icon"
                />
              </div>
              <div>
                <h2>Food Joke</h2>
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

export default Card;
