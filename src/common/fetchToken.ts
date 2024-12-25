import axios from "axios";

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

const fetchToken = async (code:string): Promise<TokenResponse | null> => {
  try {
    const response = await axios.post<TokenResponse>(
      "https://api.upstox.com/v2/login/authorization/dialog",
      {
        code,
        client_id: "cbf89967-8210-4ff2-8c46-38a4086636ff",
        redirect_uri: "http://localhost:5173/",
        grant_type: "authorization_code",
      }
    );

    console.log("Access Token Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

export default fetchToken;


