import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import 'font-awesome/css/font-awesome.min.css';


const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    dob: "",
    idType: "NationalID", // Default value for the select dropdown
    idNumber: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.username ||
      !form.fullName ||
      !form.email ||
      !form.dob ||
      !form.idNumber ||
      !form.phoneNumber ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("All fields are required");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    signUp(form);
    navigate("/signin");
  };

  return (
    <div style={styles.signupContainer}>
      <section style={styles.signupFormSection}>
        <h2>Sign Up</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={styles.input}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <select
              value={form.idType}
              onChange={(e) => setForm({ ...form, idType: e.target.value })}
              style={styles.input}
            >
              <option value="NationalID">National ID</option>
              <option value="Passport">Passport</option>
            </select>
            <input
              type="text"
              placeholder="ID Number"
              value={form.idNumber}
              onChange={(e) => setForm({ ...form, idNumber: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Phone Number"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              style={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <input
              type="password"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              style={styles.input}
            />
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              style={styles.input}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" style={styles.submitButton}>Sign Up</button>
        </form>
        <p style={styles.signInLink}>
          Already have an account? <Link to="/signin" style={styles.link}>Sign In</Link>
        </p>
      </section>
    </div>
  );
};

const styles = {
  signupContainer: {
    backgroundImage: "url('https://images.unsplash.com/photo-1659113579898-48aa884fc654?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWlycGxhbmUlMjB0cmF2ZWx8ZW58MHx8MHx8fDA%3D')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Arial', sans-serif",
    transition: "background 0.5s ease",
    padding: "0 20px", // To ensure responsiveness
  },
  signupFormSection: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "30px 40px",
    width: "100%",
    maxWidth: "500px", // Limit max width for responsiveness
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    color: "white",
    textAlign: "center",
    transition: "all 0.3s ease",
    overflowY: "auto", // Ensures no scroll bar
  },
  error: {
    color: "red",
    fontSize: "1rem",
    marginBottom: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    marginBottom: "15px",
  },
  input: {
    width: "48%",
    padding: "12px",
    border: "2px solid #fff",
    backgroundColor: "transparent",
    color: "#fff",
    fontSize: "1rem",
    borderRadius: "5px",
    outline: "none",
    transition: "all 0.3s ease",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    backgroundColor: "#00bcd4",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  signInLink: {
    color: "white",
    marginTop: "20px",
    fontSize: "1rem",
  },
  link: {
    color: "#00f7ff",
    fontWeight: "bold",
    textDecoration: "none",
  },
};

export default SignUp;
