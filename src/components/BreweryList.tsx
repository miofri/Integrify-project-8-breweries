import { Fade, List, ListItemButton } from "@mui/material";

import { mainTheme } from "../themes/mainTheme";
import { BreweryProp } from "../interfaces/BreweryProp";
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
          <Fade in={true}>
            <ListItemButton
              sx={{
                color: mainTheme.palette.text.primary,
                paddingLeft: 0,
              }}
            >
              {data.name}
            </ListItemButton>
          </Fade>
        </Link>
      ))}
    </List>
  );
};
