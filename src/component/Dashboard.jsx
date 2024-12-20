import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styled from "styled-components";

const Dashboard = () => {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  if (!currentUser) return <p>Loading...</p>;

  const handleLogout = () => {
    signOut();
    navigate("/signin");
  };

  return (
    <DashboardContainer>
      <Sidebar>
        <Logo>Travel Buddy</Logo>
        <NavItems>
          {currentUser.role === "admin" ? (
            <>
              <NavItem onClick={() => navigate("/admin/users")}>Manage Users</NavItem>
              <NavItem onClick={() => navigate("/admin/reports")}>Reports</NavItem>
            </>
          ) : (
            <>
              <NavItem onClick={() => navigate("/book-trip")}>Book a Trip</NavItem>
              <NavItem onClick={() => navigate("/trip-history")}>Trip History</NavItem>
              <NavItem onClick={() => navigate("/settings")}>Settings</NavItem>
            </>
          )}
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </NavItems>
      </Sidebar>

      <MainContent>
        <WelcomeSection>
          <h1>Welcome, {currentUser.fullName}!</h1>
          <UserRole>Role: {currentUser.role}</UserRole>
          {currentUser.profilePicture && (
            <ProfilePicture>
              <img src={currentUser.profilePicture} alt="Profile" />
            </ProfilePicture>
          )}
        </WelcomeSection>
      </MainContent>
    </DashboardContainer>
  );
};

// Styled-components for CSS-in-JS

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #f9f9f9;
`;

const Sidebar = styled.div`
  width: 200px;
  background: linear-gradient(180deg, #a1c4fd, #c2e9fb); /* Sweet pastel blue gradient */
  color: #2c3e50; /* Soft dark color for text */
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 10px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 30px;
  color: #2c3e50;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const NavItems = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`;

const NavItem = styled.div`
  cursor: pointer;
  font-size: 16px;
  padding: 10px 15px;
  text-align: center;
  border-radius: 5px;
  transition: all 0.3s ease;
  background: #eaf6ff; /* Light pastel blue for buttons */
  color: #2c3e50;
  &:hover {
    background: #d6eaff; /* Slightly darker blue on hover */
    transform: translateX(5px);
  }
`;

const LogoutButton = styled.button`
  margin-top: auto;
  padding: 8px 15px;
  background-color: #ff6b6b; /* Soft coral red */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ff4c4c; /* Slightly darker coral red on hover */
  }
`;

const MainContent = styled.div`
  flex-grow: 1;
  background-image: url("https://st4.depositphotos.com/1976499/26660/i/450/depositphotos_266603570-stock-photo-airplane-isolated-black-rendering.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const WelcomeSection = styled.div`
  text-align: center;
  background-color: rgba(43, 43, 43, 0.85); /* Darker container background */
  color: #f0f0f0; /* Light text for better readability */
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const UserRole = styled.p`
  font-size: 18px;
  color: #d1d1d1; /* Light gray text */
  margin-top: 10px;
`;

const ProfilePicture = styled.div`
  margin-top: 20px;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #ddd;
  }
`;

export default Dashboard;
