import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import "./style.css";

const Home = () => {
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const [paging, setPaging] = useState({
    currentPage: 1,
    totalPages: 0,
  });

  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    getUsers();
    handleSize();
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [paging.currentPage]);

  const handleSize = () => {
    if (window.innerWidth > 768) {
      setToggle(false);
    }
  };

  const getUsers = () => {
    axios
      .get(`https://reqres.in/api/users?per_page=5&page=${paging.currentPage}`)
      .then((response) => {
        // console.log(response);
        setUsers(response.data.data);
        setPaging({
          currentPage: response.data.page,
          totalPages: response.data.total_pages,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleBack = () => {
    setPaging({
      ...paging,
      currentPage: paging.currentPage - 1,
    });
  };

  const handleNext = () => {
    setPaging({
      ...paging,
      currentPage: paging.currentPage + 1,
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

      <div className="col">
        <Navbar Toggle={Toggle} />

        <div className="pagination-container bg-light">
          <button
            className="pagination-button btn btn-primary"
            onClick={handleBack}
            disabled={paging.currentPage === 1}
          >
            Back
          </button>
          <h2>{paging.currentPage}</h2>
          <button
            className="pagination-button btn btn-primary"
            onClick={handleNext}
            disabled={paging.currentPage === paging.totalPages}
          >
            Next
          </button>
        </div>
        <div className="p-3 bg-light">
          <div className="container-fluid">
            {users.map((item) => (
              <div className="row">
                <div className="col-12 col-sm-6 col-md-6 col-lg-4 p-3 bg-light">
                  <div className="d-flex justify-content-around py-2 px-2 align-items-center bg-white border rounded border-secondary shadow-sm">
                    <img src={item.avatar} alt="" className="border rounded" />
                    <div>
                      <Link to={`/user/${item.id}`}>
                        <button
                          href="#"
                          className="btn btn-primary btn-detail mb-2"
                        >
                          Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
