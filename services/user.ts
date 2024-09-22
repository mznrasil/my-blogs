import { API, handleAxiosError, PublicAPI } from "@/lib/axios/client";
import { Endpoint } from "./endpoint";
import { CreateUserType, UpdateUserType, UserType } from "./types";
import { APIError, APISuccess } from "@/lib/axios/types";
import { AxiosError } from "axios";

const createUser = async (newUser: CreateUserType) => {
  try {
    await API.post<APISuccess>(Endpoint.User.Create, newUser);
  } catch (err) {
    console.error(err);
    handleAxiosError(err);
  }
};

const getUserByID = async (id: string) => {
  try {
    const response = await API.get<APISuccess<UserType>>(
      Endpoint.User.GetByID.replace("{id}", id.toString()),
    );
    return response.data.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      const error = err as AxiosError<APIError>;
      const code = error.response?.data?.code ?? err.response?.status;
      if (code == 404) {
        return null;
      }
    }
  }
};

const updateCustomerID = async (data: UpdateUserType) => {
  const { id, ...rest } = data;
  try {
    const response = await API.patch<APISuccess<{ customer_id: string }>>(
      Endpoint.User.UpdateCustomerID.replace("{id}", id.toString()),
      rest,
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const getCustomerById = async (customerId: string) => {
  try {
    const response = await PublicAPI.get<APISuccess<UserType>>(
      Endpoint.User.GetCustomerByID.replace("{id}", customerId),
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export { createUser, getUserByID, updateCustomerID, getCustomerById };
