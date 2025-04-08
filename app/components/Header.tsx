import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import LocalShipping from "@mui/icons-material/LocalShipping";

export default function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/">
            <Stack direction="row" spacing={2} alignItems="center" mr={4}>
              <LocalShipping />
              <Typography
                variant="h5"
                noWrap
                sx={{
                  display: "block",
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 600,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                COSTA
              </Typography>
            </Stack>
          </Link>

          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Button
              component={Link}
              to="/vehicles"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              List of Vehicles
            </Button>
            <Button
              component={Link}
              to="/about"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              About
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
