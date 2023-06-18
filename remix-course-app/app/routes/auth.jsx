import authStyles from "~/styles/auth.css";
import AuthForm from "~/components/auth/AuthForm";
import MainHeader from "~/components/navigation/MainHeader";

export const meta = () => {
  return [{ title: "Auth" }, { name: "description", content: "Auth Page" }];
};

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

export async function actions({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

// validate user input
// TODO: myself

  if (authMode === login) {
    // login
  } else {
    // signup
  }
}
