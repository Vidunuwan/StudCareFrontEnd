// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Data
import subjectTableData from "./data/subjectTableData";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "api/api";

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BarChartIcon from '@mui/icons-material/BarChart';

function Analysis() {
  const { columns, rows } = subjectTableData();
  const navigate = useNavigate();

  const handleCreateClass = () => {
    navigate("/marks/create-marks");
  };

  const [prediction, setPrediction] = useState({});

  const authUser = JSON.parse(localStorage.getItem('authUser'));

  useEffect(() => {
    async function fetchPrediction() {
      try {
        const response = await api.get(`student/${authUser.email}/suggestions`);
        if (response && response.status === 200) {
          setPrediction(response.data.data);
        } else {
          console.error(`Unexpected response:`, response);
        }
      } catch (error) {
        console.error('Error fetching prediction:', error);
      }
    }

    fetchPrediction();
  }, []);

  useEffect(() => {
    console.log(prediction[0]);

  }, [prediction])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Predictions
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={3} px={2}>
                {prediction[0] ? (<Typography variant="h4" gutterBottom>
                  Stream: {prediction[0]?.stream}
                </Typography>) : "Pleace wait ..."}
                <Grid container spacing={2}>
                  {prediction[0] && prediction[0].careers.map((career, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                      <Card variant="outlined" sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
                        <MDBox display="flex" alignItems="center" mb={1}>
                          <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                            <WorkIcon />
                          </Avatar>
                          <Typography variant="h6">{career}</Typography>
                        </MDBox>
                        <Divider />
                        <MDBox mt={2}>
                          {/* <Chip icon={<TrendingUpIcon />} label="High Demand" color="success" sx={{ mr: 1 }} />
                          <Chip icon={<BarChartIcon />} label="Growth Potential" color="primary" /> */}
                        </MDBox>
                        <MDBox mt={2}>
                          <Typography variant="body2" color="textSecondary">
                          </Typography>
                        </MDBox>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Analysis;
