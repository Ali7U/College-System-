import React, { useEffect, useState } from "react";
import { ICourse } from "../../Interfaces/InterfaceCourse";

function GetCourse() {
  const [dataCourse, setDataCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  // console.log(course);
  const token = localStorage.getItem("token");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    try {
      await fetch("http://localhost:3003/course/my_courses/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setDataCourse(data.courses);

          setIsLoading(false);
        })
        .catch((err) => console.log(`there is an err ${err}`));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {isLoading
        ? "Loading..."
        : dataCourse.map((item: ICourse) => (
            <>
              <div key={item.id}>
                <h3>{item.id}</h3>
                <h1>{item.title}</h1>
                <p>{item.hours}</p>
                <h2>{item.major}</h2>
                <h3>{item.teacherID}</h3>
              </div>
              <button>Delete Class ?</button>
            </>
          ))}
    </div>
  );
}

export default GetCourse;
