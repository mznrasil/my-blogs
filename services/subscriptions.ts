import { API, handleAxiosError } from "@/lib/axios/client";
import { Endpoint } from "./endpoint";
import { APISuccess } from "@/lib/axios/types";
import { SubscriptionType } from "./types";

export const checkSubscriptionStatus = async () => {
  try {
    const response = await API.get<APISuccess<boolean>>(
      Endpoint.Subscription.CheckStatus,
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getSubscription = async () => {
  try {
    const response = await API.get<APISuccess<SubscriptionType>>(
      Endpoint.Subscription.Get,
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
