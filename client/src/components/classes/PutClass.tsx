import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IClass } from "../../Interfaces/InterfaceClass";
import UpdateClass from "../../pages/Dashboard_Teacher/Classes/UpdateClass";

function PutClass(props: any) {
  const [data, setData] = useState([]);
  const navigator = useNavigate();
  const { item } = props;
  const [class_id, setClass_id] = useState(0);
  const [numOfStudents, setNumOfStudents] = useState(0);
  const [fromTime, setFromTime] = useState<any>();
  const [toTime, setToTime] = useState<any>();
  const [courseId, setCourseId] = useState("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [classes, setClasses] = useState([]);

  const token = localStorage.getItem("token");

  const newDateTy = new Date(fromTime);
  const newDateTy2 = new Date(toTime);
  const updateClass: IClass = {
    class_id,
    numOfStudents,
    fromTime: newDateTy,
    toTime: newDateTy2,
    courseId,
  };

  const handleAddClass = (classes: IClass) => {
    setClasses((prevClass): any => [...prevClass, classes]);
  };

  const handleUpdateClass = async (e: any) => {
    e.preventDefault();

    try {
      console.log("calss:", JSON.stringify(updateClass));

      await fetch(`http://localhost:3003/classes/update/${item}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateClass),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSubmitted(true);
          handleAddClass(data);
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
  // console.log(data[0]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await fetch("http://localhost:3003/classes/")
        .then((res) => res.json())
        .then((data) => {
          console.log(data.classes);
          setData(data.classes);
        })
        .catch((err) => console.log(`there is an err ${err}`));
    } catch (error) {
      console.log(error);
    }
  };

  //     const url = "dpls"
  //     async function putData(url: string, data: any) {
  //     const response = await fetch(url, {
  //       method: "PUT",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error("Something went wrong!");
  //     }

  //     return response.json();
  //   }

  //     const fethClasses = async () => {
  //       await fetch(`http://localhost:3003/classes/`)
  //         .then((res) => res.json())
  //         .then((data) => setData(data.classes))
  //         .catch((e) => console.log(`there is an error ${e}`));
  //     };

  //     useEffect(() => {
  //       fethClasses();
  //     }, []);

  return (
    <div>
      <UpdateClass
        handleUpdateClass={handleUpdateClass}
        setClass_id={setClass_id}
        setNumOfStudents={setNumOfStudents}
        setFromTime={setFromTime}
        setToTime={setToTime}
        setCourseId={setCourseId}
      />
    </div>
  );
}

export default PutClass;
