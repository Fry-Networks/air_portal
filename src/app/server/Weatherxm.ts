"use server";
import axios from "axios";
import "dotenv/config";
import { StatusColors } from "./consts";

const weatherXMUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}/api/submitXMToken`;
export async function weatherXMLinkToken(
    username: string,
    password: string,
    address: string
  ): Promise<{
    verified: boolean;
    data: {
      message: string;
      color: string;
    };
  }> {
    let returnData: {
      verified: boolean;
      data: {
        message: string;
        color: string;
      };
    } = {
      verified: false,
      data: {
        message:
          "We were unable to verify your credentials. Please try again later, if the problem persists, contact simon.",
        color: StatusColors.ERROR,
      },
    };
    try {
      await axios
        .post(weatherXMUrl, { username, password, address })
        .then((response) => {
          const data: {
            message: string;
            status: "ERROR" | "SUCCESS";
          } = response.data;
  
          if (response.status === 200) {
            returnData = {
              verified: true,
              data: {
                message: data.message,
                color:
                  data.status === "ERROR"
                    ? StatusColors.ERROR
                    : StatusColors.SUCCESS,
              },
            };
          }
        })
        .catch((error) => {
            let message = "We were unable to verify your credentials. Please try again later, if the problem persists, contact simon.";
            let color = StatusColors.ERROR;
            if(error.response){
          console.log(error.response);
          message =
            error.response?.status === 429
              ? "You have made too many requests, please try again later."
              : error.response?.data.message;
          color = error.response?.data.status
            ? error.response?.data.status === "ERROR"
              ? StatusColors.ERROR
              : StatusColors.SUCCESS
            : StatusColors.ERROR;
            }
          returnData = {
            verified: false,
            data: {
              message: message,
              color: color,
            },
          };
        });
    } catch (error) {
      console.log(error);
      returnData = {
        verified: false,
        data: {
          message:
            "We were unable to verify your credentials. Please try again later, if the problem persists, contact simon.",
          color: StatusColors.ERROR,
        },
      };
    }
    return returnData;
  }