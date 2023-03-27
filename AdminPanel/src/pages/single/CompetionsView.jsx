import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CompetitionSingle from "./CompetitionSingle";
import CompetitionTable from "../../components/table/CometitionTable";
import Result from "../new/Results";
const CompetitionView = () => {
  const { id } = useParams()
  const [data, setData] = useState("");
  const [data1, setData1] = useState("");


  const [create, setCreate] = useState("");

  const datafunc = () => {
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_PROD_URL}get/writer/${id}`,
      headers: {
        'Authorization': `Bearer ${localStorage?.getItem("adminInfo")?.split('"')[3]}`
      }
    };
    axios(config)
      .then(function (response) {
        setData(response.data.message)
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const getData = () => {
    var config = {
      method: 'get',
      url: `${process.env.REACT_APP_PROD_URL}get/result/${id}`,
      headers: {
        'Authorization': `Bearer ${localStorage?.getItem("adminInfo")?.split('"')[3]}`
      }
    };
    axios(config)
      .then(function (response) {
        setData1(response.data.message)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  useEffect(() => {
    getData();
    datafunc()
  }, [])


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <CompetitionSingle/>
        <div className="bottom">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1 className="title">List</h1>
            {!create && <button onClick={() => { setCreate(true) }} className="buttons" style={{ borderRadius: "10px", backgroundColor: "teal", color: "white", border: "0px solid white", paddingLeft: "20px", paddingRight: "20px" }}>Add New</button>}
            {create && <button onClick={() => { setCreate(false) }} className="buttons" style={{ borderRadius: "10px", backgroundColor: "teal", color: "white", border: "0px solid white", paddingLeft: "20px", paddingRight: "20px" }}>List</button>}
          </div>
          {create && <Result setCreate={setCreate} />}
          {!create && <CompetitionTable rows={data1} />}
        </div>
      </div>
    </div>
  );
};

export default CompetitionView;
