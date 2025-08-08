import {
  Avatar,
  Box,
  Button,
  IconButton,
  List,
  Modal,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import NoteItem from "../../../components/NoteItem";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "#202020",
  border: "2px solid #000",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const HomePage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const array = [
    "text1",
    "text2",
    "text3",
    "text4",
    "text1",
    "text2",
    "text3",
    "text4",
    "text1",
    "text2",
    "text3",
    "text4",
    "text1",
    "text2",
    "text3",
    "text4",
    "text1",
    "text2",
    "text3",
    "text4",
  ];

  const menu = [
    {
      title: "Search",
      icon: <SearchIcon className="text-white" />,
    },
    {
      title: "Home",
      icon: <HomeIcon className="text-white" />,
    },
  ];

  return (
    <div className="grid grid-cols-12 h-screen overflow-hidden">
      <div className="col-span-2 bg-[#202020] h-screen flex flex-col p-3 gap-6">
        <div className="flex justify-between items-center sticky top-0 bg-[#202020] z-10 pb-2">
          <Avatar>H</Avatar>
          <div className="text-white">Nguyen Vu Dang</div>
          <IconButton aria-label="create">
            <NoteAddOutlinedIcon className="text-white" />
          </IconButton>
        </div>

        {/* Menu */}
        <Box>
          <List>
            {menu.map((item: any, index: number) => (
              <NoteItem item={item} key={index} onClick={handleOpen} />
            ))}
          </List>
        </Box>

        <div className="flex-1 overflow-y-auto flex flex-col gap-3 text-white">
          {/* Sticky tiêu đề */}
          <div className="sticky top-0 bg-[#202020] z-10">Danh sách note</div>

          {/* Nội dung có thể scroll */}
          <div className="flex flex-col gap-3">
            {array.map((x: string, idx: number) => (
              <NoteItem item={{ title: x }} key={idx} />
            ))}
          </div>
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      </div>

      <div className="col-span-10 bg-[#191919] p-0 h-screen overflow-y-auto text-white">
        <div className="sticky top-0 bg-[#191919] z-10 p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold">Welcome to the Home Page</h1>
        </div>

        <div className="p-6">
          <p className="mb-4">This is the main content area.</p>
          <Box sx={{ height: "2000px" }}>Nội dung dài để test scroll</Box>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
