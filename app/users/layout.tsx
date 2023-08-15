import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import UserList from "./components/UserList";

// can called get user without API call
export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  const users = await getUsers();

  return (
    <Sidebar>
      <UserList items={users} />
      <div className="h-full">{children}</div>
    </Sidebar>
  );
}
