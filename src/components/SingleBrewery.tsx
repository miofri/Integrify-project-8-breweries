import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Breweries } from "../interfaces/breweries";

import { ContainerStyle, mainTheme } from "../themes/mainTheme";

export const SingleBrewery = () => {
  const [data, setData] = useState<Breweries[]>([]);
  const [loading, setLoading] = useState(true);
  const id = useParams().id;

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
      <ContainerStyle maxWidth="sm" sx={{}}>
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              py: "1rem",
            }}
          >
            <Button variant="outlined" href="/" sx={{ my: "1rem" }}>
              Back to list
            </Button>
            <Button
              variant="outlined"
              href="/search-brewery"
              sx={{ my: "1rem" }}
            >
              Back to search
            </Button>
          </Box>
        </Box>
      </ContainerStyle>
    );
  } else return <div>Brewery not found!</div>;
};
