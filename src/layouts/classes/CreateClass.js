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
import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { useState } from "react";
import { Password } from "@mui/icons-material";
import api from "api/api";
import { API_ENDPOINTS } from "api/endpoints";
import Swal from 'sweetalert2'


function CreateClass() {
  const [values, setValues] = useState({
    className: "",
    classTeacher: {
      email: ""
    },
  });

  const [errors, setErrors] = useState({
    className: "",
    classTeacher: {
      email: ""
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "classTeacher") {
      setValues({
        ...values,
        classTeacher: {
          email: value,
        },
      });
    } else {
      setValues({ ...values, [name]: value });
    }
  };

  const validate = () => {
    let newErrors = { ...errors };
    let isValid = true;
    for (let key in values) {
      if (values[key] === "") {
        newErrors[key] = "This " + key + " field is required";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }
    setErrors(newErrors);
    return isValid;
  };

  const showAlert = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Class created success',
      icon: 'success',
    })
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const formData = values;
      console.log(formData);
      try {
        const response = await api.post(API_ENDPOINTS.CREATE_CLASS, formData);
        const data = response.data;
        showAlert();
        setValues({
          className: "",
          classTeacher: {
            email: ""
          },
        });
      } catch (error) {
        console.log("Error", error);
        setValues({
          className: "",
          classTeacher: {
            email: ""
          },
        });
      }
    } else {
      console.log("Error", errors);
    }
  };

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
                      <MDInput
                        error={!!errors.className}
                        type="text"
                        label="Class Name"
                        name="className"
                        fullWidth
                        value={values.className}
                        onChange={handleChange}
                      />
                    </MDBox>
                    <MDBox m={1} pb={2} width={"25%"}>
                      <FormControl fullWidth variant="outlined" error={!!errors.classTeacher.email}>
                        <InputLabel id="teacher-select-label">Select class teacher</InputLabel>
                        <Select
                          labelId="teacher-select-label"
                          id="techer-select"
                          name="classTeacher"
                          label="Select class teacher"
                          sx={{ height: "44px;" }}
                          value={values.classTeacher.email}
                          onChange={handleChange}
                        >
                          <MenuItem value={'teacher3@gmail.com'}>Teacher 3</MenuItem>
                          <MenuItem value={'teacher2@gmail.com'}>Teacher 2</MenuItem>
                          <MenuItem value={'teacher1@gmail.com'}>Teacher 1</MenuItem>
                        </Select>
                      </FormControl>
                    </MDBox>
                  </MDBox>
                  <MDBox m={1} pb={2} display="flex" justifyContent="end">
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#4caf50", // custom background color
                        color: "#ffffff", // custom text color
                        "&:hover": {
                          backgroundColor: "#388e3c", // custom hover color
                        },
                      }}
                      onClick={handleSubmit}
                    >
                      Save
                    </Button>
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
