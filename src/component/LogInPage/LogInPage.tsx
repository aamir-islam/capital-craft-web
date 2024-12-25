import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface TokenResponse {
  access_token: string;
}

export const LogInPage: React.FC = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const clientId = import.meta.env.VITE_APP_API_KEY;
  const clientSecret = import.meta.env.VITE_APP_SECRET_KEY;
  const redirectUri = import.meta.env.VITE_APP_REDIRECT_URI;

  // Function to initiate login
  const initiateLogin = () => {
    const loginUrl = `https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=`;
    window.location.href = loginUrl;
  };

  // Function to fetch the access token using the authorization code
  const fetchToken = async (code: string) => {
    const tokenUrl = "https://api.upstox.com/v2/login/authorization/token";

    const params = new URLSearchParams();
    params.append("code", code);
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("redirect_uri", redirectUri);
    params.append("grant_type", "authorization_code");

    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch token");
      }

      const data: TokenResponse = await response.json();
      setAccessToken(data.access_token);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  // Handle the redirect URL and extract the code from the URL parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");

    if (code) {
      fetchToken(code);
    }
  }, [location]);

  useEffect(() => {
    if (accessToken) {
      navigateTo("/home");
    }
  }, [accessToken]);

  return (
    <div>
      {!accessToken ? (
        <Button variant="contained" onClick={initiateLogin}>
          Login with Upstox
        </Button>
      ) : (
        <div>
          <Typography>Authentication Successful!</Typography>
          <Typography>Access Token: {accessToken}</Typography>
          <Button variant="contained" onClick={initiateLogin}>
            Log out from Upstox
          </Button>
        </div>
      )}
    </div>
  );
};
