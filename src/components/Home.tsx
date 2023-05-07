import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Button, List, ListItemButton, Pagination } from "@mui/material";

import { ContainerStyle, mainTheme } from "../themes/mainTheme";
import { Link } from "react-router-dom";
import { BreweryList } from "./BreweryList";

export const Home = () => {
  const [page, setPage] = useState(1);
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    const dataGet = async () => {
      const data = await axios
        .get(
          `https://api.openbrewerydb.org/v1/breweries?page=${page}&per_page=20`
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
    <>
      <ContainerStyle maxWidth="sm">
        <Box>
          <h1 style={{ color: mainTheme.palette.primary.main }}>
            Brewery list
          </h1>
          <BreweryList breweries={breweries} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: "1rem",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                color: mainTheme.palette.primary.main,
                alignSelf: "flex-end",
              }}
              href="/search-brewery"
            >
              Search brewery
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: "1rem",
          }}
        >
          <Pagination
            count={410}
            variant="outlined"
            color="primary"
            onChange={handleChange}
          />
        </Box>
      </ContainerStyle>
    </>
  );
};
