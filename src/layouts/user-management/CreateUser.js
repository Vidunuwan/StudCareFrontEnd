// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

import Swal from 'sweetalert2'

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import { Button, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import { useState } from "react";
import api from "api/api";
import { API_ENDPOINTS } from "api/endpoints";


function CreateUser() {

    const showAlert = () => {
        Swal.fire({
            title: 'Success!',
            text: 'User created success',
            icon: 'success',
        })
    };

    const [values, setValues] = useState({
        username: "",
        password: "",
        email: "",
        role: "",
        isClassTeacher: false
    });

    const [errors, setErrors] = useState({
        username: "",
        password: "",
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            const formData = values;
            console.log(formData);

            try {
                const response = await api.post(API_ENDPOINTS.CREATE_USERS, formData);
                const data = response.data;
                console.log("Success", data);
                showAlert();
                setValues({
                    username: "",
                    password: "",
                    email: "",
                    role: "",
                });
            } catch (error) {
                console.log("Error", error);
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
                                                label="User Name"
                                                name="username"
                                                fullWidth
                                                value={values.username}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.lastName}
                                                type="password"
                                                label="Password"
                                                name="password"
                                                fullWidth
                                                value={values.password}
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
                                                    <MenuItem value={"STUDENT"}>Student</MenuItem>
                                                    <MenuItem value={"TEACHER"}>Teacher</MenuItem>
                                                    <MenuItem value={"HOSTEL_MASTER"}>Hostel Master</MenuItem>
                                                    <MenuItem value={"ADMINISTRATOR"}>Admin</MenuItem>
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