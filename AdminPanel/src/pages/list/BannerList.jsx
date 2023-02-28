import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from 'axios';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { Button, IconButton, ImageListItemBar } from '@mui/material';
import { Link } from 'react-router-dom';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export default function Banner() {

    function srcset(image, width, height, rows = 1, cols = 1) {
        return {
          src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
          srcSet: `${image}?w=${width * cols}&h=${
            height * rows
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
                                                sx={{ color: 'white' }}
                                                aria-label={`star ${item.banner_type}`}
                                            >
                                                <StarBorderIcon />
                                            </IconButton>
                                        }
                                        actionPosition="left"
                                    />
                                    </Link>
                                </ImageListItem>
                            );
                        })}
                        
                    </ImageList>
                </div>
            </div >
        </>

    );
}

