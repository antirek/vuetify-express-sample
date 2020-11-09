import UserHome from "./home.vue";
import UserNew from "./new.vue";
import UserProfile from "./profile.vue";
import UserEdit from "./edit.vue";

const ItemsRoutes = [
  {
    path: "new",
    component: UserNew,
    name: "userNew"
  },
  {
    path: ":id",
    component: UserHome,
    name: "userHome"
  },
  {
    path: ":id/profile",
    component: UserProfile,
    name: "userProfile"
  },
  {
    path: ":id/edit",
    component: UserEdit,
    name: "userEdit"
  }
];

export default ItemsRoutes;
