import { Box, Button, Fade, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  mainTheme,
  ContainerStyle,
  ButtonGroupContainer,
} from "../themes/mainTheme";
import { Breweries } from "../interfaces/breweries";
import { BreweryList } from "./BreweryList";

export const SearchBrewery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [toggle, setToggle] = useState(true);
  const [breweries, setBreweries] = useState<Breweries[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | undefined
  ) => {
    if (e !== undefined) setSearchTerm(e?.target.value);
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    setToggle(!toggle);
  };

  useEffect(() => {
    const getMatchingBrewery = async () => {
      const data = await axios
        .get(
          `https://api.openbrewerydb.org/v1/breweries/search?query=${searchTerm}`
        )
        .then((response) => response.data)
        .catch((err) => {
          throw new Error("fetching data failed!");
        });
      console.log(data);

      return setBreweries(data);
    };
    getMatchingBrewery();
  }, [toggle]);

  return (
    <ContainerStyle>
      <Box>
        <h2 style={{ color: mainTheme.palette.primary.main }}>
          Search brewery
        </h2>
        <TextField
          id="filled-basic"
          label="Filled"
          variant="filled"
          onChange={handleChange}
          sx={{ width: "100%" }}
        />
        <ButtonGroupContainer>
          <Button onClick={handleClick} variant="outlined" sx={{ my: "1rem" }}>
            Search
          </Button>
          <Button href="/" variant="outlined" sx={{ my: "1rem" }}>
            Back to list
          </Button>
        </ButtonGroupContainer>
      </Box>
      <Box>
        <BreweryList breweries={breweries} />
      </Box>
    </ContainerStyle>
  );
};
