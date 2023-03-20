import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import WriterDatatable from "../../components/datatable/WriterDatatable"

const WriterList = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <WriterDatatable/>
      </div>
    </div>
  )
}

export default WriterList;