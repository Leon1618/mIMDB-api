import React, { useState } from "react";

function App(props) {
  let { title } = props;
  let [count, setCount] = useState(0);
  let [search, setSearch] = useState("");
  let [data, setData] = useState(null); //null -> "loading" -> {}

  // function onHeadingClick() {
  //   console.log("The heading was clicked");
  //   setCount(count + 1);
  // }

  function onInputChange(event) {
    setSearch(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    setData("loading");

    let baseUrl = `http://omdbapi.com/`;
    let apiKey = `40557eb1`;
    let queryParams = `?apiKey=${apiKey}&t=${search}&plot=full`;
    let endpoint = baseUrl + queryParams;

    fetch(endpoint)
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        setData(res);
      });

    console.log(endpoint);
  }

  let markup = null;

  console.log(data);

  if (data === "loading") {
    markup = <h3>LOADING...</h3>;
  } else if (data !== null) {
    let { Title, Plot, Poster, Year } = data;
    console.log(Title, Plot, Poster);
    markup = (
      <div>
        <h3>Data has been returned:</h3>
        <h3>
          {Title} ({Year})
        </h3>
        <img src={Poster} />
        <p>{Plot}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{title}</h1>
      {/* <h1 onClick={onHeadingClick}>{title}</h1>
      <p>You have clicked {count} times</p> */}
      <form onSubmit={onSubmit}>
        <input
          onChange={onInputChange}
          type="text"
          placeholder="Type here"
          value={search}
        ></input>
        <button>Search</button>
      </form>
      {markup}
    </div>
  );
}

export default App;
