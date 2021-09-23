import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState(null);

  /**
   * GET
   * https://mmtwwfwgb4.execute-api.us-east-1.amazonaws.com/Stage/api/user
   *
   * POST
   * https://7n2bax69ee.execute-api.us-east-1.amazonaws.com/Dev/auth2/signup
   */

  const bodyRequest = {
    email: "wribeiro@hotmail.com",
    password: "wagner12345",
  };

  function sendPostRequest() {
    if (url != null) {
      setIsLoading(true);
      axios
        .post(url, bodyRequest)
        .then((res) => {
          setResponse(res);
          setError(null);
        })
        .catch((error) => {
          setResponse(null);
          setError(error);
        });
    } else {
      alert("Type your URL!");
    }
  }

  function sendGetRequest() {
    if (url != null) {
      setIsLoading(true);
      axios
        .get(url)
        .then((res) => {
          setResponse(res);
          setError(null);
        })
        .catch((error) => {
          setResponse(null);
          setError(error);
        });
    } else {
      alert("Type your URL!");
    }
  }

  function handleChange(e) {
    setUrl(e.target.value);
  }

  useEffect(() => {
    console.log(`Response:`);
    console.log(response);
    console.log(`Error:`);
    console.log(error);
    setIsLoading(false);
  }, [response, error]);

  return (
    <div style={{ padding: "10px" }}>
      <div>
        <h1> INPUT FIELD</h1>
        <input
          placeholder="Type your URL here"
          onChange={handleChange}
          value={url}
        />
      </div>
      <div>
        <h1> ACTIONS </h1>
        <button onClick={sendPostRequest}>SEND POST REQUEST</button>
        <button onClick={sendGetRequest}>SEND GET REQUEST</button>
      </div>
      {isLoading ? (
        <h3> loading... </h3>
      ) : (
        <div>
          <h1> RESPONSE </h1>
          {response ? (
            <div>
              <h3 style={{ color: "green" }}>
                response.status: {JSON.stringify(response?.status, null, 2)}
              </h3>
              <p style={{ color: "green" }}>
                response.data: {JSON.stringify(response?.data, null, 2)}
              </p>
              <p style={{ color: "green" }}>
                response: {JSON.stringify(response, null, 2)}
              </p>
            </div>
          ) : null}

          {error ? (
            <>
              <h3 style={{ color: "red" }}>
                error.message: {JSON.stringify(error.message, null, 2)}
              </h3>
              <p style={{ color: "red" }}>
                error: {JSON.stringify(error, null, 2)}
              </p>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
