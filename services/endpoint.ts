export const Endpoint = {
  Payment: {
    Initiate: "/payment/initiate",
    UpdateStatus: "/payment",
  },
  Subscription: {
    CheckStatus: "/subscriptions/status",
    Get: "/subscriptions",
  },
  User: {
    Create: "/users",
    UpdateCustomerID: "/users/{id}",
    GetByID: "/users/{id}",
    GetCustomerByID: "/customers/{id}",
  },
  Site: {
    Create: "/sites",
    GetAll: "/sites",
    Update: "/sites/{siteID}",
    Delete: "/sites/{siteID}",
  },
  Post: {
    GetAll: "/posts",
    Create: "/{siteID}/posts",
    GetAllBySiteID: "/{siteID}/posts",
    GetByID: "/{siteID}/posts/{postID}",
    Update: "/{siteID}/posts/{postID}",
    Delete: "/{siteID}/posts/{postID}",
    GetAllBySiteSubdirectory: "posts/{subdirectory}",
    GetBySlug: "/posts/{subdirectory}/{slug}",
  },
} as const;
