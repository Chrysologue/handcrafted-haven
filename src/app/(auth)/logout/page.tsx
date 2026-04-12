import { logoutAction } from "../utils/actions";

export default async function Logout() {
  await logoutAction();
  return null;
}