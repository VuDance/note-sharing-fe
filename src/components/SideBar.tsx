import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  List,
  Modal,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import HomeIcon from "@mui/icons-material/Home";
import { useCallback, useEffect, useState } from "react";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import type { MenuItem } from "@/types/menu-item";
import type { Note } from "@/types/note";
import { deleteNote, getNotesByAuthorIdAndTitle } from "@/services/noteService";
import Toast from "@/utils/toast";
import { debounce } from "lodash";

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

type SideBarProps = {
  list: Note[];
  handleCreateNote?: () => void;
  handleDeleteNote?: (id: string) => void;
};

const SideBar = ({
  list,
  handleCreateNote,
  handleDeleteNote,
}: SideBarProps) => {
  const [open, setOpen] = useState(false);
  const [searchList, setSearchList] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const debouncedHandleSearch = useCallback(
    debounce(async (searchTerm: string) => {
      const res = await getNotesByAuthorIdAndTitle(searchTerm);
      setSearchList(res);
    }, 500),
    []
  );
  const handleSearch = async (searchTerm: string) => {
    setLoading(true);
    debouncedHandleSearch(searchTerm);
    setLoading(false);
  };

  const menu = [
    {
      title: "Search",
      icon: <SearchIcon className="text-white" />,
      onClick: handleOpen,
    },
    {
      title: "Home",
      icon: <HomeIcon className="text-white" />,
      onClick: () => navigate("/"),
    },
  ];

  const handleChangeRoute = (page: string) => {
    navigate(`/edit-note/${page}`);
    setOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id).then(() => {
      Toast.success("Note deleted successfully!");
    });
    handleDeleteNote?.(id);
  };

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("userId");
      localStorage.removeItem("accessToken");
      setLoading(false);
      navigate("/login");
    }, 1000);
  };
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="col-span-2 relative bg-[#202020] h-screen flex flex-col p-3 gap-6">
      <div className="flex justify-between items-center sticky top-0 bg-[#202020] z-10 pb-2">
        <Avatar>{username[0]}</Avatar>
        <div className="text-white">{username}</div>
        <IconButton aria-label="create" onClick={handleCreateNote}>
          <NoteAddOutlinedIcon className="text-white" />
        </IconButton>
      </div>

      {/* Menu */}
      <Box>
        <List>
          {menu.map((item: MenuItem, index: number) => (
            <NoteItem item={item} key={index} onClick={item.onClick} />
          ))}
        </List>
      </Box>

      <div className="flex-1 overflow-y-auto flex flex-col gap-3 text-white">
        {/* Sticky tiêu đề */}
        <div className="sticky top-0 bg-[#202020] z-10">Danh sách note</div>

        {/* Nội dung có thể scroll */}
        <div className="flex flex-col">
          {list.map((x: Note, idx: number) => (
            <NoteItem
              item={{ title: x.title }}
              key={idx}
              onClick={() => handleChangeRoute(x.id)}
              onDelete={() => handleDelete(x.id)}
            />
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
              <div className="mb-3">
                <TextField
                  fullWidth
                  placeholder="Search notes..."
                  onChange={(e) => handleSearch(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    notched: false,
                  }}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon className="text-white" />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{
                    padding: "0",
                    input: {
                      width: "100%",
                      padding: "0",
                      color: "white",
                      fontSize: "1.2rem",
                    },
                    "& .MuiInputBase-root": {
                      padding: "0",
                      width: "100%",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                {loading ? (
                  <div className="text-white text-center">Loading...</div>
                ) : searchList.length === 0 ? (
                  <div className="text-white text-center">No results found</div>
                ) : (
                  searchList.map((note) => (
                    <NoteItem
                      key={note.id}
                      item={{ title: note.title }}
                      onClick={() => handleChangeRoute(note.id)}
                    />
                  ))
                )}
              </div>
            </Box>
          </Modal>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-[#202020] p-4 text-center text-white">
        <Button
          sx={{
            textTransform: "none",
            width: "100%",
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          variant="contained"
          onClick={handleLogout}
        >
          {loading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            "Đăng xuất"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
