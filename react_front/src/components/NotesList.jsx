import { Box, Button, Card, CardContent, Typography, Grid, Hidden, CardActions } from "@mui/material";

const NotesList = ({ results, positionData }) => {
  return (
    <Box>
      <Grid container direction={positionData ? "column" : "row"} spacing={2}
            alignItems={positionData ? "center" : "flex-start"}
            >
        {results.map((result, index) => (
          <Grid item xs={6} md={8}  key={index}>
            <Card sx={{ maxWidth:"700px", marginBottom: "40px" }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {result.title}
                </Typography>
                <Typography variant="h6" component="div">
                  {result.text}
                </Typography>
              </CardContent>
              <Hidden smDown={!positionData}>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Hidden>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default NotesList;
