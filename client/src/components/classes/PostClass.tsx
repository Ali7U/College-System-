/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import useFetch from "../lib/useFetch";
import { useState, useEffect } from "react";
import { IClass } from "../../Interfaces/InterfaceClass";
import AddClass from "../../pages/Dashboard_Teacher/Classes/AddClass";

function PostClass() {
  const [class_id, setClass_id] = useState(0);
  const [numOfStudents, setNumOfStudents] = useState(0);
  const [fromTime, setFromTime] = useState<any>();
  const [toTime, setToTime] = useState<any>();
  const [courseId, setCourseId] = useState("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  // const [classes, setClasses] = useState([]);

  const token = localStorage.getItem("token");

  const newDateTy = new Date(fromTime);
  const newDateTy2 = new Date(toTime);
  const addedClass: IClass = {
    class_id,
    numOfStudents,
    fromTime: newDateTy,
    toTime: newDateTy2,
    courseId,

  };

  // const handleAddClass = (classes: IClass) => {
  //   setClasses((prevClass): any => [...prevClass, classes]);
  // };

  const handleSubmitClass = async (e: any) => {
    e.preventDefault();

    try {
      console.log("calss:", JSON.stringify(addedClass));

      await fetch("http://localhost:3003/classes/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addedClass),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSubmitted(true);
          // handleAddClass(data);
        })
        .catch((e) => {
          console.log(`There is an error here ${e}`);
          setSubmitted(false);
        });
    } catch (error) {
      console.log(error);
      setSubmitted(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await fetch("http://localhost:3003/classes/")
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          // setClasses(data);
        })
        .catch((err) => console.log(`there is an err ${err}`));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {token ? (
        <>
          {submitted ? (
            <>
              <h1>Submitted was seccessfully</h1>
            </>
          ) : (
            <AddClass
              handleSubmitClass={handleSubmitClass}
              setClass_id={setClass_id}
              setNumOfStudents={setNumOfStudents}
              setFromTime={setFromTime}
              setToTime={setToTime}
              setCourseId={setCourseId}
            />
          )}
        </>
      ) : (
        <>
          <h1>You are not auth</h1>
        </>
      )}
    </div>
  );
}

export default PostClass;
