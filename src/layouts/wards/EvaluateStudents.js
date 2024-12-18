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
        evaluationMonth: "",
        evaluationYear: "",
        behavioralData: "",
        extraNote: "",
        extracurricularActivities: "",
        healthData: "",
        wardName: "",
        sportData: "",
        extracurricularActivityGrade: "",
        sportGrade: ""
    });

    const [errors, setErrors] = useState({
        evaluationMonth: "",
        evaluationYear: "",
        behavioralData: "",
        extraNote: "",
        extracurricularActivities: "",
        healthData: "",
        wardName: "",
        sportData: "",
        extracurricularActivityGrade: "",
        sportGrade: ""
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

    const showAlert = () => {
        Swal.fire({
            title: 'Success!',
            text: 'Ward created success',
            icon: 'success',
        })
    };

    const [studentEmail, setStudentEmail] = useState();

    const authUser = JSON.parse(localStorage.getItem('authUser'));

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            const formData = values;
            console.log(formData);
            try {
                const response = await api.post(`/hostelmaster/${authUser.email}/student/${studentEmail}/evaluation`, formData);
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

    const getWards = async () => {
        try {
            const response = await api.get(`hostelmaster/${authUser.email}/ward`);
            return response.data.data;

        } catch (error) {
            console.log("Error", error);
            return [];
        }

    }

    const [wardDetails, setWardDetails] = useState();

    const getWardsDetails = async () => {
        try {
            const response = await api.get(`ward/${values.wardName}/details`);
            console.log(response.data.data);
            return response.data.data;

        } catch (error) {
            console.log("Error", error);
            return [];
        }
    }


    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchItems() {
            const wards = await getWards();
            setItems(wards);
        }
        fetchItems();
    }, []);

    useEffect(() => {
        async function fetchItems() {

            const wardDetails = await getWardsDetails();
            setWardDetails(wardDetails);
        }
        fetchItems();
    }, [values.wardName]);

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
                                            <FormControl fullWidth variant="outlined" error={!!errors.classTeacher}>
                                                <InputLabel id="user-role-select-label">Select ward</InputLabel>
                                                <Select
                                                    labelId="user-role-select-label"
                                                    id="user-role-select"
                                                    name="wardName"
                                                    label="Select ward"
                                                    sx={{ height: "44px;" }}
                                                    value={values.wardName}
                                                    onChange={handleChange}
                                                >
                                                    {items.map((item, index) => (
                                                        <MenuItem key={index} value={item.wardDTO.wardName}>{item.wardDTO.wardName}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <FormControl fullWidth variant="outlined" error={!!errors.classTeacher}>
                                                <InputLabel id="user-role-select-label">Select Student</InputLabel>
                                                <Select
                                                    labelId="user-role-select-label"
                                                    id="user-role-select"
                                                    name="student"
                                                    label="Select student"
                                                    sx={{ height: "44px;" }}
                                                    // value={ }
                                                    onChange={handleChange}
                                                >
                                                    {/* {wardDetails && wardDetails[0].students.map((student, index) => (
                                                        <MenuItem key={index} value={student.userDTO.email}>{student.userDTO.email}</MenuItem>
                                                    ))} */}
                                                </Select>
                                            </FormControl>
                                        </MDBox>

                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.sportData}
                                                type="text"
                                                label="Sport Data"
                                                name="sportData"
                                                fullWidth
                                                value={values.sportData}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.extracurricularActivityGrade}
                                                type="text"
                                                label="Extracurricular Activity Grade"
                                                name="extracurricularActivityGrade"
                                                fullWidth
                                                value={values.extracurricularActivityGrade}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                    </MDBox>
                                    <MDBox display="flex" justifyContent="center" alignItems="center">
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.evaluationMonth}
                                                type="text"
                                                label="Evaluation Month"
                                                name="evaluationMonth"
                                                fullWidth
                                                value={values.evaluationMonth}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.evaluationYear}
                                                type="text"
                                                label="Evaluation Year"
                                                name="evaluationYear"
                                                fullWidth
                                                value={values.evaluationYear}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.behavioralData}
                                                type="text"
                                                label="Behavioral Data"
                                                name="behavioralData"
                                                fullWidth
                                                value={values.behavioralData}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.sportGrade}
                                                type="text"
                                                label="Sport Grade"
                                                name="sportGrade"
                                                fullWidth
                                                value={values.sportGrade}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                    </MDBox>
                                    <MDBox display="flex" justifyContent="center" alignItems="center">
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.extraNote}
                                                type="text"
                                                label="Extra Note"
                                                name="extraNote"
                                                fullWidth
                                                value={values.extraNote}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.extracurricularActivities}
                                                type="text"
                                                label="Extracurricular Activities"
                                                name="extracurricularActivities"
                                                fullWidth
                                                value={values.extracurricularActivities}
                                                onChange={handleChange}
                                            />
                                        </MDBox>
                                        <MDBox m={1} pb={2} width={"25%"}>
                                            <MDInput
                                                error={!!errors.healthData}
                                                type="text"
                                                label="Health Data"
                                                name="healthData"
                                                fullWidth
                                                value={values.healthData}
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
