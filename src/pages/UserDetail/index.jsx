import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./style.css";

const UserDetail = () => {
  const [user, setUser] = useState({});

  const param = useParams();

  useEffect(() => {
    getDetailUser();
  }, []);

  const getDetailUser = () => {
    axios
      .get(`https://reqres.in/api/users/${param.id}`)
      .then((response) => {
        // console.log(response);
        setUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex">
      <div className="w-auto">
        <Sidebar />
      </div>
      <div className="col">
        <Navbar />

        <div class="container mt-3">
          <div class="row">
            <div class="col-md-7">
              <img class="img-fluid detail-img mb-2" src={user.avatar} alt="" />
            </div>
            <div class="col-md-5">
              <h2 class="mb-3">
                {user.first_name} {user.last_name}
              </h2>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
