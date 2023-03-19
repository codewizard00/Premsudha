import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Button, IconButton, ImageListItemBar, Modal, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box } from '@mui/system';
import { red } from '@mui/material/colors';
import toaster from '../../Helper/toaster';



export default function Banner() {

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
        backgroundColor: '#fff'
    };

    const stylesButton = {
        background: red[600],
        mr: '20px',
        '&:hover': {
            background: red[700],
        }
    };

    const [open, setOpen] = React.useState(0)

    function srcset(image, width, height, rows = 1, cols = 1) {
        return {
            src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
            srcSet: `${image}?w=${width * cols}&h=${height * rows
                }&fit=crop&auto=format&dpr=2 2x`,
        };
    }

    const [itemData, setItemaData] = React.useState([]);
    const getAllBanner = () => {
        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_PROD_URL}get/AllBanner`,
            headers: {}
        };
        axios(config)
            .then(function (response) {
                setItemaData(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    React.useEffect(() => {
        getAllBanner();
    }, [])


    const handleDelete = async () => {
        var config = {
          method: 'delete',
          url: `${process.env.REACT_APP_PROD_URL}delete/banner/${open}`,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("adminInfo").replace(/['"]/g, '')}`
          },
        };
    
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
        toaster('sucess',"Succesfully Deleted")
        setOpen(0)
       
      };

    return (
        <>

            <div className="new">
                <Sidebar />
                <div className="newContainer">
                    <Navbar />
                    <div className="top" style={{ display: "flex", justifyContent: "space-between" }}>
                        <h1>Add New Banner</h1>
                        <Link to="/banner/new">
                            <Button variant="outlined">Add New</Button>
                        </Link>
                    </div> <ImageList
                        sx={{
                            width: 500,
                            height: 450,
                            // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                            transform: 'translateZ(0)',
                        }}
                        rowHeight={200}
                        gap={1}
                    >
                        {itemData.map((item, index) => {
                            const cols = item.featured ? 2 : 1;
                            const rows = item.featured ? 2 : 1;

                            return (

                                <ImageListItem key={item.index} cols={cols} rows={rows}>
                                    <Link to={`/banner/single/${item.id}`}>
                                        <img
                                            {...srcset(item.image_url, 550, 500, rows, cols)}
                                            alt={item.image_alt}
                                            loading="lazy"
                                        />
                                    </Link>
                                    <Modal
                                        open={open>0?true:false}
                                        onClose={() => { setOpen(0) }}
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
                                                <Button onClick={() => { setOpen(0) }} sx={stylesButton} variant="contained">No</Button>
                                                <Button onClick={() => { handleDelete() }} variant="outlined">Yes</Button>
                                            </Box>
                                        </Box>
                                    </Modal>
                                    <ImageListItemBar
                                        sx={{
                                            background:
                                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                        }}
                                        title={item.banner_type}
                                        position="top"
                                        actionIcon={
                                            <IconButton
                                                onClick={() => { setOpen(item.id) }}
                                                sx={{ color: 'white' }}
                                                aria-label={`star ${item.banner_type}`}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                        actionPosition="left"
                                    />


                                </ImageListItem>
                            );
                        })}

                    </ImageList>
                </div>
            </div >
        </>

    );
}

