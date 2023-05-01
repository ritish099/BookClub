import React, {useState, useEffect} from "react";
import "../styles/Products.css";
import NotesCard from './NotesCard';
import {Select, Text} from "@chakra-ui/react";

const NotesDownload = () => {
  const [Notes, setNotes] = useState([]);
  const [semester, setSemester] = useState('');

//   useEffect(() => {
//     async function getData() {
//       await getAllBooks(setBooks);
//     }
//     getData();
//   }, []);

  return (
    <div className="BigDiv">

      <div className="Heading">
        <Text marginBottom={"10px"}>Download notes</Text>
      </div>

      <Select
        variant="filled"
        placeholder="Select Semester"
        bg={"skyblue"}
        width={"300px"}
        mt={10}
        mb={10}
      >
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>

      <div className="Catalogue">
        <NotesCard />
        <NotesCard />
        <NotesCard />
        <NotesCard />
      </div>
    </div>
  );
};

export default NotesDownload;