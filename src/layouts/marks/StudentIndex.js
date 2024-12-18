// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { Accordion, AccordionSummary, AccordionDetails, Typography, CardContent, Table, TableBody, TableCell, TableHead, TableRow, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import subjectTableData from "./data/subjectTableData";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "api/api";


function StudentMarks() {
    const { columns, rows } = subjectTableData();

    const navigate = useNavigate();

    const handleCreateClass = () => {
        navigate("/marks/create-marks");
    };

    const [resultData, setResultData] = useState([]);

    useEffect(() => {
        async function fetchMarks() {
            const responce = await api.get(`student/student5@gmail.com/all/results`);
            setResultData(responce.data.data);
        }
        fetchMarks();
    }, [])
    useEffect(() => {
        console.log(resultData[0]);
    }, [resultData])

    const [expandedYear, setExpandedYear] = useState(false);
    const [expandedTerm, setExpandedTerm] = useState(false);

    const handleYearChange = (year) => {
        setExpandedYear(expandedYear === year ? false : year);
    };

    const handleTermChange = (term) => {
        setExpandedTerm(expandedTerm === term ? false : term);
    };

    const getAvarage = (term) => {
        let total = 0;

        term.subjectResults.forEach(subject => {
            total += parseInt(subject.marks);
        });

        return (total / term.subjectResults.length).toFixed(2);
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <MDBox>
                            {/* You can add any additional content here */}
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
                                    Mark Sheets
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <MDBox pl={3}>
                                    {!resultData[0] ? "   Please wait ..." : ''}
                                </MDBox>

                                {/* Yearly Results Accordion */}
                                {resultData[0]?.yearResults.map((year) => (
                                    <Accordion
                                        key={year.academicYear}
                                        expanded={expandedYear === year.academicYear}
                                        onChange={() => handleYearChange(year.academicYear)}
                                    >
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="h6">Year {year.academicYear}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container spacing={2}>
                                                {year.termResults.map((term) => (
                                                    <Grid item xs={12} sm={4} key={term.termNumber}>
                                                        <Card onClick={() => handleTermChange(term.termNumber)}>
                                                            <CardContent>
                                                                <Typography variant="h6">Term {term.termNumber}</Typography>
                                                                <Typography variant="body2">Average Marks: {getAvarage(term)}%</Typography>
                                                                <CircularProgress variant="determinate" value={getAvarage(term)} />
                                                            </CardContent>
                                                            {expandedTerm === term.termNumber && (
                                                                <AccordionDetails>
                                                                    <Table>
                                                                        <TableHead>
                                                                            <TableRow>
                                                                                <TableCell>Subject</TableCell>
                                                                                <TableCell>Marks</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {term.subjectResults.map((subject) => (
                                                                                <TableRow key={subject.subjectId}>
                                                                                    <TableCell>{subject.subjectName.toUpperCase()}</TableCell>
                                                                                    <TableCell>{subject.marks}</TableCell>
                                                                                </TableRow>
                                                                            ))}
                                                                        </TableBody>
                                                                    </Table>
                                                                </AccordionDetails>
                                                            )}
                                                        </Card>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}

export default StudentMarks;
