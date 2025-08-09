import { IconButton, InputAdornment, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import TitleIcon from "@mui/icons-material/Title";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { getNoteById, updateNote } from "@/services/noteService";
import Toast from "@/utils/toast";

type EditNotePageProps = {
  updateNoteTitle: (id: string, newTitle: string) => void;
};

const EditNotePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const { updateNoteTitle } = useOutletContext<EditNotePageProps>();

  const contentOnchange = (content: string) => {
    setContent(content);
  };
  const titleOnChange = (title: string) => {
    setTitle(title);
    if (id) {
      updateNoteTitle(id, title);
    }
  };
  const updateNewNote = async () => {
    if (!id) return;
    if (!title || !content) {
      Toast.error("Title and content cannot be empty!");
      return;
    }
    await updateNote(id, { title, content }).then(() =>
      Toast.success("Note updated successfully!")
    );
  };
  const getNodeById = async (id: string) => {
    await getNoteById(id || "").then((res) => {
      setTitle(res.title);
      setContent(res.content);
    });
  };

  useEffect(() => {
    getNodeById(id ?? "");
  }, [id]);
  return (
    <div className="col-span-10 bg-[#191919] p-0 h-screen overflow-y-auto text-white">
      <div className="sticky top-0 text-white bg-[#191919] z-10 p-3 border-b border-gray-700">
        <TextField
          onChange={(e) => titleOnChange(e.target.value)}
          value={title}
          fullWidth
          placeholder="Enter title"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <TitleIcon className="text-white" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={updateNewNote}>
                  <SaveIcon className="text-white" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          variant="outlined"
          sx={{
            input: {
              color: "white",
              fontSize: "1.2rem",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        />
      </div>
      <div className="p-6">
        <SimpleEditor onChange={contentOnchange} content={content} />
      </div>
    </div>
  );
};

export default EditNotePage;
