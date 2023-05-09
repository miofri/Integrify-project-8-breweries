import { List, ListItemButton } from "@mui/material";

import { mainTheme } from "../themes/mainTheme";
import { BreweryProp } from "../interfaces/breweries";
import { Link } from "react-router-dom";

export const BreweryList = ({ breweries }: BreweryProp) => {
  return (
    <List>
      {breweries.map((data: any) => (
        <Link
          key={data.id}
          to={`/brewery/${data.id}`}
          style={{ textDecoration: "none" }}
        >
          <ListItemButton
            sx={{
              color: mainTheme.palette.text.primary,
              paddingLeft: 0,
            }}
          >
            {data.name}
          </ListItemButton>
        </Link>
      ))}
    </List>
  );
};
