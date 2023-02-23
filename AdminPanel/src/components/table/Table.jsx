import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = ({ rows }) => {
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Weight</TableCell>
            <TableCell className="tableCell">Flavour</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Type</TableCell>
          </TableRow>
        </TableHead>
        {rows?.length > 0 &&
          <TableBody>

            {rows.map((row) => (
              <TableRow key={row?.id}>
                <TableCell className="tableCell">{row[0]?.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row[0]?.product_image_url_primary} alt="" className="image" />
                    {row[0]?.product_title}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row[0]?.product_weight}</TableCell>
                <TableCell className="tableCell">{row[0]?.product_flavour}</TableCell>

                <TableCell className="tableCell">{row[0]?.product_price}</TableCell>
                <TableCell className="tableCell">{row[0]?.quantity}</TableCell>
                <TableCell className="tableCell">{row[0]?.product_type}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row?.status}`}>{row?.status}</span>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        }
      </Table>
    </TableContainer>
  );
};

export default List;
