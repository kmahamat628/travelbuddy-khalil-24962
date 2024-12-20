import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { parse } from "json2csv";
import { BrowserRouter, Route, Routes } from 'react-router-dom';



const Container = styled.div`
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #4caf50, #2196f3);  /* Two-color gradient */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #333;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const LogoutButton = styled(Button)`
  background-color: #e53935;
  color: white;

  &:hover {
    background-color: #d32f2f;
  }
`;

const AddButton = styled(Button)`
  background-color: #4caf50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
`;

const DownloadButton = styled(Button)`
  background-color: #1976d2;
  color: white;

  &:hover {
    background-color: #1565c0;
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 14px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  table-layout: auto;
`;

const TableHeader = styled.th`
  cursor: pointer;
  padding: 12px;
  background-color: #2196f3;
  color: white;
  text-align: left;
  font-weight: bold;

  &:hover {
    background-color: #1e88e5;
  }
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ccc;
`;

const TableData = styled.td`
  padding: 10px;
  text-align: left;
`;

const ActionsButton = styled(Button)`
  margin-right: 5px;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 4px;
`;

const EditButton = styled(ActionsButton)`
  background-color: #4caf50;
  color: white;

  &:hover {
    background-color: #45a049;
  }
`;

const DeleteButton = styled(ActionsButton)`
  background-color: #e53935;
  color: white;

  &:hover {
    background-color: #d32f2f;
  }
`;

const Pagination = styled.div`
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  z-index: 10;
`;

const PaginationButton = styled(Button)`
  padding: 8px 16px;
  margin: 0 10px;
  background-color: #4caf50;  /* Green background for pagination */
  color: white;

  &:disabled {
    background-color: #c8e6c9;
  }

  &:hover {
    background-color: #45a049;
  }
`;

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ModalButton = styled(Button)`
  margin: 0 10px;
  padding: 8px 16px;
`;

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "" });
  const [deleteUser, setDeleteUser] = useState(null);
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    if (showConfirmation) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showConfirmation]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedUsers = [...users].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setUsers(sortedUsers);
  };

  const handleDelete = (username) => {
    const updatedUsers = users.filter((user) => user.username !== username);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setDeleteUser(null); // Close the modal
  };

  const openDeleteConfirmation = (username) => {
    setDeleteUser(username); // Set the user to be deleted
  };

  const closeDeleteConfirmation = () => {
    setDeleteUser(null); // Close the modal without deleting
  };

  const handleEdit = (user) => {
    navigate("/admin/edit-user-form", { state: { user } });
  };

  const handleCreate = () => {
    navigate("/admin/add-user-form");
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDownload = () => {
    const csv = parse(users);
    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users_list.csv";
    link.click();
  };

  const openDownloadConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeDownloadConfirmation = () => {
    setShowConfirmation(false);
  };

  const confirmDownload = () => {
    setShowConfirmation(false); // Close the confirmation modal
    handleDownload(); // Proceed with downloading
  };

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <Container>
      <Header>
        <Title>Manage Users</Title>
        <div>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </div>
      </Header>
      <div>
        <SearchInput
          type="text"
          placeholder="Search by Username or Full Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddButton onClick={handleCreate}>Add New User</AddButton>
        <DownloadButton onClick={openDownloadConfirmation}>Download Users List</DownloadButton>
      </div>
      <Table>
        <thead>
          <tr>
            <TableHeader onClick={() => handleSort("username")}>
              Username {sortConfig.key === "username" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
            </TableHeader>
            <TableHeader onClick={() => handleSort("fullName")}>
              Full Name {sortConfig.key === "fullName" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
            </TableHeader>
            <TableHeader onClick={() => handleSort("email")}>
              Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />)}
            </TableHeader>
            <TableHeader>Date of Birth</TableHeader>
            <TableHeader>ID Type</TableHeader>
            <TableHeader>ID Number</TableHeader>
            <TableHeader>Phone Number</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <TableRow key={user.username}>
              <TableData>{user.username}</TableData>
              <TableData>{user.fullName}</TableData>
              <TableData>{user.email}</TableData>
              <TableData>{user.dateOfBirth}</TableData>
              <TableData>{user.idType}</TableData>
              <TableData>{user.idNumber}</TableData>
              <TableData>{user.phoneNumber}</TableData>
              <TableData>{user.role}</TableData>
              <TableData>
                <EditButton onClick={() => handleEdit(user)}>Edit</EditButton>
                <DeleteButton onClick={() => openDeleteConfirmation(user.username)}>Delete</DeleteButton>
              </TableData>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PaginationButton onClick={() => paginate(currentPage - 1)} disabled={isPrevDisabled}>
          Prev
        </PaginationButton>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <PaginationButton onClick={() => paginate(currentPage + 1)} disabled={isNextDisabled}>
          Next
        </PaginationButton>
      </Pagination>

      {showConfirmation && (
        <ConfirmationModal>
          <ModalContent>
            <h3>Are you sure you want to download the user list?</h3>
            <ModalActions>
              <ModalButton onClick={closeDownloadConfirmation}>Cancel</ModalButton>
              <ModalButton onClick={confirmDownload}>Confirm</ModalButton>
            </ModalActions>
          </ModalContent>
        </ConfirmationModal>
      )}

      {deleteUser && (
        <ConfirmationModal>
          <ModalContent>
            <h3>Are you sure you want to delete this user?</h3>
            <ModalActions>
              <ModalButton onClick={closeDeleteConfirmation}>Cancel</ModalButton>
              <ModalButton onClick={() => handleDelete(deleteUser)}>Delete</ModalButton>
            </ModalActions>
          </ModalContent>
        </ConfirmationModal>
      )}
    </Container>
  );
};

export default UsersList;
