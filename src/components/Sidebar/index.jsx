import { useState } from "react";
import "./style.css";

const Sidebar = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="sidebar d-flex justify-content-between flex-column bg-dark py-3 ps-3 pe-5">
      <div>
        <a href="" className="p-3 text-white text-decoration-none">
          <i className="bi bi-code-slash fs-4 me-4"></i>
          <span className="fs-4">Hello World</span>
        </a>
        <hr className="text-secondary" />
        <ul className="nav nav-pills flex-column mt-3">
          <li
            className={active === 1 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(1)}
          >
            <span className="p-1 text-white text-decoration-none">
              <i className="bi bi-speedometer2 me-3 fs-4"></i>
              <span className="fs-4">
                Dashboard
              </span>
            </span>
          </li>
          <li
            className={active === 2 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(2)}
          >
            <span className="p-1 text-white text-decoration-none">
              <i className="bi bi-people me-3 fs-4"></i>
              <span className="fs-4">
                Users
              </span>
            </span>
          </li>
          <li
            className={active === 3 ? "active nav-item p-2" : "nav-item p-2"}
            onClick={(e) => setActive(3)}
          >
            <span className="p-1 text-white text-decoration-none">
              <i className="bi bi-table me-3 fs-4"></i>
              <span className="fs-4">
                Orders
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
