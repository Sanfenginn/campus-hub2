import { Button, ButtonProps } from "@mui/material";

const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button variant="outlined" fullWidth {...props} />;
};

export default CustomButton;
