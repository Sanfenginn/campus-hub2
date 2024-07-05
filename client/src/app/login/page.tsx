import LoginLayout from "@/app/login/layout";
import LoginForm from "@/components/LoginForm";
import { Box } from "@mui/material";

const LoginPage: React.FC = () => {
  return (
    <LoginLayout>
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
        className="shadow-lg flex p-6 flex-column items-center rounded-2xl"
      >
        <LoginForm />
      </Box>
    </LoginLayout>
  );
};

export default LoginPage;
