import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Home.css"

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user/submit-form');
        setUsers(response.data); // Assuming API returns an array of user objects
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      name: 'First Name',
      selector: row => row.firstName,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.lastName,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'phoneNumber',
      selector: row => row.phoneNumber,
      sortable: true,
    },
    {
      name: 'age',
      selector: row => row.age,
      sortable: true,
    },
    {
      name: 'gender',
      selector: row => row.gender,
      sortable: true,
    },
    {
      name: 'interests',
      selector: row => row.interests,
      sortable: true,
    },
    {
      name: 'birthDate',
      selector: row => row.birthDate,
      sortable: true,
    },

  ];

  return (
    <div className="user-list-container">
      <DataTable className='table'
        title="User Data"
        columns={columns}
        data={users}
        pagination
        progressPending={loading}
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
      />
    </div>
  );
};

export default Home;
