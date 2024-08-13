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
import { useEffect, useState } from "react";
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
        subjectName: subjectName,
        academicYear: "",
        termNumber: ""
    });

    const [errors, setErrors] = useState({
        academicYear: "",
        termNumber: ""
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

    const authUser = JSON.parse(localStorage.getItem('authUser'));

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            let formData = values;
            formData['studentResults'] = studentsData;
            console.log(formData);

            try {
                const response = await api.post(`teacher/${authUser.email}/subject/result`, formData);
                console.log(response);
                const data = response.data;
                console.log("Success", data);
                showAlert();

            } catch (error) {
                console.log("Error", error);
            }
        } else {
            console.log("Error", errors);
        }
    };

    const getClassStudents = async () => {
        const response = await api.get(`class/${subjectClass}/students`);
        return response.data.data;
    };

    const [students, setStudents] = useState([]);

    useEffect(() => {
        async function fetchStudents() {
            const studentData = await getClassStudents();
            setStudents(studentData);
        }
        fetchStudents();
    }, [])

    const [studentsData, setStudentsData] = useState([]);
    useEffect(() => {
        if (students && students.length > 0) {
            setStudentsData(
                students.map(student => ({
                    studentEmail: student.user.email,
                    marks: 0,
                    teacherNote: "",
                    grade: ""
                }))
            );
        }
    }, [students]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedStudents = [...studentsData];
        console.log(updatedStudents);
        updatedStudents[index][name] = value;
        setStudentsData(updatedStudents);
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
                                    SUBJECT : {subjectName.toUpperCase()} | CLASS : {subjectClass}
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


                                    {students.map((student, index) => (
                                        <MDBox key={index} display="flex" justifyContent="center" alignItems="center">
                                            <MDBox justifyContent="center" alignItems="center" sx={{ fontSize: '11pt' }}>
                                                {student.user.username} :
                                            </MDBox>
                                            <MDBox m={1} pb={2} width={"25%"}>
                                                <MDInput
                                                    // error={!!errors.termNumber}
                                                    type="number"
                                                    label="Mark"
                                                    name="marks"
                                                    fullWidth
                                                    value={studentsData.marks}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                />
                                            </MDBox>

                                            <MDBox m={1} pb={2} width={"25%"}>
                                                <FormControl fullWidth variant="outlined" error={!!errors.classTeacher}>
                                                    <InputLabel id="user-role-select-label">Select grade</InputLabel>
                                                    <Select
                                                        labelId="user-role-select-label"
                                                        id="user-role-select"
                                                        name="grade"
                                                        label="Select grade"
                                                        sx={{ height: "44px;" }}
                                                        value={studentsData.grade}
                                                        onChange={(e) => handleInputChange(index, e)}
                                                    >
                                                        <MenuItem value={"A"}>A</MenuItem>
                                                        <MenuItem value={"B"}>B</MenuItem>
                                                        <MenuItem value={"C"}>C</MenuItem>
                                                        <MenuItem value={"F"}>F</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </MDBox>
                                            <MDBox m={1} pb={2} width={"25%"}>
                                                <MDInput
                                                    // error={!!errors.termNumber}
                                                    type="text"
                                                    label="Teacher Note"
                                                    name="teacherNote"
                                                    fullWidth
                                                    value={studentsData.teacherNote}
                                                    onChange={(e) => handleInputChange(index, e)}
                                                />
                                            </MDBox>
                                        </MDBox>
                                    ))}
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