import { Card, CardContent, Typography, Box } from "@mui/material";

const DashboardPage: React.FC = () => {
  return (
    <Box
      className="h-full"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: 600, padding: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold" }}
          >
            Welcome to Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center">
            This is your central hub for managing your activities and getting
            the latest updates. Explore the features and have a great
            experience!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DashboardPage;
