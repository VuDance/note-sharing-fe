// NoteItem.tsx
import React from "react";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

interface NoteItemProps {
  item: {
    icon?: React.ReactNode;
    title: string;
  };
  onClick?: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ item, onClick }) => {
  return (
    <ListItemButton onClick={onClick}>
      {item.icon ? (
        <ListItemIcon>{item.icon}</ListItemIcon>
      ) : (
        <ListItemIcon>
          <DescriptionOutlinedIcon className="text-white" />
        </ListItemIcon>
      )}
      <ListItemText primary={item.title} />
    </ListItemButton>
  );
};

export default NoteItem;
