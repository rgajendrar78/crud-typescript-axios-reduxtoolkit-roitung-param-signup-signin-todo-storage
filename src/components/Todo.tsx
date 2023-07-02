import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Item {
  id: number;
  name: string;
}

const Todo = () => {
  const [data, setData] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState('');
  const [editItem, setEditItem] = useState<Item | null>(null);

  const handleAdd = () => {
    const newItemData: Item = {
      id: Date.now(),
      name: newItem,
    };
    setData([...data, newItemData]);
    setNewItem('');
  };

  const handleEdit = (id: number) => {
    const itemToEdit: Item | undefined = data.find((item) => item.id === id);
    if (itemToEdit) {
      setEditItem(itemToEdit);
      setNewItem(itemToEdit.name);
    }
  };

  const handleUpdate = () => {
    const updatedData = data.map((item) =>
      item.id === editItem?.id ? { ...item, name: newItem } : item
    );
    setData(updatedData);
    setNewItem('');
    setEditItem(null);
  };

  const handleDelete = (id: number) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" sx={{ marginBottom: '10px' }}>
          TODO
        </Typography>

        <TextField
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter a new item"
          sx={{ marginBottom: '10px', width: '80%' }}
          color='success'
        />
        {editItem ? (
          <Button variant="contained" style={{ marginRight: '10px',backgroundColor: '#357a38' }} onClick={handleUpdate}>
            Update
          </Button>
        ) : (
          <Button variant="contained" style={{ marginRight: '10px',backgroundColor: '#357a38' }} onClick={handleAdd}>
            Add
          </Button>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <IconButton color='success' onClick={() => handleEdit(item.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color='success' onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Todo;
