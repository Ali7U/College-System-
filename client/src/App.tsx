import "./App.css";
// import Router from "./components/Router";
import { useState, useMemo, useRef, useEffect } from "react";
import useFetch from "./lib/useFetch";
import Hey from "./components/Hey";
import Router from "./components/Router";

function App() {
// const {data, isLoading, err} = useFetch("http://localhost:3003/course/find_All");



//   useEffect(() => {
//   data
// }, [data]);
  // console.log(data);
  return (
    <>
      {/* {err && <div>{err}</div>}
      {isLoading && <div className="p">Loading...</div>}
      {data && <Hey data={data}/>} */}
      <Router />
    </>
  );
}

export default App;
