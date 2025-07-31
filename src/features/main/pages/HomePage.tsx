import { Button, Divider } from "@mui/material";
import NoteItem from "../../../components/NoteItem";

const array = new Array(10).fill(null); 
const HomePage = () => {
  return (
    <div className="flex flex-1 gap-3">
      <div className="w-1/4">
        <Button>Create note</Button>
        <Divider/>
        <div>
          {array.map(()=><NoteItem/>)}
        </div>
      </div>
      <div className="w-full flex flex-col">
        <h1 className="text-2xl font-bold">Title</h1>
        <div className="flex-1 w-full rounded-md border p-3">
          hello
        </div>
      </div>
    </div>
  );
};

export default HomePage;
