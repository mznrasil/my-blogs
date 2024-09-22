import { API, handleAxiosError } from "@/lib/axios/client";
import { Endpoint } from "./endpoint";
import {
  InitiatePaymentPayloadType,
  InitiatePaymentResponse,
  UpdatePaymentStatusPayloadType,
} from "./types";
import { APISuccess } from "@/lib/axios/types";

export const updatePaymentStatus = async (
  data: UpdatePaymentStatusPayloadType,
) => {
  try {
    await API.patch<APISuccess>(Endpoint.Payment.UpdateStatus, data);
  } catch (error) {
    handleAxiosError(error);
  }
};

export const initiatePayment = async (data: InitiatePaymentPayloadType) => {
  try {
    const response = await API.post<APISuccess<InitiatePaymentResponse>>(
      Endpoint.Payment.Initiate,
      data,
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};
