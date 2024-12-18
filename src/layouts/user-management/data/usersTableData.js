/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import api from "api/api";
import { API_ENDPOINTS } from "api/endpoints";
import { useEffect, useState } from "react";

export default function data() {

  const [rows, setRows] = useState([]);

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
    const fetchAndSetUsers = async () => {
      const users = await getUsers();
      const mappedRows = users.map((user) => ({
        username: user.username,
        function: <Job title={user.role} description={user.classTeacher ? "Class Teacher" : "No organization"} />,
        email: (
          <MDBox ml={-1}>
            <MDBadge badgeContent={user.email} color={user.status === "online" ? "success" : "secondary"} variant="gradient" size="sm" />
          </MDBox>
        ),
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
            Edit
          </MDTypography>
        ),
      }));
      setRows(mappedRows);
    };

    fetchAndSetUsers();
  }, []);


  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "username", accessor: "username", width: "45%", align: "left" },
      { Header: "function", accessor: "function", align: "left" },
      { Header: "email", accessor: "email", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: rows
  };
}
