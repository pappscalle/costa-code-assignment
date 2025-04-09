# COSTA: Code Assignment

## Assignment

The main objective is to build a web application that consists of three pages:

- A landing page that shows available vehicles
- An Infomation Overview page that shows detailed information about a vehicle and its active services
- A Service Overview page that shows a list of all services with details. The list should be possible to filter according to service status.

## Getting Started

Checkout this repo

### Install dependencies

```
npm install
```

### Start the mock backend

```
npm run backend
```

### Start the web app

```
npm run dev
```

## Architecture and design decisions

The plan is to use

- React Router 7 in framework mode with file based routing, using SSR.
- TypeScript. Default for React Router 7. 
- Material UI. This one is a bit tricky. MUI is not supported out-of-the-box for RR7. Need some manual work.
   ```
     const cache = createCache({ key: "css", prepend: true });
     <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Outlet />
        </ThemeProvider>
      </CacheProvider>
   ```
   `<CacheProvider>` fixes issues with SSR in MUI. 
 
- Mockoon for mocking the backend / REST endpoints with the provided Mockoon environment file as per instructions.

## Encountered problems

- The provided Mockoon environment was not compatible with the latest version of Mockoon. Needed to manually edit it (ie delete the header), and let Mockoon re-generate it.
- REST API not exactly as defined in the instructions (se notes below)
- Vehicle statuses are pretty slow to load. Need to make UI responsive while loading and / or cache the data once it is loaded.
- React Routes makes a bit of "magic" behind the scenes with the loaders in nested routes. 
  
## REST API

REST API endpoints used:

`/vehicle/list`: List all vehicles. Differs from instructions.

`/vehicle/info?id=$id`: Get detailed information about a certain vehicle. Differs from instructions.

`/vehicle/services?id=$id`: Get services connected to a certain vehicle.




## What more could be done

- Add tests
- Add proper logging
- Extract React components out of the route files to keep them cleaner.
- Extract data loading into their own services/utils.
- Each added feature should be created in their own branches, and squashed into the main branch
