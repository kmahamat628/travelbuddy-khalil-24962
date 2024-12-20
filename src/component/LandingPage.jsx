import React from "react";

const LandingPage = () => {
  const changeLanguage = (event) => {
    const lang = event.target.value;
    window.location.search = `?lang=${lang}`; // Set the query parameter for language
  };

  return (
    <div>
      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Poppins', sans-serif;
            background-image: url('https://png.pngtree.com/background/20230827/original/pngtree-3d-rendering-of-airline-travel-against-black-background-picture-image_4840109.jpg');
            background-size: cover;
            background-position: center;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            overflow: hidden;
          }

          body::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 1;
          }

          .navbar {
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 3;
            background-color: rgba(0, 0, 0, 0.5);
            padding: 10px 20px;
            border-radius: 10px;
          }

          .navbar .logo {
            font-size: 1.5rem;
            color: #fff;
            font-weight: bold;
          }

          .navbar .nav-links {
            display: flex;
            gap: 20px;
          }

          .navbar .btn {
            padding: 10px 20px;
            font-size: 1rem;
            border-radius: 20px;
            background: linear-gradient(90deg, #ff6f3c, #ff9f43);
            color: #fff;
            border: none;
            cursor: pointer;
            transition: background 0.5s, transform 0.3s;
            box-shadow: 0px 4px 10px rgba(255, 111, 60, 0.3);
          }

          .navbar .btn:hover {
            background: linear-gradient(90deg, #ff9f43, #ff6f3c);
            transform: translateY(-3px);
            box-shadow: 0px 6px 12px rgba(255, 111, 60, 0.5);
          }

          .navbar select {
            padding: 8px 15px;
            font-size: 1rem;
            border-radius: 20px;
            background: linear-gradient(90deg, #ff9f43, #ff6f3c);
            color: #fff;
            border: none;
            cursor: pointer;
            transition: background 0.5s;
            box-shadow: 0px 4px 10px rgba(255, 111, 60, 0.3);
            appearance: none;
          }

          .navbar select:hover {
            background: linear-gradient(90deg, #ff6f3c, #ff9f43);
          }

          .container {
            position: relative;
            z-index: 2;
            background-color: rgba(255, 255, 255, 0.1);
            padding: 60px 80px;
            border-radius: 20px;
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
            text-align: center;
            max-width: 650px;
          }

          h1 {
            font-size: 3rem;
            color: #fff;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          p {
            font-size: 1.2rem;
            color: #ddd;
            margin-bottom: 40px;
            line-height: 1.6;
          }

          @media screen and (max-width: 768px) {
            .container {
              padding: 40px 20px;
              max-width: 90%;
            }

            h1 {
              font-size: 2.2rem;
            }

            p {
              font-size: 1rem;
            }
          }
        `}
      </style>

      <div className="navbar">
        <div className="logo">TravelBuddy</div>
        <div className="nav-links">
          <button className="btn" onClick={() => (window.location.href = "/signin")}>
            Login
          </button>
          <button className="btn" onClick={() => (window.location.href = "/signup")}>
            Sign Up
          </button>
          <select id="language" onChange={changeLanguage}>
            <option value="">Choose Language</option>
            <option value="en">English</option>
            <option value="fr">French</option>
          </select>
        </div>
      </div>

      <div className="container">
        <h1>Welcome to TravelBuddy</h1>
        <p>
          Plan your next adventure with ease. Explore, book, and enjoy your journey with TravelBuddy.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
