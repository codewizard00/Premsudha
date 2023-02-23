import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { Backdrop, CircularProgress, Grid, TextField } from "@mui/material";
import toaster from "../../Helper/toaster";
const BookNew = () => {
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [about, setAbout] = useState("");
  const [alt, setAlt] = useState("");
  const [loader, setLoader] = useState(false)

  const getBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  const submit = async () => {
    try {
      setLoader(true)
      const base1 = await getBase64(file1);
      const base2 = await getBase64(file2);

      var data = JSON.stringify({
        title,
        about,
        writer,
        image_alt: alt,
        book_image_64: base1,
        book_pdf_base64:base2,
      });

      var config = {
        method: 'post',
        url: `${process.env.REACT_APP_PROD_URL}create/books`,
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
          setFile2();
          setTitle("");
          setAbout("");
          setWriter("");
          setAlt("");
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
          <h1>Add New Product</h1>
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
                      Book Pdf: <DriveFolderUploadOutlinedIcon className="icon" />
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
                  <TextField fullWidth variant="outlined" label="Title" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth variant="outlined" label="Writer" type="text" value={writer} onChange={(e) => { setWriter(e.target.value) }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth variant="outlined" label="Image Alt" value={alt} onChange={(e) => { setAlt(e.target.value) }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField multiline rows={4} fullWidth variant="outlined" label="About" value={about} onChange={(e) => { setAbout(e.target.value) }} />
                </Grid>
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

export default BookNew;
