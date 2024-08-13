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



function CreateWard() {
    const [values, setValues] = useState({
        wardName: "",
        hostelMaster: {
            email: ""
        },
    });

    const [errors, setErrors] = useState({
        wardName: "",
        hostelMaster: {
            email: ""
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "hostelMaster") {
            setValues({
                ...values,
                hostelMaster: {
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
            text: 'Ward created success',
            icon: 'success',
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            const formData = values;
            console.log(formData);
            try {
                const response = await api.post(API_ENDPOINTS.CREATE_WARD, formData);
                const data = response.data;
                showAlert();
                setValues({
                    wardName: "",
                    hostelMaster: {
                        email: ""
                    },
                });
            } catch (error) {
                console.log("Error", error);
                setValues({
                    wardName: "",
                    hostelMaster: {
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
                                                error={!!errors.wardName}
                                                type="text"
                                                label="Ward Name"
                                                name="wardName"
                                                fullWidth
                                                value={values.wardName}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <FormControl fullWidth variant="outlined" error={!!errors.hostelMaster.email}>
                                                <InputLabel id="teacher-select-label">Select warden</InputLabel>
                                                <Select
                                                    labelId="teacher-select-label"
                                                    id="techer-select"
                                                    name="hostelMaster"
                                                    label="Select warden"
                                                    sx={{ height: "44px;" }}
                                                    value={values.hostelMaster.email}
                                                    onChange={handleChange}
                                                >
                                                    <MenuItem value={'warden1@gmail.com'}>Warden 1</MenuItem>
                                                    <MenuItem value={'warden2@gmail.com'}>Warden 2</MenuItem>
                                                    <MenuItem value={'warden3@gmail.com'}>Warden 3</MenuItem>
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
export default CreateWard;
