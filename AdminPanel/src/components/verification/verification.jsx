// import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import VerificationTable from "../datatable/VerificationTable"

const VerificationList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <VerificationTable/>
      </div>
    </div>
  )
}

export default VerificationList