import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import TeamDatatable from "../../components/datatable/TeamDatatable"

const TeamList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <TeamDatatable/>
      </div>
    </div>
  )
}

export default TeamList;