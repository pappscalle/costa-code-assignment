import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";

import "./app.css";
import {
  Alert,
  AlertTitle,
  Button,
  Container,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import theme from "~/theme";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import Header from "./components/Header";

const cache = createCache({ key: "css", prepend: true });

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        <Container sx={{ marginTop: 4, marginBottom: 8 }}>{children}</Container>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
    </CacheProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Container>
      <Alert severity="error" variant="filled" sx={{ marginBottom: 2 }}>
        <AlertTitle>{message}</AlertTitle>
        {details}
        {stack && (
          <pre>
            <code>{stack}</code>
          </pre>
        )}
      </Alert>
      <Button component={Link} to="/" variant="contained" color="primary">
        Home
      </Button>
    </Container>
  );
}
