import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="p-10">
      <h1>Hello world</h1>
      {user ? (
        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
      ) : (
        <div>
          <RegisterLink>
            <Button>Sign up</Button>
          </RegisterLink>
          <LoginLink>
            <Button>Sign in</Button>
          </LoginLink>
        </div>
      )}
    </div>
  );
}
