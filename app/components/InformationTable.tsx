import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import type { VehicleInformation } from "~/types";

export interface InformationTableProps {
  details: VehicleInformation;
}

export default function InformationTable({ details }: InformationTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>MSIDN</TableCell>
            <TableCell>{details.msidn}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Engine Status</TableCell>
            <TableCell>{details.engineStatus}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Brand</TableCell>
            <TableCell>{details.brand}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Country of Operation</TableCell>
            <TableCell>{details.countryOfOperation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Chassis Number</TableCell>
            <TableCell>{details.chassisNumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cassis Series</TableCell>
            <TableCell>{details.cassisSeries}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
