import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Button, Fade, Pagination } from "@mui/material";
import { TransitionGroup } from "react-transition-group";

import {
  ButtonGroupContainer,
  ContainerStyle,
  mainTheme,
} from "../themes/mainTheme";
import { BreweryList } from "./BreweryList";

export const Home = () => {
  const [page, setPage] = useState(1);
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    const dataGet = async () => {
      const data = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=20`
      );
      const finalData = data.data;
      return setBreweries(finalData);
    };
    dataGet();
  });

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  return (
    <>
      <ContainerStyle>
        <Fade in={true}>
          <Box>
            <h1 style={{ color: mainTheme.palette.primary.main }}>
              Brewery list
            </h1>
            <BreweryList breweries={breweries} />
            <ButtonGroupContainer>
              <Button
                variant="outlined"
                sx={{
                  color: mainTheme.palette.primary.main,
                }}
                href="/search-brewery"
              >
                Search brewery
              </Button>
            </ButtonGroupContainer>
            <ButtonGroupContainer>
              <Pagination
                count={410}
                variant="outlined"
                color="primary"
                onChange={handleChange}
              />
            </ButtonGroupContainer>
          </Box>
        </Fade>
      </ContainerStyle>
    </>
  );
};
