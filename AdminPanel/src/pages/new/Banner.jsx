import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useRef, useState } from "react";
import axios from "axios";
import { Autocomplete, Backdrop, CircularProgress, Grid, TextField } from "@mui/material";
import toaster from "../../Helper/toaster";
import { Editor } from "@tinymce/tinymce-react";
const BannerNew = () => {
    const [file1, setFile1] = useState("");
    const [file2, setFile2] = useState("");
    const [bannerType, setBannerType] = useState("");
    const [alt, setAlt] = useState("");
    const [loader, setLoader] = useState(false)
    const [about, setAbout] = useState('');

    const log = () => {
        if (editorRef.current) {
            setAbout(editorRef.current.getContent())
       
        }
    };
    const editorRef = useRef(null);

    const getBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const submit = async () => {
        try {
            log();
            setLoader(true);
            const base1 = await getBase64(file1);
            const base2 = await getBase64(file2);
            var data = JSON.stringify({
                banner_type: bannerType,
                image_alt: alt,
                image_base_64: base1,
                image_base_64_mobile: base2,
                about: about
            });

            var config = {
                method: 'post',
                url: `${process.env.REACT_APP_PROD_URL}create/banner`,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("adminInfo").replace(/['"]/g, '')}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {
                    setLoader(false);
                    toaster("sucess", "Succesfully Created")
                    setFile1();
                    setBannerType("");
                    setAlt("");
                })
                .catch(function (error) {
                    setLoader(false);
                    toaster("error", "Something Went Wrong")

                });
        }
        catch (err) {
            setLoader(false);
            toaster("error", "Something Went Wrong");
        }
    }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add New Banner</h1>
                </div>

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
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div className="left">
                            <img
                                src={
                                    file1
                                        ? URL.createObjectURL(file1)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                        </div>
                        <div className="left">
                            <img
                                src={
                                    file2
                                        ? URL.createObjectURL(file2)
                                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="right">
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className="formInput">
                                        <label htmlFor="file1">
                                            Image Primary: <DriveFolderUploadOutlinedIcon className="icon" />
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
                                            Image Primary Mobile: <DriveFolderUploadOutlinedIcon className="icon" />
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
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={["Home-Carousel", "Gallery-Carousel", "Event-Gallery", "Aaj-Ka-Rachnakaar"]}
                                        onChange={(event, value) => setBannerType(value)}
                                        renderInput={(params) => <TextField fullWidth  {...params} label="Type" />}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth variant="outlined" label="Image Alt" value={alt} onChange={(e) => { setAlt(e.target.value) }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Editor
                                        apiKey='p2qose3sr3783k8d9elgdbdni9cty8bvlj6aa1ct899o5722'
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue="<p>Your Summary Here.</p>"
                                        onEditorChange={(curContent, editor) => setAbout(curContent)}
                                        init={{
                                            height: 500,
                                            plugins: [
                                                'advlist', 'imageupload', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | blocks | ' + 'imageupload' +
                                                'bold italic backcolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                            file_picker_callback: function (callback, value, meta) {
                                                if (meta.filetype == 'image') {
                                                    var input = document.getElementById('my-file');
                                                    input.click();
                                                    input.onchange = function () {
                                                        var file = input.files[0];
                                                        var reader = new FileReader();
                                                        reader.onload = function (e) {
                                                            callback(e.target.result, {
                                                                alt: file.name
                                                            });
                                                        };
                                                        reader.readAsDataURL(file);
                                                    };
                                                }
                                            }
                                        }}
                                    />
                                    <input id="my-file" type="file" name="my-file" style={{ display: "none" }} onchange="" />
                                </Grid>
                                {/* <Grid item xs={6}>
                                    <TextField fullWidth variant="outlined" label="About" value={about} onChange={(e) => { setAbout(e.target.value) }} />
                                </Grid> */}

                                <Grid item xs={12}>
                                    <button type="button" onClick={() => { submit() }}>Send</button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default BannerNew;
