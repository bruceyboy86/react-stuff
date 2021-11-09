import React, { useState, useEffect } from "react";
import axios from "axios";

const CallApi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [recipies, setRecipies] = useState(null);
  const [searchInput, setSearchInput] = useState("chicken soup");

  const Input = () => {
    return (
      <>
        <label for="recipie-search">Search for recipie</label>
        <input
          type="search"
          id="recipie-search"
          aria-label="Search through recipie content"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </>
    );
  };
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://yummly2.p.rapidapi.com/feeds/auto-complete",
      params: { q: searchInput },
      headers: {
        "x-rapidapi-host": "yummly2.p.rapidapi.com",
        "x-rapidapi-key": "653a66b57fmshb11b68509870fb5p19d6a9jsn7b2c99f2e949"
      }
    };

    setIsLoading(true);
    axios
      .request(options)
      .then((response) => setRecipies(response.data))
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [searchInput]);

  return (
    <>
      <Input />
      {isLoading && <span>spinner</span>}
      {!isLoading && hasError && <span>error</span>}
      {!isLoading && recipies && (
        <ul>
          {recipies.searches.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CallApi;
