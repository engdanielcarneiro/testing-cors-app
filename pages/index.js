import Head from "next/head";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const bodyRequest = {
    email: "wribeiro@hotmail.com",
    password: "wagner12345",
  };

  function sendPostRequest() {
    setIsLoading(true);
    axios
      .post(
        "https://7n2bax69ee.execute-api.us-east-1.amazonaws.com/Dev/auth2/login",
        bodyRequest
      )
      .then((res) => {
        setResponse(res);
        setError(null);
      })
      .catch((error) => {
        setResponse(null);
        setError(error);
      });
  }

  function sendGetRequest() {
    setIsLoading(true);
    axios
      .get(
        "https://mmtwwfwgb4.execute-api.us-east-1.amazonaws.com/Stage/api/user"
      )
      .then((res) => {
        setResponse(res);
        setError(null);
      })
      .catch((error) => {
        setResponse(null);
        setError(error);
      });
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
      {isLoading ? <h3> loading... </h3> : null}
      <button onClick={sendPostRequest}>SEND REQUEST</button>
      <p> response.status: {JSON.stringify(response?.status, null, 2)}</p>
      <p> response.data: {JSON.stringify(response?.data, null, 2)}</p>
      <p> response: {JSON.stringify(response, null, 2)}</p>
      <p> error: {JSON.stringify(error, null, 2)}</p>
    </div>
  );
}
