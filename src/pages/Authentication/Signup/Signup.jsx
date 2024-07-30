import { useState } from "react";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!name || !email || !password || !image) {
      setError("Please fill in all fields and upload an image");
    } else {
      console.log("Signup successful");
      setError("");
    }
  };

  return (
    <form className={styles.form}>
      <h1 className={styles.title}>Create Account</h1>
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
        type="file"
        className={styles.input}
        onChange={(e) => setImage(e.target.files[0])}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
      <button type="button" className={styles.button} onClick={handleSignup}>
        Sign Up
      </button>
      <div className="my-4 lg:hidden block">
      <Link to='/login'>Already have an account? <span className="text-blue-800 font-semibold">Login</span></Link>
      </div>

    </form>
  );
}

export default SignupForm;
