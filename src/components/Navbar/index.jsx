import { useNavigate } from "react-router-dom";

const Navbar = ({ Toggle }) => {
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");

    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand d-none d-md-block" href="#">
          Dashboard
        </a>
        <a
          className="navbar-brand d-block d-md-none"
          onClick={Toggle}
          href="#"
        >
          <i className="bi bi-justify"></i>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item rounded border">
              {accessToken ? (
                <a
                  className="nav-link text-white"
                  aria-current="page"
                  href="#"
                  onClick={handleLogout}
                >
                  Logout
                </a>
              ) : (
                <a
                  className="nav-link text-white"
                  aria-current="page"
                  href="#"
                  disabled
                >
                  Logout
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
