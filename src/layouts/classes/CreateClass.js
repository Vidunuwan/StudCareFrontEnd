// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";

function CreateClass() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h6" fontWeight="medium" color="white" mt={1}>
                  Create Class
                </MDTypography>
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox display="flex" justifyContent="center" alignItems="center">
                    <MDBox m={1} pb={2} width={"25%"}>
                      <MDInput type="text" label="Class Name" fullWidth></MDInput>
                    </MDBox>
                    <MDBox m={1} pb={2} width={"25%"}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="teacher-select-label">Select class teacher</InputLabel>
                        <Select
                          labelId="teacher-select-label"
                          id="techer-select"
                          label="Select class teacher"
                          sx={{ height: "44px;" }}
                        >
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
export default CreateClass;
