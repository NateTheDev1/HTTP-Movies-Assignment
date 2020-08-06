import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateMovie = ({ movieList }) => {
  const history = useHistory();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  const [formValues, setForm] = useState({
    title: "",
    director: "",
    metascore: "",
  });

  useEffect(() => {
    const foundMovie = movieList.filter((m) => {
      return parseInt(m.id) === parseInt(id);
    });
    console.log(id, movieList);
    if (foundMovie) {
      setMovie({ foundMovie });
      setLoading(false);
    }
  }, [movieList]);

  const handleChange = (e) => {
    setForm({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      id: movie.foundMovie[0].id,
      title: formValues.title,
      director: formValues.director,
      metascore: formValues.metascore,
      stars: movie.foundMovie[0].stars,
    };
    axios
      .put(`http://localhost:5000/api/movies/${id}`, updated)
      .then((res) => {
        setForm({
          title: "",
          director: "",
          metascore: "",
        });
        history.push("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Update {movie.title}</h1>
      <input
        type="text"
        value={formValues.title}
        name="title"
        placeholder="title"
        onChange={handleChange}
      />
      <input
        type="text"
        value={formValues.director}
        name="director"
        placeholder="director"
        onChange={handleChange}
      />
      <input
        type="number"
        value={formValues.metascore}
        name="metascore"
        placeholder="metascore"
        onChange={handleChange}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateMovie;
