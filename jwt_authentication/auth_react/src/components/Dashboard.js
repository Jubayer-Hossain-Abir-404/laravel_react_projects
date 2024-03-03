import React, { useEffect, useState } from "react";
import AuthUser from "./AuthUser";

const Dashboard = () => {
  const { user, http } = AuthUser();
  const [userDetail, setUserDetail] = useState();

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.post("/me").then((res) => {
      setUserDetail(res.data);
    });
  };

  

  function renderElement(){
    if(userDetail){
       return (
        <div>
          <h4>Name</h4>
          <p>{userDetail.name}</p>
          <h4>Email</h4>
          <p>{userDetail.email}</p>
        </div>
      );
    }else{
      return <p>Loading..</p>
    }
  }

  return(
    <div>
      {renderElement()}
    </div>
  );
};

export default Dashboard;
