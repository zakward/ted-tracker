import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import TedDetails from "./TedDetails";
import { Link } from "react-router-dom";

export default function Ted() {
  const { logout, getData, tedData } = useContext(UserContext);

  useEffect(() => {
    getData();
  }, []);

  console.log(tedData);

  const tedElements = tedData.map((ted) => (
    <TedDetails key={ted._id} ted={ted} />
  ));

  return (
    <>
      <div id="ted-list">{tedElements}</div>
    </>
  );
}
