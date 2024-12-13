import React from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
//   const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "Users", user.uid), {
        email: user.email,
        name: name,
        createdAt: new Date().toISOString(),
      });
      alert("Registration successful");
    //   navigate("/");
    } catch (error) {
      alert("Failed to register user, chech provided details and try again");
      console.log(error.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          {...register("name", { required: "Name is required" })}
          className="form-input"
          id="name"
          placeholder="enter name"
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="email">email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
          })}
          className="form-input"
          id="email"
          placeholder="enter email"
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="password">password</label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
              message:
                "Password must contain an uppercase letter, a number, and a special character",
            },
          })}
          className="form-input"
          id="password"
          placeholder="password"
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          type="password"
          {...register("confirmPassword", {
            required: "Confirm Password is required",
            validate: (value) => value === watch("password") || "Passwords do not match",
          })}
          className="form-input"
          id="confirmPassword"
          placeholder="confirm password"
        />
         {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
      </div>
      <button className="submit-button" type="submit">
        Register
      </button>
    </form>
  );
};

export default Register;
