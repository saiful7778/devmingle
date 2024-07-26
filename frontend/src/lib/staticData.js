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
  { tagName: "react" },
  { tagName: "node" },
  { tagName: "express" },
  { tagName: "mongodb" },
  { tagName: "frontend" },
  { tagName: "backend" },
  { tagName: "javascript" },
  { tagName: "mern stack" },
];

export { navLinks, sidebarLinks, postTags };
