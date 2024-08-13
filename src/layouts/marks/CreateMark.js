// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

import Swal from 'sweetalert2';

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
import { useLocation } from "react-router-dom";


function CreateMarks() {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const subjectName = searchParams.get("subject");
    const subjectClass = searchParams.get("class");

    const showAlert = () => {
        Swal.fire({
            title: 'Success!',
            text: 'Subject created success',
            icon: 'success',
        })
    };

    const [values, setValues] = useState({
        subjectName: ""
    });

    const [errors, setErrors] = useState({
        subjectName: ""
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
                const response = await api.post(API_ENDPOINTS.CREATE_SUBJECT, formData);
                const data = response.data;
                console.log("Success", data);
                showAlert();
                setValues({
                    subjectName: ""
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
                                    {subjectName} : {subjectClass}
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox display="flex" justifyContent="center" alignItems="center">
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.academicYear}
                                                type="text"
                                                label="Academic Year"
                                                name="academicYear"
                                                fullWidth
                                                value={values.academicYear}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.termNumber}
                                                type="number"
                                                label="Term Number"
                                                name="termNumber"
                                                fullWidth
                                                value={values.termNumber}
                                                onChange={handleChange}
                                            />
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
export default CreateMarks;