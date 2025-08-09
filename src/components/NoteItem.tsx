// NoteItem.tsx
import React from "react";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

interface NoteItemProps {
  item: {
    icon?: React.ReactNode;
    title: string;
  };
  onClick?: () => void;
  onDelete?: () => void;
}

const NoteItem: React.FC<NoteItemProps> = ({ item, onClick, onDelete }) => {
  return (
    <ListItem
      secondaryAction={
        onDelete && (
          <IconButton
            edge="end"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        )
      }
      disablePadding
    >
      <ListItemButton onClick={onClick}>
        {item.icon ? (
          <ListItemIcon>{item.icon}</ListItemIcon>
        ) : (
          <ListItemIcon>
            <DescriptionOutlinedIcon className="text-white" />
          </ListItemIcon>
        )}
        <ListItemText className="text-white" primary={item.title} />
      </ListItemButton>
    </ListItem>
  );
};

export default NoteItem;
