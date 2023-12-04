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
      .get(`https://reqres.in/api/users?per_page=6&page=${paging.currentPage}`)
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

        <div className="p-3 bg-light vh-100">
          <div className="container-fluid">
            <div className="container page-layout">
              <nav aria-label="page-navigation">
                <ul className="pagination justify-content-center">
                  <li className="page-item">
                    <button
                      className="page-link bg-dark"
                      onClick={handleBack}
                      disabled={paging.currentPage === 1}
                      style={{color: "white"}}
                    >
                      Back
                    </button>
                  </li>
                  <li className="page-item">
                    <p href="" className="page-link" style={{ color: "black" }}>
                      Page {paging.currentPage}
                    </p>
                  </li>
                  <li className="page-item">
                    <button
                      className="page-link bg-dark"
                      onClick={handleNext}
                      disabled={paging.currentPage === paging.totalPages}
                      style={{color: "white"}}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="container">
              <div className="row d-flex justify-content-center">
                {users.map((item) => (
                  <div className="col-4 col-card">
                    <div className="card mt-3">
                      <img
                        src={item.avatar}
                        className="card-img-top img-fluid"
                        alt="User Image"
                      />
                      <div className="card-body">
                        <h5 className="card-title">{item.first_name}</h5>
                      </div>
                      <Link to={`/user/${item.id}`}>
                        <button class="btn btn-dark btn-detail p-2 mb-2">Detail</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
