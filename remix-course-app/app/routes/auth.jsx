import authStyles from '~/styles/auth.css'
import AuthForm from '~/components/auth/AuthForm'

export const meta = () => {
    return [
      { title: "Auth" },
      { name: "description", content: "Auth Page" },
    ];
  };
  
  export default function AuthPage() {
    return (
     <AuthForm/>
    );
  }
  
  export function links() {
    return [{rel: 'stylesheet', href: authStyles}]
}