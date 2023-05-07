import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { List, ListItemButton, Pagination } from "@mui/material";
import { Breweries } from "./interfaces/breweries";

const Home = () => {
  const [page, setPage] = useState(1);
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    const dataGet = async () => {
      const data = await axios
        .get(
          `https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=22`
        )
        .then((response) => response.data)
        .catch((err) => {
          throw new Error("Axios get failed!");
        });
      return setBreweries(data);
    };
    dataGet();
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: "#ebebeb" }}>
        <List>
          <h1>Brewery list</h1>
          {breweries.map((data: any) => (
            <Link key={data.id} to={`/brewery/${data.id}`}>
              <ListItemButton>{data.name}</ListItemButton>
            </Link>
          ))}
        </List>
        <Pagination
          count={373}
          variant="outlined"
          color="primary"
          onChange={handleChange}
        />
      </Box>
    </Container>
  );
};

const SingleBrewery = () => {
  const [data, setData] = useState<Breweries[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuState, setMenuState] = useState(false);

  const id = useParams().id;
  const handleClick = () => {
    setMenuState(!menuState);
  };

  useEffect(() => {
    const finalData = async (id: string | undefined) => {
      const response = await axios
        .get(`https://api.openbrewerydb.org/v1/breweries/${id}`)
        .then((response) => response.data)
        .catch((err) => {
          throw new Error("Axios get failed!");
        });

      setData([response]);
      setLoading(false);
    };
    finalData(id);
  }, [id]);
  if (loading)
    return (
      <Container
        maxWidth="sm"
        style={{
          background: "#ebebeb",
        }}
      >
        <Box>Loading data...</Box>
      </Container>
    );
  else if (data.length > 0) {
    const brewery = data[0];
    return (
      <Container
        maxWidth="sm"
        style={{
          background: "#ebebeb",
        }}
      >
        <Box>
          <h2>{brewery.name}</h2>
          <p>Brewery type: {brewery.brewery_type}</p>
          <p>Address: {brewery.address_1}</p>
          <p>City: {brewery.city}</p>
          <p>State: {brewery.state_province}</p>
          <p>Postal code: {brewery.postal_code}</p>
          <p>Country: {brewery.country}</p>
          <p>Longitude: {brewery.longitude}</p>
          <p>Latitude: {brewery.latitude}</p>
          <p>Phone: {brewery.phone}</p>
          <p>
            Website: <a href={brewery.website_url}>{brewery.website_url}</a>
          </p>
          <p>State: {brewery.state}</p>
          <p>Street: {brewery.street}</p>
          <Button variant="outlined" href="/">
            Back to list
          </Button>
        </Box>
      </Container>
    );
  } else return <div>Brewery not found!</div>;
};

export const App = () => {
  // const [breweries, setBreweries] = useState([]);

  // useEffect(() => {
  //   const dataGet = async () => {
  //     const data = await axios
  //       .get("https://api.openbrewerydb.org/v1/breweries")
  //       .then((response) => response.data)
  //       .catch((err) => {
  //         throw new Error("Axios get failed!");
  //       });
  //     return setBreweries(data);
  //   };
  //   dataGet();
  // }, []);

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />}></Route>
          <Route path="brewery/:id" element={<SingleBrewery />}></Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
