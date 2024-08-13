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

import { useEffect, useState } from "react";
import api from "api/api";
import { API_ENDPOINTS } from "api/endpoints";
import { useNavigate } from "react-router-dom";

export default function data() {

  const [rows, setRows] = useState([]);

  const navigate = useNavigate();

  const authUser = JSON.parse(localStorage.getItem('authUser'));

  const getSubjects = async () => {
    try {
      const response = await api.get(`teacher/${authUser.email}/subjects`);
      const subjects = response.data;

      return subjects.data;

    } catch (error) {
      console.log(error);

      return [
        {
          subjectName: "Maths",
          class: "12A",

        }, {
          subjectName: "SCience",
          class: "8B",
        }
      ];
    }
  };

  useEffect(() => {

    const fetchAndSetUsers = async () => {

      const subjects = await getSubjects();
      const convertedData = convertData(subjects);

      const mappedRows = convertedData.map((subject) => ({
        name: subject.subject.subjectName.toUpperCase(),
        class: <Job title={subject.class.className} />,
        action: (
          <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium"
            onClick={() => navigate(`/marks/create-marks?subject=${subject.subject.subjectName}&class=${subject.class.className}`)}
          >
            Set Mark
          </MDTypography>
        ),
      }));
      setRows(mappedRows);
    };

    fetchAndSetUsers();
  }, []);

  function convertData(input) {
    const output = [];
    input.forEach(subject => {
      subject.classes.forEach(classe => {
        const item = {
          'subject': subject.subject,
          'class': classe
        };
        output.push(item);
      });
    });
    return output;
  }


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
      { Header: "name", accessor: "name", width: "45%", align: "left" },
      { Header: "class", accessor: "class", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: rows,
  };
}
