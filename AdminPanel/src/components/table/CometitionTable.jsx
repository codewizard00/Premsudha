import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const CompetitionTable = ({ rows }) => {
  
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Place</TableCell>
            <TableCell className="tableCell">Name</TableCell>
            <TableCell className="tableCell">Certificate</TableCell>
          </TableRow>
        </TableHead>
        {rows?.length > 0 &&
          <TableBody>

            {rows.map((row) => (
              <TableRow key={row?.id}>
                <TableCell className="tableCell">{row?.position}</TableCell>
                {/* <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row[0]?.product_image_url_primary} alt="" className="image" />
                    {row[0]?.product_title}
                  </div>
                </TableCell> */}
                <TableCell className="tableCell">{row?.writer}</TableCell>
                <TableCell className="tableCell"><a target="_blank" href={`${row?.certificate}`}>
                  <ArrowCircleDownIcon size="large"/>
                </a>
                 </TableCell>
                {/* 
                <TableCell className="tableCell">{row[0]?.product_price}</TableCell>
                <TableCell className="tableCell">{row[0]?.quantity}</TableCell>
                <TableCell className="tableCell">{row[0]?.product_type}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row?.status}`}>{row?.status}</span>
                </TableCell> */}
              </TableRow>
            ))}

          </TableBody>
        }
      </Table>
    </TableContainer>
  );
};

export default CompetitionTable;
