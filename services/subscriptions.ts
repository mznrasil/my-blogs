import { API, handleAxiosError } from "@/lib/axios/client";
import {
  CreateSubscriptionType,
  SubscriptionType,
  UpdateSubscriptionType,
} from "./types";
import { Endpoint } from "./endpoint";
import { APISuccess } from "@/lib/axios/types";

export const createSubscription = async (data: CreateSubscriptionType) => {
  try {
    await API.post<APISuccess>(Endpoint.Subscription.Create, data);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const getSubscriptionByID = async (id: string) => {
  try {
    const response = await API.get<APISuccess<SubscriptionType>>(
      Endpoint.Subscription.GetByID.replace("{id}", id),
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export const updateSubscription = async (data: {
  id: string;
  data: UpdateSubscriptionType;
}) => {
  const { id, ...rest } = data;
  try {
    await API.patch<APISuccess>(
      Endpoint.Subscription.Update.replace("{id}", id),
      rest,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};
