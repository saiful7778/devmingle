const navLinks = [
  { navName: "Home", path: "/" },
  { navName: "Membership", path: "/membership" },
];

const sidebarLinks = [
  {
    navName: "my profile",
    path: "/dashboard/profile",
    access: ["user", "admin"],
  },
  {
    navName: "add post",
    path: "/dashboard/add_post",
    access: ["user", "admin"],
  },
  { navName: "my post", path: "/dashboard/my_post", access: ["user", "admin"] },
  {
    navName: "users",
    path: "/dashboard/admin/users",
    access: ["admin"],
  },
  {
    navName: "reports",
    path: "/dashboard/admin/reports",
    access: ["admin"],
  },
  {
    navName: "add announcement",
    path: "/dashboard/admin/add_announcement",
    access: ["admin"],
  },
  {
    navName: "all announcement",
    path: "/dashboard/admin/all_announcement",
    access: ["admin"],
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
