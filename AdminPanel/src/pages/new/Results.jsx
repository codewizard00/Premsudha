import "./new.scss";
import { useRef, useState } from "react";
import axios from "axios";
import { Autocomplete, Grid, TextField } from "@mui/material";
import toaster from "../../Helper/toaster";
import { useParams } from "react-router-dom";
import DriveFolderUploadOutlined from "@mui/icons-material/DriveFolderUploadOutlined";
const Result = ({ setCreate }) => {
    const { id } = useParams()
    const [writer, setWriter] = useState("")
    const [position, setPosition] = useState("");
    const [file, setFile] = useState("")

    const getBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    const [loader, setLoader] = useState(false)

    const submit = async () => {
        try {
            let pdf_base64 = await getBase64(file)
            setLoader(true)
            var data = JSON.stringify({
                writer,
                pdf_base64,
                position
            });

            var config = {
                method: 'post',
                url: `${process.env.REACT_APP_PROD_URL}create/result/${id}`,
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

                    setCreate(false)
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
            <div className="newContainer">
                <div className="top">
                    <h1>Add New Result</h1>
                </div>
                <div className="bottom" >
                    <div className="right">
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <div className="formInput">
                                        <label htmlFor="file2">
                                            Certificate: <DriveFolderUploadOutlined className="icon" />
                                        </label>
                                        <input
                                            type="file"
                                            id="file2"
                                            onChange={(e) => setFile(e.target.files[0])}
                                            style={{ display: "none" }}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField fullWidth label="Writer Name" onChange={(e) => { setWriter(e.target.value) }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={["1", "2", "3", "Above"]}
                                        onChange={(event, value) => setPosition(value)}
                                        renderInput={(params) => <TextField fullWidth  {...params} label="Position" />}
                                    />
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

export default Result;
