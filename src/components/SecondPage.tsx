import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import styles from "./CSS/Second.module.css";
import ExpandableList from './ExpandableList';

interface DepartmentData {
  department: string;
  sub_departments: string[];
}

interface Post {
  id: number;
  title: string;
  body: string;
}

const departmentsData: DepartmentData[] = [
  {
    department: "customer_service",
    sub_departments: [
      "support",
      "customer_success"
    ]
  },
  {
    department: "design",
    sub_departments: [
      "graphic_design",
      "product_design",
      "web_design"
    ]
  }
];

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Post[]>([]);

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      alert('You must enter your details before accessing this page.');
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];

  return (
    <div className={styles.container}>
      <h1>List of data</h1>
      <div style={{ height: 600, width: '60%', margin: "2rem", backgroundColor: "white" }}>
        <DataGrid 
          rows={data} 
          columns={columns} 
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]} 
          pagination
          checkboxSelection 
        />
      </div>
      <h1>Department</h1>
      <ExpandableList data={departmentsData} />
    </div>
  );
};

export default SecondPage;
