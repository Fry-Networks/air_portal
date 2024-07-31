'use server'
import axios from "axios";
import { StatusColors } from "./consts";

export async function submitAtmotubeKey(
    token: string,
    deviceId: string,
    minerKey: string,
    address: string
): Promise<{
    data: {
        message: string;
        color: string;
    };
}> {
  let returnData: {
    data: {
        message: string;
        color: string;
    };
} = {
    data: {
        message:
            "We were unable to verify your key. Please try again later, if the problem persists, contact simon.",
        color: StatusColors.ERROR,
    },
};

const submitUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/submitAtmotube`;

  try {
    const response = await axios.post(submitUrl, {
      token,
      deviceId,
      minerKey,
      address
    });

    if (response.status === 200) {
      const data: { message: string; status: "ERROR" | "SUCCESS" } = response.data;
      const color = data.status === "ERROR" ? StatusColors.ERROR : StatusColors.SUCCESS;

      return {
      
        data: {
          message: data.message,
          color:
              data.status === "ERROR"
                  ? StatusColors.ERROR
                  : StatusColors.SUCCESS,
      },
        
      };
    } else if (response.status === 400) {
      const data: { message: string; status: "ERROR" | "SUCCESS" } = response.data;
      const color = data.status === "ERROR" ? StatusColors.ERROR : StatusColors.SUCCESS;

      return {
      
        data: {
          message: data.message,
          color:
              data.status === "ERROR"
                  ? StatusColors.ERROR
                  : StatusColors.SUCCESS,
      },
        
      };
    }
    else {
      throw new Error("Unexpected response status");
    }
  } catch (error) {
    console.error("Error in submit Atmotube", error);
    throw error;
  }
}
