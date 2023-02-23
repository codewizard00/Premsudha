import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useRef, useState } from "react";
import axios from "axios";
import { Backdrop, CircularProgress, Grid, TextField } from "@mui/material";
import toaster from "../../Helper/toaster";
import { Editor } from '@tinymce/tinymce-react';
const EmailNew = () => {
 
    const [subject, setSubject] = useState("");
    const [email, setEmail] = useState("");
    const [content, setContent] = useState("");
    const [loader, setLoader] = useState(false)

    const log = () => {
        if (editorRef.current) {
            setContent(editorRef.current.getContent())
            console.log(editorRef.current.getContent());
        }
    };
    const editorRef = useRef(null);
    const submit = async () => {

        try {
            log();
            setLoader(true)
          
            var data = JSON.stringify({
                subject,
                content,
                test_email:email,
            });

            var config = {
                method: 'post',
                url: `${process.env.REACT_APP_PROD_URL}sendEmail/test`,
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
                    setSubject("");
                    setContent("");
                    setEmail("");
                })
                .catch(function (error) {
                    setLoader(false);
                    toaster("error", "Something Went Wrong")
                    console.log(error);
                });
        }
        catch (err) {
            setLoader(false);
            toaster("error", "Something Went Wrong");
        }
    }

    const submitfor = async () => {

        try {
            log();
            setLoader(true)
          
            var data = JSON.stringify({
                subject,
                content,
            });

            var config = {
                method: 'post',
                url: `${process.env.REACT_APP_PROD_URL}sendEmail`,
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
                    setSubject("");
                    setContent("");
                    setEmail("");
                })
                .catch(function (error) {
                    setLoader(false);
                    toaster("error", "Something Went Wrong")
                    console.log(error);
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
                    <h1>Send Email</h1>
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
                  
                    <div className="right">
                        <form>
                            <Grid container spacing={2}>
                              
                                <Grid item xs={6}>
                                    <TextField fullWidth variant="outlined" label="Subject" type="text" value={subject} onChange={(e) => { setSubject(e.target.value) }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth variant="outlined" label="Email" type="text" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <Editor
                                        apiKey='p2qose3sr3783k8d9elgdbdni9cty8bvlj6aa1ct899o5722'
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        initialValue="<p>Your Summary Here.</p>"
                                        onEditorChange={(curContent, editor) => setContent(curContent)}
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
                                <Grid item xs={6}>
                                    <button type="button" onClick={() => { submit() }}>Send Test</button>
                                </Grid>
                                <Grid item xs={6}>
                                    <button type="button" onClick={() => { submitfor() }}>Send</button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default EmailNew;
