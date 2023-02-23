import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import CompetitionDatatable from "../../components/datatable/CompetionDatatable"

const CompetitionList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <CompetitionDatatable/>
      </div>
    </div>
  )
}

export default CompetitionList;