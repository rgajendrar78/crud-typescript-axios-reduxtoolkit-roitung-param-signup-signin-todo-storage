import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import styled from '@emotion/styled';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router';
import CallMadeIcon from '@mui/icons-material/CallMade';

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
`;

const SortingButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
  margin-bottom: 15px;
`;

export default function UserTable() {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [searchName, setSearchName] = useState('');
  const [searchId, setSearchId] = useState('');
  const [sortByName, setSortByName] = useState<'asc' | 'desc' | ''>('');
  const [sortByID, setSortByID] = useState<'asc' | 'desc' | ''>('');
  const [addUser, setAddUser] = useState<UserData>({
    id: 0,
    name: '',
    username: '',
    email: '',
  });
  const [updateUser, setUpdateUser] = useState<UserData>({
    id: 0,
    name: '',
    username: '',
    email: '',
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const navigate=useNavigate();
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((d: UserData[]) => setUserData(d));
  }, []);
  
  const handleUserDetail=(row:any)=>{
    navigate('/userdetail',{state:{row:row}})
  }

  const handleOpenDialog = (user: UserData) => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
    

  const handleSearchName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(e.target.value);
  };

  const handleSearchId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const handleSortByName = () => {
    if (sortByName === 'asc') {
      setSortByName('desc');
    } else {
      setSortByName('asc');
    }
    setSortByID('');
  };

  const handleSortByID = () => { 
    if (sortByID === 'asc') {
      setSortByID('desc');
    } else {
      setSortByID('asc');
    }
    setSortByName('');
  };

  const handleAddUser = () => {
    const newId = userData.length > 0 ? userData[userData.length - 1].id + 1 : 1;
    const newUser: UserData = { ...addUser, id: newId };
    setUserData([...userData, newUser]);
    setAddUser({ id: 0, name: '', username: '', email: '' });
  };

  const handleDeleteUser = (id: number) => {
    const updatedData = userData.filter((user) => user.id !== id);
    setUserData(updatedData);
  };

  const handleUpdateUser = () => {
    const updatedData = userData.map((user) => {
      if (user.id === updateUser.id) {
        return { ...user, ...updateUser };
      }
      return user;
    });
    setUserData(updatedData);
    setUpdateUser({ id: 0, name: '', username: '', email: '' });
    setIsUpdating(false);
  };

  const handleEditUser = (id: number) => {
    const userToUpdate = userData.find((user) => user.id === id);
    if (userToUpdate) {
      setUpdateUser(userToUpdate);
      setIsUpdating(true);
    }
  };

  const sortedData = [...userData];

  if (sortByName) {
    sortedData.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return sortByName === 'asc' ? -1 : 1;
      }
      if (nameA > nameB) {
        return sortByName === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  if (sortByID) {
    sortedData.sort((a, b) => {
      return sortByID === 'asc' ? a.id - b.id : b.id - a.id;
    });
  }

  const filteredData = sortedData.filter(
    (data) =>
      data.name.toLowerCase().includes(searchName.toLowerCase()) &&
      String(data.id).includes(searchId)
  );

  return (
    <>
    <Dialog open={openDialog} onClose={handleCloseDialog}>
  <DialogTitle>User Details</DialogTitle>
  {selectedUser && (
    <DialogContent>
      <DialogContentText>
        <strong>ID:</strong> {selectedUser.id}
      </DialogContentText>
      <DialogContentText>
        <strong>Name:</strong> {selectedUser.name}
      </DialogContentText>
      <DialogContentText>
        <strong>Username:</strong> {selectedUser.username}
      </DialogContentText>
      <DialogContentText>
        <strong>Email:</strong> {selectedUser.email}
      </DialogContentText>
    </DialogContent>
  )}
  <DialogActions>
    <Button onClick={handleCloseDialog} color="primary">Close</Button>
  </DialogActions>
</Dialog>

      <div>
        <div className="container">
          <Container>
            <div>
              <TextField
                label="Search by ID"
                value={searchId}
                onChange={handleSearchId}
                variant="outlined"
                style={{ marginLeft: '10px', marginTop: '15px' }}
              />
              <TextField
                label="Search by name"
                value={searchName}
                onChange={handleSearchName}
                variant="outlined"
                margin="normal"
                style={{ marginLeft: '10px', marginTop: '15px' }}
              />
            </div>
            <SortingButtonsContainer>
              <Button variant="contained" color="success" onClick={handleSortByID}>
                Sort by ID {sortByID === 'asc' ? '↑' : '↓'}
              </Button>
              <Button
                variant="contained"
                color="success"
                style={{ marginLeft: '10px', marginRight: '10px' }}
                onClick={handleSortByName}
              >
                Sort by Name {sortByName === 'asc' ? '↑' : '↓'}
              </Button>
            </SortingButtonsContainer>
          </Container>
          <div>
            <TextField
              label="ID"
              value={isUpdating ? updateUser.id : addUser.id}
              onChange={(e) => {
                if (isUpdating) {
                  setUpdateUser((prevUser) => ({ ...prevUser, id: Number(e.target.value) }));
                } else {
                  setAddUser((prevUser) => ({ ...prevUser, id: Number(e.target.value) }));
                }
              }}
              variant="outlined"
              style={{ marginLeft: '10px', marginTop: '15px' }}
              color='success'
            />
            <TextField
              label="Name"
              value={isUpdating ? updateUser.name : addUser.name}
              onChange={(e) => {
                if (isUpdating) {
                  setUpdateUser((prevUser) => ({ ...prevUser, name: e.target.value }));
                } else {
                  setAddUser((prevUser) => ({ ...prevUser, name: e.target.value }));
                }
              }}
              variant="outlined"
              style={{ marginLeft: '10px', marginTop: '15px' }}
              color='success'
            />
            <TextField
              label="Username"
              value={isUpdating ? updateUser.username : addUser.username}
              onChange={(e) => {
                if (isUpdating) {
                  setUpdateUser((prevUser) => ({ ...prevUser, username: e.target.value }));
                } else {
                  setAddUser((prevUser) => ({ ...prevUser, username: e.target.value }));
                }
              }}
              variant="outlined"
              style={{ marginLeft: '10px', marginTop: '15px' }}
              color='success'
            />
            <TextField
              label="Email"
              value={isUpdating ? updateUser.email : addUser.email}
              onChange={(e) => {
                if (isUpdating) {
                  setUpdateUser((prevUser) => ({ ...prevUser, email: e.target.value }));
                } else {
                  setAddUser((prevUser) => ({ ...prevUser, email: e.target.value }));
                }
              }}
              variant="outlined"
              style={{ marginLeft: '10px', marginTop: '15px' }}
              color='success'
            />
            {isUpdating ? (
              <Button
                variant="contained"
                color="success"
                style={{ marginLeft: '10px', marginTop: '25px' }}
                onClick={handleUpdateUser}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                style={{ marginLeft: '10px', marginTop: '25px' }}
                onClick={handleAddUser}
              >
                Add
              </Button>
            )}
          </div>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {filteredData.map((row) => (
    <TableRow key={row.id}>
      <TableCell>{row.id}</TableCell>
      <TableCell>{row.name}</TableCell>
      <TableCell>{row.username}</TableCell>
      <TableCell>{row.email}</TableCell>
      <TableCell>
      <IconButton onClick={() => handleOpenDialog(row)}>
          <InfoIcon color='success'/>
        </IconButton>
        <IconButton onClick={() => handleUserDetail(row)}>
          <CallMadeIcon color='success'/>
        </IconButton>
        <IconButton onClick={() => handleEditUser(row.id)}>
          <EditIcon color='success'/>
        </IconButton>
        <IconButton onClick={() => handleDeleteUser(row.id)}>
          <DeleteIcon color='success'/>
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
      </div>
    </>
  );
}
