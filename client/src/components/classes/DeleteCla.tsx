import React, { useEffect, useState } from "react";
import { IClass } from "../../Interfaces/InterfaceClass";
import moment from "moment";

function DeleteClass() {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  const fethClasses = async () => {
    await fetch(`http://localhost:3003/classes/`)
      .then((res) => res.json())
      .then((data) => setData(data.classes))
      .catch((e) => console.log(`there is an error ${e}`));
  };
  useEffect(() => {
    fethClasses();
  }, []);

 
  // console.log(data);
  // let heu = moment().format("dddd LT");
  // console.log(heu);

  return (
    <>
      {/* <h1>Set class ID</h1> <input className="inp" type="text" />{" "} */}
      {/* <input type="submit" onClick={deleteData()} /> */}
      <div>
        <button onClick={() => fethClasses()}>Referech Data</button>

        <ul>
          {data.map((item: IClass) => (
            <li key={item.id} className="inp">
              <h1>Class ID: {item.class_id}</h1>
              <h3>Number of Student in Class: {item.numOfStudents}</h3>
              <p>Time To Class: <br/>
                {moment(item.fromTime).format("dddd LT")} -{" "}
                {moment(item.toTime).format("dddd LT")}{" "}
              </p>
              <p>Course ID: {item.courseId}</p>
              <button
                onClick={async () => {
                  const url = "http://localhost:3003/classes/remove/" + item.id;
                  await fetch(url, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    method: "DELETE",
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Something went wrong!");
                      }
                      //
                    })
                    .catch((e) => console.log(e));
                }}
              >
                Delete Class :
              </button>
              {item.id}
            </li>
          ))}
        </ul>
        {/*       
        <input
          type="text"
          className="inp"
          value={id}
          onChange={(e) => setId(e.target.value)}
        /> */}
        {/* {<h1>Hello  {data.map((item) => item.id)}</h1>} */}
        {/* {data[1].map((item) => (
          <h1>{item.class_id}</h1>
        ))} */}
      </div>
    </>
  );
}

export default DeleteClass;
