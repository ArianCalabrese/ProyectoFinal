import React, { useEffect, useState } from "react";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";
import DonationCard from "../DonationsPage/components/DonationCard";

const PedidosPage = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [donaciones, setDonaciones] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/donaciones`
        );
        setDonaciones(responseData.donations);
        console.log(responseData.donations);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPost();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <MainNavigation />
      {!isLoading && donaciones ? (
        donaciones.map((val) => {
          return <DonationCard donation={val} />;
        })
      ) : (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
    </React.Fragment>
  );
};

export default PedidosPage;
