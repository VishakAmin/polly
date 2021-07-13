import React, { useState } from "react";
import SignupForm from "components/Authentication/Form/SignupForm";
import authApi from "apis/auth";

const Signup = ({ history }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      await authApi.signup({
        user: {
          first_name: firstname,
          last_name: lastname,
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      setLoading(false);
      history.push("/login");
    } catch (error) {
      setLoading(false);
      logger.error(error);
    }
  };
  return (
    <SignupForm
      setFirstName={setFirstName}
      setLastName={setLastName}
      setEmail={setEmail}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Signup;
