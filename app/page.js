// app/signup/page.js
import SignupForm from '././components/SignupForm';

export const metadata = {
  title: 'Sign Up - Society Management',
  description: 'Create your account - Society Admin, Resident, or Staff'
};

export default function SignupPage() {
  return <SignupForm />;
}