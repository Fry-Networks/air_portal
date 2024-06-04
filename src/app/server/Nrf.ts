'use server'
import axios from "axios";
import { StatusColors } from "./consts";

export async function submitNrfKey(
    token: string,
    deviceId: string,
    address: string
): Promise<{   message: string; }> {

const submitUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/submitNRF`;
// const submitUrl = 'http://localhost:3005/api/submitNRF'

  try {
    const response = await axios.post(submitUrl, {
      token,
      deviceId,
      address
    });

    if (response.status === 200) {
      const data: { message: string; status: "ERROR" | "SUCCESS" } = response.data;
      const color = data.status === "ERROR" ? StatusColors.ERROR : StatusColors.SUCCESS;

      return {
      
          message: data.message,
        
      };
    } else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    console.error("Error in submitNRFkey:", error);
    throw error;
  }
}
