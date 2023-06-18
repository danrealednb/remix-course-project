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
