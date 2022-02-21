import { Box, Tab, Tabs, Typography } from "@material-ui/core";
import { padding } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import { UserContext } from "../../shared/context/UserContext";
import { useHttpClient } from "../../shared/hooks/http-hook";
import DonationCard from "./components/DonationCard";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const DonationsPage = () => {
  const [value, setValue] = useState(0);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [donaciones, setDonaciones] = useState([]);
  const [donacionesRealizadas, setDonacionesRealizadas] = useState([]);
  const [donacionesRecibidas, setDonacionesRecibidas] = useState([]);

  const auth = useContext(UserContext);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/donaciones/recibidas/${auth.userId}`
        );
        setDonacionesRealizadas(responseData.donations);
        setDonaciones(responseData.donations);
        console.log(responseData.donations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [sendRequest]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDonacionesRealizadas = (event) => {
    setDonaciones(donacionesRealizadas);
  };

  const handleDonacionesRecibidas = async (e) => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/posts/donaciones/realizadas/${auth.userId}`
      );
      console.log(responseData.donations);
      setDonacionesRecibidas(responseData.donations);
      setDonaciones(responseData.donations);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <React.Fragment>
      <MainNavigation />
      <ErrorModal error={error} onClear={clearError} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tab
              label="Donaciones Realizadas"
              style={{ flex: "2" }}
              onClick={handleDonacionesRealizadas}
            />
            <Tab
              label="Donaciones Recibidas"
              style={{ flex: "2" }}
              onClick={handleDonacionesRecibidas}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Box sx={{ padding: "1rem" }}>
            {!isLoading && donaciones ? (
              donaciones.map((val) => {
                return <DonationCard donation={val} />;
              })
            ) : (
              <div className="center">
                <LoadingSpinner />
              </div>
            )}
          </Box>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Box sx={{ padding: "1rem" }}>
            {!isLoading && donaciones ? (
              donaciones.map((val) => {
                return <DonationCard donation={val} />;
              })
            ) : (
              <div className="center">
                <LoadingSpinner />
              </div>
            )}
          </Box>
        </TabPanel>
      </Box>
    </React.Fragment>
  );
};

export default DonationsPage;
