import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Fade } from "@mui/material";
import Box from "@mui/material/Box";

import { Breweries } from "../interfaces/Breweries";
import { ContainerStyle } from "../themes/mainTheme";
import { SingleBreweryDetails } from "./SingleBreweryDetails";

export const SingleBrewery = () => {
  const [data, setData] = useState<Breweries[]>([]);
  const [loading, setLoading] = useState(true);
  const id = useParams().id;

  useEffect(() => {
    const finalData = async (id: string | undefined) => {
      if (id !== undefined) {
        const response = await axios.get(
          `https://api.openbrewerydb.org/v1/breweries/${id}`
        );
        const finalData = response.data;
        setData([finalData]);
        setLoading(false);
      } else {
        return (
          <ContainerStyle>
            <Box textAlign={"center"}>Brewery not found</Box>
          </ContainerStyle>
        );
      }
    };
    finalData(id);
  }, [id]);

  if (loading)
    return (
      <ContainerStyle>
        <Box textAlign={"center"}>Loading data...</Box>
      </ContainerStyle>
    );
  else if (data.length > 0) {
    const brewery = data[0];
    return (
      <ContainerStyle>
        <SingleBreweryDetails brewery={brewery} />
      </ContainerStyle>
    );
  } else return <div>Brewery not found!</div>;
};
