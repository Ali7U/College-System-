import { useState } from "react";

function useFetch() {
  const [errMessage, setErrMessage] = useState(null);

  function sendHttpRequset(url: any, body:any) {
    fetch(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : null,
    })
      .then((res) => {
        const data = res.json();
        // action(data);
      })
      .catch((err) => {
        setErrMessage(err.message);
      });
  }
  return [errMessage, sendHttpRequset];
}

export default useFetch;
