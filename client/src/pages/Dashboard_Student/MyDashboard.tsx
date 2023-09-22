import { Box } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SiGoogleclassroom } from "react-icons/si";


function MyDashboard() {
  const navigator = useNavigate();

  return (
    <div>
      <Box onClick={() => navigator("/myDashboard/my_classes")}>My classes
      {<SiGoogleclassroom/>}</Box>
      <Box onClick={() => navigator("/myDashboard/Show_Classes/")}>
        Show Available Classes
      </Box>{" "}
      <Box onClick={() => navigator("/myDashboard/Show_Classes/added/")}>
        Added Classes
      </Box>
    </div>
  );
}

export default MyDashboard;
