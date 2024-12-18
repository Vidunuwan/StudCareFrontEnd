// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import wardsTableData from "./data/wardsTableData";

import projectsTableData from "layouts/tables/data/projectsTableData";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function WardenWard() {
  const { columns, rows } = wardsTableData();

  const navigate = useNavigate();

  const handleEvaluateStudent = () => {
    navigate("/wards/evaluate-students");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <MDBox>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4caf50", // custom background color
                  color: "#ffffff", // custom text color
                  "&:hover": {
                    backgroundColor: "#388e3c", // custom hover color
                  },
                }}
                onClick={handleEvaluateStudent}
                style={{ marginLeft: "auto" }} // Adjust the styling as needed
              >
                Evaluate Student
              </Button>
            </MDBox>
          </Grid>
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
                  Ward :
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default WardenWard;
