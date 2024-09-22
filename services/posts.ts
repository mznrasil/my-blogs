import { API, handleAxiosError } from "@/lib/axios/client";
import { APISuccess } from "@/lib/axios/types";
import { CreatePostType, PostSiteType, PostType, SitePostsType } from "./types";
import { Endpoint } from "./endpoint";

const getAllPosts = async (take?: number) => {
  try {
    const response = await API.get<APISuccess<PostType[]>>(
      Endpoint.Post.GetAll,
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

const getAllPostsBySite = async (siteID: string) => {
  try {
    const response = await API.get<APISuccess<PostSiteType>>(
      Endpoint.Post.GetAllBySiteID.replace("{siteID}", siteID),
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const createPost = async (data: CreatePostType) => {
  try {
    const { site_id, ...restData } = data;
    await API.post<APISuccess>(
      Endpoint.Post.Create.replace("{siteID}", site_id),
      restData,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

const getPostById = async (siteID: string, postID: string) => {
  try {
    const response = await API.get<APISuccess<PostType>>(
      Endpoint.Post.GetByID.replace("{siteID}", siteID).replace(
        "{postID}",
        postID,
      ),
    );
    return response.data.data;
  } catch (error) {
    //console.error(error);
    handleAxiosError(error);
  }
};

const updatePost = async ({
  postID,
  data,
}: {
  postID: string;
  data: CreatePostType;
}) => {
  const { site_id, ...restData } = data;

  try {
    await API.patch<APISuccess>(
      Endpoint.Post.Update.replace("{siteID}", site_id).replace(
        "{postID}",
        postID,
      ),
      restData,
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

const deletePost = async (siteID: string, postID: string) => {
  try {
    await API.delete<APISuccess>(
      Endpoint.Post.Delete.replace("{siteID}", siteID).replace(
        "{postID}",
        postID,
      ),
    );
  } catch (error) {
    handleAxiosError(error);
  }
};

const getAllPostsBySubdirectory = async (subdirectory: string) => {
  try {
    const response = await API.get<APISuccess<SitePostsType>>(
      Endpoint.Post.GetAllBySiteSubdirectory.replace(
        "{subdirectory}",
        subdirectory,
      ),
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

const getPostBySlug = async (subdirectory: string, slug: string) => {
  try {
    const response = await API.get<APISuccess<PostType>>(
      Endpoint.Post.GetBySlug.replace("{subdirectory}", subdirectory).replace(
        "{slug}",
        slug,
      ),
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

export {
  getAllPosts,
  getAllPostsBySite,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  getAllPostsBySubdirectory,
  getPostBySlug,
};
