import { useState } from "react";

const Signup = () => {
  //values must be same as in backend schema
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  //assigning entered values above
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser (values => ({...values, [name]: value}));
  }

  //handling Form submission
  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log(user);
  }

  return (
    <div className="container">
      <div className="heading">
        <span>Quick Chat</span>
      </div>
      <div className="container-back-img"></div>
      <div className="container-back-color"></div>
      <div className="card">
        <div className="card_title">
          <h1>Create Account</h1>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="column">
              <input
                type="text"
                placeholder="First Name"
                name="firstname"
                value={user.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={user.lastname}
                onChange={handleChange}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="card_terms">
          <span>
            Already have an account?
            <a href="/login">Login</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
