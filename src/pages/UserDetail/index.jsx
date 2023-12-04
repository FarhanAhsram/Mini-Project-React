import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const UserDetail = () => {
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState({});

  const param = useParams();

  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    getDetailUser();
    handleSize();
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  const handleSize = () => {
    if (window.innerWidth > 768) {
      setToggle(false);
    }
  };

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
      <div className={toggle ? "d-none" : "w-auto position-fixed"}>
        <Sidebar />
      </div>

      <div className={toggle ? "d-none" : "invisible"}>
        <Sidebar />
      </div>

      <div className="col bg-light vh-100">
        <Navbar Toggle={Toggle} />

        <div className="container mt-3">
          <div className="container">
            <div className="d-flex justify-content-center">
              <img
                className="img-fluid mb-2"
                src={user.avatar}
                alt=""
                style={{width: 200}}
              />
            </div>
            <h1 className="d-flex justify-content-center">
              {user.first_name} {user.last_name}
            </h1>
            <p className="d-flex justify-content-center">{user.email}</p>
            <p className="" style={{textAlign: "justify"}}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
              eligendi similique delectus blanditiis facilis, non voluptatibus
              consequuntur! Sunt nam placeat qui quia obcaecati, nulla quo ad
              libero dolore, facilis eaque earum sit? Rem magni explicabo modi
              molestiae illo ex, iusto hic voluptatem quidem nulla libero, dolor
              vel! Consequuntur sequi aperiam ratione rem hic soluta. Odio eum
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
