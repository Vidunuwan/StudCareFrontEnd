
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
import { useEffect, useRef, useState } from "react";
import { service } from "powerbi-client";

import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';
import React from 'react'
import * as Msal from 'msal';
import * as powerbi from "powerbi-client";
import * as pbimodels from "powerbi-models";
import { Height } from "@mui/icons-material";
import "./css/StudentDashboard.css"

const authUser = JSON.parse(localStorage.getItem('authUser'));
// App Configurations Settings
const aadTenant = "klnaclk.onmicrosoft.com";
const clientId = "95e40b44-2eba-4f80-99c8-2bb5b0bb9fb2";
const appWorkspaceId = "25152f05-3657-4b6f-b48e-70c92f793211";
const authority = "https://login.microsoftonline.com/" + aadTenant;

const requestScopesPowerBi = {
    scopes: [
        "https://analysis.windows.net/powerbi/api/Dashboard.Read.All",
        "https://analysis.windows.net/powerbi/api/Dataset.Read.All",
        "https://analysis.windows.net/powerbi/api/Report.ReadWrite.All",
        "https://analysis.windows.net/powerbi/api/Group.Read.All",
        "https://analysis.windows.net/powerbi/api/Workspace.ReadWrite.All",
        "https://analysis.windows.net/powerbi/api/Content.Create"
    ]
};


const msalConfig = {
    auth: {
        clientId: clientId,
        authority: authority,
        redirectUri: "http://localhost:3000"
    },

    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};


const userAgent = new Msal.UserAgentApplication(msalConfig);


function StudentDashboard() {

    const [accessToken, setAccessToken] = useState("");
    const [embedReportId, setEmbedReportId] = useState("");
    const [embedUrl, setEmbedUrl] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isTokenAcquiring, setIsTokenAcquiring] = useState(false);


    useEffect(() => {

        if (!isLoggingIn) {

            setIsLoggingIn(true);
            userAgent.loginPopup(requestScopesPowerBi)
                .then((loginResponse) => {
                    console.log("login success...");

                    console.log("This is user Account name got from agent call", loginResponse.account.userName)
                    acquireAccessoken();
                })
                .catch((error) => {
                    console.log("Login error...", error);
                    setIsLoggingIn(false);
                });
        }



    }, []);



    function acquireAccessoken() {

        if (isTokenAcquiring) return;
        setIsTokenAcquiring(true);


        userAgent.acquireTokenSilent(requestScopesPowerBi)
            .then(function (tokenResponse) {
                console.log("Access token acquired silently...");
                setAccessToken(tokenResponse.accessToken);
                console.log("Access token is:" + accessToken);
                fetchReport(tokenResponse.accessToken);
                setIsTokenAcquiring(false);

            }).catch(function (error) {
                console.log(error);
                if (requiresInteraction(error.errorCode)) {
                    userAgent.acquireTokenPopup(requestScopesPowerBi).then((tokenResponse) => {
                        console.log("Access token acquired interactively...");
                        setAccessToken(tokenResponse.accessToken);
                        fetchReport(tokenResponse.accessToken);
                        console.log(accessToken);
                        setIsTokenAcquiring(false);
                    }).catch(function (error) {
                        console.log("Error all the way down the line");
                        setIsTokenAcquiring(false);

                    });
                }
            });

    }



    const fetchReport = async (token) => {
        const apiRoot = "https://api.powerbi.com/v1.0/myorg/";
        const appWorkspaceApiRoot = apiRoot + "groups/" + appWorkspaceId + "/";
        const restUrl = appWorkspaceApiRoot + "reports";

        const restAPiurl = "https://api.powerbi.com/v1.0/myorg/reports/e498b1da-ba5c-458c-aa1f-60c5813f010b"


        try {
            const response = await fetch(restAPiurl, {
                headers: {
                    "Accept": "application/json;odata.metadata=minimal;",
                    "Authorization": "Bearer " + token
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }

            const data = await response.json();
            console.log("=========This is data of report==========", data)


            if (data) {

                // Change the Variable value with useParams for load the Student Data accordingly
                const studentId = authUser.userID;

                const filterExpression = `term_result/studentid eq ${studentId}`;
                const encodedFilterExpression = encodeURIComponent(filterExpression);
                const filterParameter = `filter=${encodedFilterExpression}`;
                const fullEmbedUrl = `${data.embedUrl}&${filterParameter}`;

                setEmbedUrl(fullEmbedUrl)
                setEmbedReportId(data.id)
                console.log("This is embed Url taken by API", data.embedUrl)

            }


        } catch (error) {
            console.log(error)
            console.log("Failed to fetch report: ", error);
        }
    };



    function requiresInteraction(errorCode) {
        if (!errorCode || !errorCode.length) {
            return false;
        }
        return errorCode === "consent_required" ||
            errorCode === "interaction_required" ||
            errorCode === "login_required";
    }


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox py={3}>
                <PowerBIEmbed
                    embedConfig={{

                        type: 'report',
                        id: embedReportId,
                        embedUrl: embedUrl,
                        accessToken: accessToken,
                        tokenType: pbimodels.TokenType.Aad,
                        permissions: pbimodels.Permissions.All,
                        viewMode: pbimodels.ViewMode.View,

                        settings: {
                            panes: {
                                filters: {
                                    expanded: false,
                                    visible: false
                                }
                            },
                            // background: models.BackgroundType.Transparent,
                        }
                    }}

                    eventHandlers={
                        new Map([
                            ['loaded', function (event) {
                                console.log('Report loaded');


                            }],
                            ['rendered', function () { console.log('Report rendered'); }],
                            ['error', function (event) { console.log(event.detail); }],
                            ['visualClicked', () => console.log('visual clicked')],
                            ['pageChanged', (event) => console.log(event)],
                        ])
                    }

                    // Create a css class in app.css file for ajusting the size of report 
                    cssClassName={"Embed-container"}

                    getEmbeddedComponent={(embeddedReport) => {
                        window.Report = embeddedReport;
                    }}
                />
            </MDBox>
        </DashboardLayout>
    );
}

export default StudentDashboard;
