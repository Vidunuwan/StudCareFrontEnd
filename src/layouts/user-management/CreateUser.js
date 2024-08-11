// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { useState } from "react";

function CreateUser() {
    const [values, setValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validate()) {
            console.log(values);
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
                                    Create User
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox display="flex" justifyContent="center" alignItems="center">
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.firstName}
                                                type="text"
                                                label="First Name"
                                                name="firstName"
                                                fullWidth
                                                value={values.firstName}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.lastName}
                                                type="text"
                                                label="First Name"
                                                name="lastName"
                                                fullWidth
                                                value={values.lastName}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.email}
                                                type="text"
                                                label="Email"
                                                name="email"
                                                fullWidth
                                                value={values.email}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <FormControl fullWidth variant="outlined" error={!!errors.classTeacher}>
                                                <InputLabel id="user-role-select-label">Select user role</InputLabel>
                                                <Select
                                                    labelId="user-role-select-label"
                                                    id="user-role-select"
                                                    name="role"
                                                    label="Select user role"
                                                    sx={{ height: "44px;" }}
                                                    value={values.role}
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value={"student"}>Student</MenuItem>
                                                    <MenuItem value={"teacher"}>Teacher</MenuItem>
                                                    <MenuItem value={"hostelMaster"}>Hostel Master</MenuItem>
                                                    <MenuItem value={"admin"}>Admin</MenuItem>
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
export default CreateUser;