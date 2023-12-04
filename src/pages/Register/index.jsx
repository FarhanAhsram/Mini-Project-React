import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState("");

  const navigate = useNavigate();

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
    setValidation("");
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
    setValidation("");
  };

  const onRegister = (event) => {
    event.preventDefault();

    const bodyPayload = {
      email: email,
      password: password,
    };

    axios
      .post("https://reqres.in/api/register", bodyPayload)
      .then((res) => {
        console.log(res.data.token);

        const token = res.data.token;
        const id = res.data.id;
        localStorage.setItem("accessToken", token, id);

        navigate("/login");

        Swal.fire({
          title: "Register Successful",
          icon: "success",
          showConfirmButton: true,
        });
      })
      .catch((err) => {
        console.log(err);

        Swal.fire({
          title: "Failed Register",
          text: err.response.data.error,
          icon: "error",
          showConfirmButton: true,
        });
        setValidation(err.response.data.error);
      });
  };

  return (
    <div className="wrapper">
      <div className="container main">
        <div className="row row-form">
          <div className="col-md-6 right-side">
            <div className="input-box">
              <header>Register</header>
              <div className="input-field">
                <input
                  type="text"
                  className="input-form"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={onChangeEmail}
                  autoComplete="off"
                  required
                />
                <label htmlFor="">Email</label>
              </div>
              <div className="input-field">
                <input
                  type="password"
                  className="input-form"
                  id="exampleInputPassword1"
                  onChange={onChangePassword}
                  autoComplete="off"
                  required
                />
                <label htmlFor="">Password</label>
              </div>
              <div className="input-field">
                <button className="btn sign-in" onClick={onRegister}>
                  Create Account
                </button>
              </div>
              <div className="register">
                <span>
                  Already have an account?
                  <Link to={"/login"}>
                    <a className=""> Sign up here</a>
                  </Link>
                </span>
              </div>
            </div>
          </div>
          <div className="col-md-6 left-side">
            <img src="images/google.png" alt="" className="img-logo" />
            <div className="text">
              <p>Hello World</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
