import { useState } from "react";
import "./SignUp.css";

type AddProps = {
  onAddUser: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
};
const SignUpForm = (props: AddProps) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mandatoryFieldErrorMsg, setMandatoryFieldErrorMsg] = useState("");
  const [emailValidationErrorMsg, setEmailValidationErrorMsg] = useState("");
  const [passwordValidationErrorMsg, setPasswordValidationErrorMsg] =
    useState("");
  const [
    confirmPasswordValidationErrorMsg,
    setConfirmPasswordValidationErrorMsg,
  ] = useState("");

  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  //you automatically get event object just like event listeners in js
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setFirstName(e.target.value);
    setMandatoryFieldErrorMsg("");
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setLastName(e.target.value);
    setMandatoryFieldErrorMsg("");
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setEmail(e.target.value);
    setMandatoryFieldErrorMsg("");
    if (!regex.test(email)) {
      setEmailValidationErrorMsg("Invalid Email id.");
    } else {
      setEmailValidationErrorMsg("");
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setPassword(e.target.value);
    setMandatoryFieldErrorMsg("");
    if (!passwordRegex.test(password)) {
      setPasswordValidationErrorMsg(
        "Invalid Password. \n It should have more than 8 characters. \n One digit, one alphabet, one special character."
      );
    } else {
      setPasswordValidationErrorMsg("");
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e);
    setConfirmPassword(e.target.value);
    setMandatoryFieldErrorMsg("");
    if (e.target.value != password) {
      setConfirmPasswordValidationErrorMsg(
        "Confirm password mismatch with password."
      );
    } else {
      setConfirmPasswordValidationErrorMsg("");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    //by default it will submit the form, so prevent
    e.preventDefault();

    if (firstName == "" && lastName == "" && email == "" && password == "") {
      setMandatoryFieldErrorMsg("This field is mandatory.");
    } else if (!regex.test(email)) {
      setEmailValidationErrorMsg("Invalid Email id.");
    } else if (!passwordRegex.test(password)) {
      setPasswordValidationErrorMsg(
        "Invalid Password. \n It should have more than 8 characters. \n One digit, one alphabet, one special character."
      );
    } else if (confirmPassword != password) {
      setConfirmPasswordValidationErrorMsg(
        "Confirm password mismatch with password."
      );
    } else {
      props.onAddUser(firstName, lastName, email, password);
    }
  };

  return (
    <div>
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0 left-div">
              <h1 className="my-5 display-5 fw-bold ls-tight">
                Create a portfolio website <br />
                <span>Show Your Work</span>
              </h1>
              <p className="mb-4 opacity-70 signup-desc">
                Showcase your work online with a portfolio website. Get started
                with a professionally designed template that can be customized
                to fit your brand.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

              <div className="card bg-glass">
                <div className="card-body px-4 py-5">
                  <h2> Sign Up</h2>
                  <br></br>
                  <form onSubmit={handleSubmit}>
                    <div className="row mr-3">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            required
                            type="text"
                            id="firstName"
                            onChange={handleFirstNameChange}
                            placeholder="First Name"
                            className="form-control"
                          />
                          <span className="errorMsg">
                            {mandatoryFieldErrorMsg}
                          </span>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            required
                            type="text"
                            id="lastName"
                            onChange={handleLastNameChange}
                            placeholder="Last Name"
                            className="form-control"
                          />
                          <span className="errorMsg">
                            {mandatoryFieldErrorMsg}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4 mr-4">
                      <input
                        required
                        type="text"
                        id="email"
                        onChange={handleEmailChange}
                        placeholder="Email"
                        className="form-control"
                      />
                      <span className="errorMsg">{mandatoryFieldErrorMsg}</span>
                      <span className="errorMsg">
                        {emailValidationErrorMsg}
                      </span>
                    </div>

                    <div className="form-outline mb-4 mr-4">
                      <input
                        required
                        type="password"
                        id="password"
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        className="form-control"
                      />
                      <span className="errorMsg">{mandatoryFieldErrorMsg}</span>
                      <span className="errorMsg new-line">
                        {passwordValidationErrorMsg}
                      </span>
                    </div>
                    <div className="form-outline mb-4 mr-4">
                      <input
                        required
                        type="password"
                        id="password"
                        onChange={handleConfirmPasswordChange}
                        placeholder="Confirm Password"
                        className="form-control"
                      />
                      <span className="errorMsg">{mandatoryFieldErrorMsg}</span>
                      <span className="errorMsg">
                        {confirmPasswordValidationErrorMsg}
                      </span>
                    </div>

                    <button type="submit" className="btn btn-primary btn mb-4 ">
                      Sign up
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUpForm;
