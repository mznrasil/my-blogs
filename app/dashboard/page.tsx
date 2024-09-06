import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function DashboardIndexPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <h1>Welcome, {user.given_name} to the dashboard page.</h1>
    </div>
  );
}
