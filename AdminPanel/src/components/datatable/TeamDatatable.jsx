import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { TeamsColumns, userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Modal, Typography } from "@mui/material";
import { red } from '@mui/material/colors';
import toaster from "../../Helper/toaster";
import axiosInstance from "../../interceptor"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const stylesButton = {
  background: red[600],
  mr: '20px',
  '&:hover': {
    background: red[700],
  }
};

const TeamDatatable = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [data, setData] = useState([]);
  const getData = () => {
    axiosInstance()
    .get(`${process.env.REACT_APP_PROD_URL}get/Allteams`,{})
    .then((res) => {
      setData(res?.data?.message);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  useEffect(() => {
    getData();
  }, [])
  const handleDelete = async (id) => {
    axiosInstance()
    .delete(`${process.env.REACT_APP_PROD_URL}delete/team/${id}`,{})
    .then((res) => {
      console.log(JSON.stringify(res.data));
      toaster('sucess',"Succesfully Deleted")
    })
    .catch((err) => {
      console.log(err);
    });
     handleClose();
    getData();
  };

  const NewModal = ({ id }) => {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete?
            </Typography>
            <Box sx={{ mt: "20px", float: "right" }}>
              <Button onClick={() => { handleClose() }} sx={stylesButton} variant="contained">No</Button>
              <Button onClick={() => { handleDelete(id) }} variant="outlined">Yes</Button>
            </Box>
          </Box>
        </Modal>
      </>
    )
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/teams/single/${params.row.id}`} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => { handleOpen(); }}
            >
              Delete
            </div>
            <NewModal id={params.row.id} />
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">

      <div className="datatableTitle">
        Add New Team Member
        <Link to="/teams/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={TeamsColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default TeamDatatable;
