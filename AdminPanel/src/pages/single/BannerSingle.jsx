import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Backdrop, Button, CircularProgress, Grid, TextField } from "@mui/material";
import axios from "axios";
import DriveFolderUploadOutlined from "@mui/icons-material/DriveFolderUploadOutlined";
import { Box } from "@mui/system";
import toaster from "../../Helper/toaster";
const BannerSingle = () => {
    const { bannerId } = useParams()
    const [data, setData] = useState();
    const [edit, setEdit] = useState(false);
    const [loader, setLoader] = useState(false);
    const [file1, setFile1] = useState();
    const [file2, setFile2] = useState();
    const [imageUrl, setImageUrl] = useState();
    const [imageUrl2, setImageUrl2] = useState();
    const [bannerType, setBannerType] = useState("");
    const [alt, setAlt] = useState("")
    const [about, setAbout] = useState("")

    const datafunc = () => {
        var config = {
            method: 'get',
            url: `${process.env.REACT_APP_PROD_URL}get/banner/${bannerId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("adminInfo").replace(/['"]/g, '')}`
            },
        };
        axios(config)
            .then(function (response) {
                setData(response?.data?.message)
                setBannerType(response?.data?.message?.banner_type)
                setAlt(response?.data?.message?.image_alt);
                setImageUrl(response?.data?.message?.image_url);
                setImageUrl2(response?.data?.message?.image_url2);
                setAbout(response?.data?.message?.about)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {
        datafunc()
    }, [])

    const getBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const submit = async () => {
        setLoader(true);
        const base64 = file1 ? await getBase64(file1) : imageUrl;
        const base64_mobile = file2 ? await getBase64(file2) : imageUrl2;
        var data = JSON.stringify({
            banner_type: bannerType,
            image_alt: alt,
            image_base64: base64,
            image_base64_mobile: base64_mobile,
            about: about,
        });

        var config = {
            method: 'post',
            url: `${process.env.REACT_APP_PROD_URL}update/banner/${bannerId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("adminInfo").replace(/['"]/g, '')}`
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                datafunc();
                setLoader(false)
                setEdit(false);
                toaster('sucess', "Successfully Updated")
            }).catch((err) => { setLoader(false); toaster('error', "Somthing went Wrong") })
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <Box sx={{ display: "flex", justifyContent: "space-between" }} className="top">
                    <h1>Edit Banner</h1>
                    {!edit &&
                        <Button variant="outlined" onClick={() => { setEdit(true) }}>Edit</Button>
                    }
                    {edit &&
                        <Button variant="outlined" onClick={() => { setEdit(false) }}>Cancel</Button>
                    }
                </Box>

                <div className="bottom" >
                    {loader && <>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Backdrop
                                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                open={loader}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </div>
                    </>
                    }
                    <div style={{ display: "flex", flexDirection: "column", marginRight: "20px" }}>
                        <div className="left">
                            <img
                                src={
                                    file1
                                        ? URL.createObjectURL(file1)
                                        : imageUrl
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="right">
                        <form>
                            {edit ?
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className="formInput">
                                            <label htmlFor="file1">
                                                Image Primary: <DriveFolderUploadOutlined className="icon" />
                                            </label>
                                            <input

                                                type="file"
                                                id="file1"
                                                onChange={(e) => setFile1(e.target.files[0])}
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="formInput">
                                            <label htmlFor="file2">
                                                Image Primary: <DriveFolderUploadOutlined className="icon" />
                                            </label>
                                            <input

                                                type="file"
                                                id="file2"
                                                onChange={(e) => setFile2(e.target.files[0])}
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth variant="outlined" label="Banner Type" value={bannerType} onChange={(e) => { setBannerType(e.target.value) }} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField fullWidth variant="outlined" label="Image Alt" value={alt} onChange={(e) => { setAlt(e.target.value) }} />
                                    </Grid>

                                    <Grid item xs={6}>
                                        <TextField fullWidth variant="outlined" label="About" value={about} onChange={(e) => { setAbout(e.target.value) }} />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <button type="button" onClick={() => { submit() }}>Send</button>
                                    </Grid>
                                </Grid>
                                :
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <div className="formInput">
                                            <label htmlFor="file1">
                                                Image Primary: <DriveFolderUploadOutlined className="icon" />
                                            </label>
                                            <input
                                                disabled
                                                type="file"
                                                id="file1"
                                                onChange={(e) => setFile1(e.target.files[0])}
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="formInput">
                                            <label htmlFor="file1">
                                                Image Primary Mobile: <DriveFolderUploadOutlined className="icon" />
                                            </label>
                                            <input
                                                disabled
                                                type="file"
                                                id="file2"
                                                onChange={(e) => setFile2(e.target.files[0])}
                                                style={{ display: "none" }}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth disabled variant="outlined" label="Banner Type" value={bannerType} onChange={(e) => { bannerType(e.target.value) }} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth disabled variant="outlined" label="Image Alt" value={alt} onChange={(e) => { setAlt(e.target.value) }} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth disabled variant="outlined" label="About" value={about} onChange={(e) => { setAbout(e.target.value) }} />
                                    </Grid>
                                </Grid>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default BannerSingle;
