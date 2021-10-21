import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import MainNavigation from "../../shared/components/Navigation/MainNavigation";
import { useHttpClient } from "../../shared/hooks/http-hook";
import PostList from "../../posts/components/PostList";
import ErrorModal from "../../shared/components/UiElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UiElements/LoadingSpinner";

const UserPage = () => {
  const [loadedPosts, setLoadedPosts] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/posts/user/${userId}`
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {
        console.log(err);
      }
    };
    fetchPosts();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <MainNavigation />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          style={{
            width: "80%",
            margin: "2rem",
            display: "flex",
            flexDirection: "row",
            padding: "1rem",
            flex: "1",
          }}
        >
          <Box
            sx={{
              flex: "0.5",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format"
              alt=""
            />
          </Box>
          <Box sx={{ flex: "3" }}>
            <Typography variant="h3">Arian Calabrese</Typography>
            <Typography variant="h5">Cantidad de Posts: 5</Typography>
            <Typography variant="h5">Miembro desde: 10/04/2021</Typography>
            <Typography variant="h5">Es transportista: No</Typography>
          </Box>
        </Paper>
        <Typography variant="h3">Posts de Arian Calabrese</Typography>
        <Paper
          style={{
            width: "95%",
            margin: "2rem",
            padding: "1rem",
          }}
        >
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && loadedPosts && <PostList items={loadedPosts} />}
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default UserPage;
