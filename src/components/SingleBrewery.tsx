import { useEffect, useState } from "react";
import { BrowserRouter as Router, useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Breweries } from "../interfaces/breweries";

import { mainTheme } from "../themes/mainTheme";

export const SingleBrewery = () => {
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
      <Container maxWidth="sm">
        <Box>Loading data...</Box>
      </Container>
    );
  else if (data.length > 0) {
    const brewery = data[0];
    return (
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: mainTheme.palette.background.default,
          mt: "1rem",
          borderRadius: "2rem",
          py: "1rem",
        }}
      >
        <Box sx={{ color: mainTheme.palette.text.primary }}>
          <h2 style={{ color: mainTheme.palette.primary.main }}>
            {brewery.name}
          </h2>
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
            Website:{" "}
            <a
              href={brewery.website_url}
              style={{ color: mainTheme.palette.primary.main }}
            >
              {brewery.website_url}
            </a>
          </p>
          <p>State: {brewery.state}</p>
          <p>Street: {brewery.street}</p>
          <Button variant="outlined" href="/" sx={{ my: "1rem" }}>
            Back to list
          </Button>
        </Box>
      </Container>
    );
  } else return <div>Brewery not found!</div>;
};
