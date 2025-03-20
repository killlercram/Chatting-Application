import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  //getting and Setting the user details
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  //Assigning value to the given
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  //handling the form during submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
  };

  return (
    <div className="container">
      <div className="heading">
        <span>Quick Chat</span>
      </div>
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Login Here</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={user.email}
              name="email"
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              value={user.password}
              name="password"
              onChange={handleChange}
            />
            <button>Login</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Don't have an account yet?
            <Link to="/signup">Signup</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
