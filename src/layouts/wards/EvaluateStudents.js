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
import { useState, useEffect } from "react";
import { Password } from "@mui/icons-material";
import api from "api/api";
import { API_ENDPOINTS } from "api/endpoints";
import Swal from 'sweetalert2'



function EvaluateStudents() {
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

    const getWardens = async () => {
        try {
            const response = await api.get(`${API_ENDPOINTS.GET_USERS}?role=HOSTEL_MASTER`);
            const teachers = response.data;
            return teachers.data;

        } catch (error) {
            return [];
        }
    };

    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const wardens = await getWardens();
            setItems(wardens);
        }
        fetchItems();
    }, []);

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
                                    Evaluate students
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
                                            <MDInput
                                                error={!!errors.wardName}
                                                type="text"
                                                label="Sport Data"
                                                name="sportData"
                                                fullWidth
                                                value={values.wardName}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.wardName}
                                                type="text"
                                                label="Extracurricular Activity Grade"
                                                name="extracurricularActivityGrade"
                                                fullWidth
                                                value={values.wardName}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                    </MDBox>
                                    <MDBox display="flex" justifyContent="center" alignItems="center">
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.wardName}
                                                type="text"
                                                label="Evaluation Month"
                                                name="evaluationMonth"
                                                fullWidth
                                                value={values.wardName}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.wardName}
                                                type="text"
                                                label="Evaluation Year"
                                                name="evaluationYear"
                                                fullWidth
                                                value={values.wardName}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.wardName}
                                                type="text"
                                                label="Behavioral Data"
                                                name="behavioralData"
                                                fullWidth
                                                value={values.wardName}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                    </MDBox>
                                    <MDBox display="flex" justifyContent="center" alignItems="center">
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.wardName}
                                                type="text"
                                                label="Extra Note"
                                                name="extraNote"
                                                fullWidth
                                                value={values.wardName}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.wardName}
                                                type="text"
                                                label="Extracurricular Activities"
                                                name="extracurricularActivities"
                                                fullWidth
                                                value={values.wardName}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.wardName}
                                                type="text"
                                                label="Health Data"
                                                name="healthData"
                                                fullWidth
                                                value={values.wardName}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                    </MDBox>
                                    <MDBox display="flex" justifyContent="center" alignItems="center">
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.wardName}
                                                type="text"
                                                label="Sport Grade"
                                                name="sportGrade"
                                                fullWidth
                                                value={values.wardName}
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
export default EvaluateStudents;
