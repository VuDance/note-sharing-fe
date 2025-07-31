import { Button } from "@mui/material";

const Header = () => {
  return (
    <div className="flex w-full justify-between items-center flex-row">
      <div>Logo</div>
      <div>
        <Button variant="contained" color="primary">
          Login
        </Button>
        <Button variant="outlined" color="secondary">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Header;
