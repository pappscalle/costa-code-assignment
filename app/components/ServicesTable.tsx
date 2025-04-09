import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import type { Service } from "~/types";
import { formatDate } from "~/utils/utils";

export interface ServicesTableProps {
  communicationStatus: string;
  services: Service[];
}

export default function ServicesTable({
  services,
  communicationStatus,
}: ServicesTableProps) {
  return (
    <TableContainer component={Paper}>
      {communicationStatus === "ACTIVE" ? (
        <Table>
          <TableBody>
            {communicationStatus == "ACTIVE" &&
              services.map((service: Service) => (
                <TableRow key={service.serviceName}>
                  <TableCell>{service.serviceName}</TableCell>
                  <TableCell>{service.status}</TableCell>
                  <TableCell>{formatDate(service.lastUpdate)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <Typography margin={2} variant="body1" color="error">
          Communication Status: {communicationStatus}
        </Typography>
      )}
    </TableContainer>
  );
}
