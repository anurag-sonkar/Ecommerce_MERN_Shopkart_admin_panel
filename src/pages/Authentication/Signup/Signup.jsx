import React,{ useEffect, useState } from "react";
import styles from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../../features/auth/authSlice";
import { toast, Bounce } from "react-toastify";
// import Loader from "../components/Loader";

/* check screen size for animation */
const useScreenSize = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isLargeScreen;
};

function SignupForm({ setSignIn }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [imagePreview , setImagePreview] = useState("")
  const isLargeScreen = useScreenSize(); // custom hook

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, registerState, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.auth);

  // console.log({user,registerState, isLoading, isError, isSuccess, message})
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setImage(file)
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields ");
      return;
    } else {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("cpassword", confirmPassword);
      formData.append("admin", true);

      if (image) {
        formData.append("photo", image);
      }
      
      const registerPromise = dispatch(register(formData)).unwrap();

      toast.promise(
        registerPromise,
        {
          pending: "Creating Account...",
          success: "Registered Successfully!",
          error: `Registration failed!`,
        },
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );

      registerPromise.then(() => {
        if (isLargeScreen) {
          setSignIn(true);
        } else {
          navigate("/login");
        }
        toast.success(
          `${(registerState && registerState.name) || "You can"} login now`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          }
        );
      })
    }
  };

  return (
    <form className={styles.form}>
    {
      image == null ? <h1 className={styles.title}>Sign up</h1> : <div className={styles.profile}>
        <img src={imagePreview} />
      </div>
    }
      
      <input
        type="text"
        className={styles.input}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        className={styles.input}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className={styles.input}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        className={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <input
        type="file"
        className={styles.input}
        onChange={handleImageChange}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
      <button type="button" className={styles.button} onClick={handleSignup}>
        Sign Up
      </button>
      <div className="my-4 lg:hidden block">
        <Link to="/login">
          Already have an account?{" "}
          <span className="text-blue-800 font-semibold">Login</span>
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
