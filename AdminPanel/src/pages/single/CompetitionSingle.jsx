import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Backdrop, Button, CircularProgress, Grid, TextField } from "@mui/material";
import axios from "axios";
import DriveFolderUploadOutlined from "@mui/icons-material/DriveFolderUploadOutlined";
import { Box } from "@mui/system";
import toaster from "../../Helper/toaster";
import { Editor } from "@tinymce/tinymce-react";
import parse from 'html-react-parser';


const CompetitionSingle = () => {
  const { teamid } = useParams()
  const [data, setData] = useState();
  const [edit, setEdit] = useState(false);
  const [file1, setFile1] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [loader, setLoader] = useState("");
  const [title, setTitle] = useState("");
  const [timings, setTimings] = useState("");
  const [content, setContent] = useState("");
  const [place, setPlace] = useState("");
  const [alt, setAlt] = useState("");
  const [about, setAbout] = useState("");
  const [keyword, setKeyowrd] = useState("");


  const editorRef = useRef(null);

  const datafunc = () => {
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_PROD_URL}get/competition/${teamid}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("adminInfo").replace(/['"]/g, '')}`
      },
    };
    axios(config)
      .then(function (response) {
        setData(response?.data?.message)
        setTitle(response?.data?.message?.title);
        setPlace(response?.data?.message?.place);
        setTimings(response?.data?.message?.timings);
        setContent(response?.data?.message?.content);
        setAlt(response?.data?.message?.image_alt);
        setImageUrl(response?.data?.message?.image_url);
        setAbout(response?.data?.message?.about);
        setKeyowrd(response?.data?.message?.keyword);
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
    var data = JSON.stringify({
      title,
      place,
      timings,
      content,
      image_alt: alt,
      image_base64: base64,
      about,
      keyword
    });

    var config = {
      method: 'post',
      url: `${process.env.REACT_APP_PROD_URL}update/team/${teamid}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("adminInfo").replace(/['"]/g, '')}`
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        datafunc();
        setLoader(false);
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
          <h1>Add New Product</h1>
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
                  <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="Title" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="Place" type="text" value={place} onChange={(e) => { setPlace(e.target.value) }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="timings" type="text" value={timings} onChange={(e) => { setTimings(e.target.value) }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth disabled variant="outlined" label="Image Alt" value={alt} onChange={(e) => { setAlt(e.target.value) }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth disabled variant="outlined" label="About" value={about} onChange={(e) => { setAbout(e.target.value) }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth disabled variant="outlined" label="About" value={about} onChange={(e) => { setAbout(e.target.value) }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth disabled variant="outlined" label="Keywords(Seperated By Comma)" value={keyword} onChange={(e) => { setKeyowrd(e.target.value) }} />
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
                  <Grid item xs={6}>
                    <TextField disabled fullWidth variant="outlined" label="Title" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField disabled fullWidth variant="outlined" label="Place" type="text" value={place} onChange={(e) => { setPlace(e.target.value) }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField disabled fullWidth variant="outlined" label="timings" type="text" value={timings} onChange={(e) => { setTimings(e.target.value) }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField disabled fullWidth variant="outlined" label="Image Alt" value={alt} onChange={(e) => { setAlt(e.target.value) }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="About" value={about} onChange={(e) => { setAbout(e.target.value) }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth variant="outlined" label="Keywords(Seperated By Comma)" value={keyword} onChange={(e) => { setKeyowrd(e.target.value) }} />
                  </Grid>
                  <Grid item xs={12}>
                    {parse(content)}
                    <input id="my-file" type="file" name="my-file" style={{ display: "none" }} onchange="" />
                  </Grid>
                  {/* <Grid item xs={6}>
                  <button type="button" onClick={() => { submit() }}>Send</button>
                </Grid> */}
                </Grid>
              }
            </form>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CompetitionSingle;
