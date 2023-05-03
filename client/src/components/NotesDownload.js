import React, {useState, useEffect} from "react";
import "../styles/Products.css";
import NotesCard from './NotesCard';
import {Select, Text} from "@chakra-ui/react";
import getAllNotes from "../utils/getAllNotes";

const NotesDownload = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [semester, setSemester] = useState('');
  const [displayNotes, setDisplayNotes] = useState([]);

  useEffect(() => {
    async function getData() {
      await getAllNotes(setAllNotes, setDisplayNotes);
    }
    getData();
  }, []);

  useEffect(() => {
    setDisplayNotes(allNotes.length ? allNotes.filter(ele => ele.semester === semester) : [])
  }, [semester])

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
        onChange={(e) => {
          setSemester(e.target.value);
        }}
      >
        <option value="semester1">Semester 1</option>
        <option value="semester2">Semester 2</option>
        <option value="semester3">Semester 3</option>
        <option value="semester4">Semester 4</option>
        <option value="semester5">Semester 5</option>
        <option value="semester6">Semester 6</option>
        <option value="semester7">Semester 7</option>
        <option value="semester8">Semester 8</option>
      </Select>

      <div className="Catalogue">
        {displayNotes?.length ? (
          displayNotes?.map((note) => <NotesCard note={note} />)
        ) : (
          <Text marginBottom={"10px"}>No notes found for this semester</Text>
        )}
      </div>
    </div>
  );
};

export default NotesDownload;