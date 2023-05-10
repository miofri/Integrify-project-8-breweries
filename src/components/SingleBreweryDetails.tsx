import { Box, Button, Fade } from "@mui/material";
import React from "react";
import { mainTheme, ButtonGroupContainer } from "../themes/mainTheme";
import { Breweries } from "../interfaces/Breweries";

export const SingleBreweryDetails = ({ brewery }: { brewery: Breweries }) => {
  return (
    <Fade in={true}>
      <Box>
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
        <ButtonGroupContainer>
          <Button variant="outlined" href="/" sx={{ my: "1rem" }}>
            Back to list
          </Button>
          <Button variant="outlined" href="/search-brewery" sx={{ my: "1rem" }}>
            Back to search
          </Button>
        </ButtonGroupContainer>
      </Box>
    </Fade>
  );
};
