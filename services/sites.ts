import { API, handleAxiosError } from "@/lib/axios/client";
import { Endpoint } from "./endpoint";
import { APISuccess } from "@/lib/axios/types";
import { CreateSiteType, SiteType } from "./types";

const createSite = async (data: CreateSiteType) => {
  try {
    await API.post<APISuccess>(Endpoint.Site.Create, data);
  } catch (error) {
    const message = handleAxiosError(error);
    throw new Error(message);
  }
};

const getAllSites = async (take?: number) => {
  try {
    const response = await API.get<APISuccess<SiteType[]>>(
      Endpoint.Site.GetAll,
      {
        params: {
          take,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const updateSiteImage = async (
  siteID: string,
  data: Pick<CreateSiteType, "image_url">,
) => {
  try {
    await API.patch(Endpoint.Site.Update.replace("{siteID}", siteID), data);
  } catch (error) {
    handleAxiosError(error);
  }
};

const deleteSite = async (siteID: string) => {
  try {
    await API.delete<APISuccess>(
      Endpoint.Site.Delete.replace("{siteID}", siteID),
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

export { createSite, getAllSites, updateSiteImage, deleteSite };
