import React, { useState, useEffect } from "react";
import axios from "axios";

const CallApi = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [recipies, setRecipies] = useState(null);

  const options = {
    method: "GET",
    url: "https://yummly2.p.rapidapi.com/feeds/auto-complete",
    params: { q: "chicken soup" },
    headers: {
      "x-rapidapi-host": "yummly2.p.rapidapi.com",
      "x-rapidapi-key": "653a66b57fmshb11b68509870fb5p19d6a9jsn7b2c99f2e949"
    }
  };

  useEffect(() => {
    function fetchData() {
      setIsLoading(true);
      axios
        .request(options)
        .then((response) => setRecipies(response.data))
        .catch(() => setHasError(true))
        .finally(() => setIsLoading(false));
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading && <span>spinner</span>}
      {!isLoading && hasError && <span>error</span>}
      {!isLoading && recipies && (
        <ul>
          {recipies.searches.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CallApi;
