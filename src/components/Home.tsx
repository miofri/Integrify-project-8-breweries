import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { List, ListItemButton, Pagination, colors } from "@mui/material";

import { mainTheme } from "../themes/mainTheme";
import { BrowserRouter as Router, Link } from "react-router-dom";

export const Home = () => {
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
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: mainTheme.palette.background.default,
        mt: "1rem",
        borderRadius: "2rem",
      }}
    >
      <Box>
        <List>
          <h1 style={{ color: mainTheme.palette.primary.main }}>
            Brewery list
          </h1>
          {breweries.map((data: any) => (
            <Link
              key={data.id}
              to={`/brewery/${data.id}`}
              style={{ textDecoration: "none" }}
            >
              <ListItemButton
                sx={{
                  color: mainTheme.palette.text.primary,
                }}
              >
                {data.name}
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: "1rem",
        }}
      >
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
