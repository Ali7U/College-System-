import React from "react";

function UpdateClass(props: any) {
  const {
    handleUpdateClass,
    setClass_id,
    setNumOfStudents,
    setFromTime,
    setToTime,
    setCourseId,
  } = props;
  return (
    <div>
      <h1>Class ID</h1>
      <input
        className="inp"
        type="text"
        onChange={(e) => setClass_id(Number(e.target.value))}
      />
      <h1>Number Of Student</h1>
      <input
        className="inp"
        type="number"
        onChange={(e) => setNumOfStudents(Number(e.target.value))}
      />
      <h1>Start Time</h1>
      <input
        className="inp"
        type="datetime-local"
        onChange={(e) => setFromTime(e.target.value)}
      />
      <h1>End Time</h1>
      <input
        className="inp"
        type="datetime-local"
        onChange={(e) => setToTime(e.target.value)}
      />
      <h1>Course ID</h1>
      <input
        className="inp"
        type="text"
        onChange={(e) => setCourseId(e.target.value)}
      />

      <input type="submit" className="inp" onClick={handleUpdateClass} />
    </div>
  );
}

export default UpdateClass;
