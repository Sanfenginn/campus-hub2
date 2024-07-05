import { TextField, TextFieldProps } from "@mui/material";

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return <TextField margin="normal" required fullWidth {...props} />;
};

export default CustomTextField;
