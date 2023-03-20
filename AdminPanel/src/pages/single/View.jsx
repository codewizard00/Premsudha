import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/table/Table";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import WriterContent from "../new/WriterContent";
const View = () => {
  const { id } = useParams()
  const [data, setData] = useState("");
  const [create,setCreate] = useState("");

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
  useEffect(() => {
    datafunc()
  }, [])


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">Information</h1>
            <div className="item">
                <img className="w-40 h-40 rounded-full" src={data?.image} alt="123"/>
              <div className="details">
                <h1 className="itemTitle">{data?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Gander:</span>
                  <span className="itemValue">{data?.gender}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Place:</span>
                  <span className="itemValue">
                    {data?.place}
                  </span>
                </div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <h1 className="title">List</h1>
          {!create && <button onClick={()=>{setCreate(true)}} className="buttons" style={{borderRadius:"10px",backgroundColor:"teal",color:"white",border:"0px solid white", paddingLeft:"20px",paddingRight:"20px"}}>Add New</button>}
          {create && <button onClick={()=>{setCreate(false)}} className="buttons"style={{borderRadius:"10px",backgroundColor:"teal",color:"white",border:"0px solid white", paddingLeft:"20px",paddingRight:"20px"}}>List</button>}          
          </div>
          {create && <WriterContent/>}
          {!create && <List rows={data?.product_data} />}
        </div>
      </div>
    </div>
  );
};

export default View;
