import {
  Card,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import React from "react";

const CustomCard = styled(Card)({
  height: 366,
  width: 321,
});

const MyCard = ({
  imageUrl,
  header,
  description,
}: {
  imageUrl?: string;
  header?: string;
  description?: string;
}) => {
  return (
    <CustomCard>
      <CardMedia style={{ width: 321, height: 167 }} image={imageUrl} />
      <CardContent
        style={{
          width: 305,
          height: "100%",
          backgroundColor: "#f8f8f8",
        }}
      >
        <Typography gutterBottom variant="h5" component="div">
          {header}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </CustomCard>
  );
};

export default MyCard;
