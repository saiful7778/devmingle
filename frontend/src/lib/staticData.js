const navLinks = [
  { navName: "Home", path: "/" },
  { navName: "Membership", path: "/membership" },
];

const sidebarLinks = [
  { _id: "sd1", navName: "my profile", path: "/dashboard/profile" },
  { _id: "sd2", navName: "add post", path: "/dashboard/add_post" },
  { _id: "sd3", navName: "my post", path: "/dashboard/my_post" },
  {
    _id: "sd4",
    navName: "users",
    path: "/dashboard/admin/users",
    adminRoute: true,
  },
  {
    _id: "sd5",
    navName: "reports",
    path: "/dashboard/admin/reports",
    adminRoute: true,
  },
  {
    _id: "sd6",
    navName: "add announcement",
    path: "/dashboard/admin/add_announcement",
    adminRoute: true,
  },
  {
    _id: "sd7",
    navName: "all announcement",
    path: "/dashboard/admin/all_announcement",
    adminRoute: true,
  },
];

const postTags = [
  { _id: "pt1", tagName: "react" },
  { _id: "pt2", tagName: "node" },
  { _id: "pt3", tagName: "express" },
  { _id: "pt4", tagName: "mongodb" },
  { _id: "pt5", tagName: "frontend" },
  { _id: "pt6", tagName: "backend" },
  { _id: "pt7", tagName: "javascript" },
  { _id: "pt8", tagName: "mern stack" },
];

export { navLinks, sidebarLinks, postTags };
