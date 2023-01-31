import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listMovie, setListMovie] = useState([]);
  const [searchData, setSearchData] = useState('');
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/search/movie?api_key=97f1bd616b51e07825e04a855aaeed30&query=$%7Bspider%7D"
      )
      .then((response) => setListMovie(response.data.results));
  }, []);

  const checkInfo = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=97f1bd616b51e07825e04a855aaeed30&query=$%7B${searchData}%7D`
      )
      .then((response) => setListMovie(response.data.results));
      document.getElementById('myinput').value = '';
  };
  const handleChange = (e) => {
    setSearchData(e.target.value);
  }
  const firstPart = 'https://image.tmdb.org/t/p/w500/'
  const elementMovie = listMovie.map((movie, index) => {
    return (
      <div key={movie.id} className='movies'>
        <img src={firstPart+ movie.poster_path} />
        <div>Name: {movie.original_title} </div>
      </div>
    );
  });
  return (
    <div className="App">
      <section className="products">
        <div className="section-title">
          <h2>search for movie</h2>
          <input type="input" id="myinput" placeholder="search for movie" onChange={handleChange}/>
          <button id="mybtn" onClick={checkInfo}>
            search
          </button>
          <h2>List Movie</h2>
          <div>
            <div className="listMovie">
              {elementMovie}
            </div>
          </div>
        </div>
        <div className="products-center" />
      </section>
      <div className="cart-overlay">
        <div className="cart">
          <span className="close-cart">
            <i className="far fa-window-close" />
          </span>
          <h2>Your cart</h2>
          <div className="cart-content" />
        </div>
      </div>
    </div>
  );
}

export default App;
