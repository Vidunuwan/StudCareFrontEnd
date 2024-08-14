/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import api from "api/api";
import { API_ENDPOINTS } from "api/endpoints";
import { useEffect, useState } from "react";
import TeachersSubjects from "./components/Subjects";

function WardenDashboard() {
    const { sales, tasks } = reportsLineChartData;

    const [totalUsers, setTotalUsers] = useState({
        students: 0,
        teachers: 0,
        hostelMasters: 0,
        admins: 0,
        total: 0
    });

    const getUsers = async () => {
        try {
            const response = await api.get(`${API_ENDPOINTS.GET_USERS}?role=all`);
            const users = response.data;
            return users.data;

        } catch (error) {
            return [];
        }
    };

    useEffect(() => {

        async function calculateUsers() {
            const users = await getUsers();

            const teachers = users.filter((user) => { return user.role == "TEACHER" });
            const students = users.filter((user) => { return user.role == "STUDENT" });
            const hostelMasters = users.filter((user) => { return user.role == "HOSTEL_MASTER" });
            const admins = users.filter((user) => { return user.role == "ADMINISTRATOR" });

            setTotalUsers({
                students: students.length,
                teachers: teachers.length,
                hostelMasters: hostelMasters.length,
                admins: admins.length,
                total: users.length
            });

        }

        calculateUsers();
    }, [])

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} lg={4}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                color="primary"
                                icon="person_add"
                                title="Total Students"
                                count={totalUsers.total}
                                percentage={{
                                    color: "success",
                                    amount: "",
                                    label: "Just updated",
                                }}
                            />
                        </MDBox>
                    </Grid>
                    <Grid item xs={23} md={6} lg={4}>
                        <MDBox mb={1.5}>
                            <ComplexStatisticsCard
                                icon="school"
                                title="Ward "
                                count={"WARD 1"}
                                percentage={{
                                    color: "success",
                                    amount: "",
                                    label: "Just updated",
                                }}
                            />
                        </MDBox>
                    </Grid>
                </Grid>
                <MDBox mt={4.5}>
                    <Grid container spacing={3}>

                    </Grid>
                </MDBox>
                <MDBox>
                    <Grid container spacing={3}>
                        {/* <Grid item xs={12} md={12} lg={12}>
                            <TeachersSubjects />
                        </Grid> */}
                        {/* <Grid item xs={12} md={6} lg={4}>
                            <OrdersOverview />
                        </Grid> */}
                    </Grid>
                </MDBox>
            </MDBox>
        </DashboardLayout>
    );
}

export default WardenDashboard;
