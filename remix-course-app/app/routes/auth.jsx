import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";
import MainHeader from "~/components/navigation/MainHeader";
import { validateCredentials } from "~/data/validation.server";
import { signup, login } from "~/data/auth.server";
// import { redirect } from "@remix-run/node";

// export const meta = () => {
//   return [{ title: "Auth" }, { name: "description", content: "Auth Page" }];
// };

export default function AuthPage() {
  return (
    <>
      <MainHeader />;
      <AuthForm />
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  // validate user input
  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  try {
    if (authMode === "login") {
      return await login(credentials)
    } else {
      return await signup(credentials);
    }
  } catch (error) {
    if (error.status === 422) {
      return { credentials: error.message };
    }
  }
}
