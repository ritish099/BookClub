import {
  Box,
  Center,
  Text,
  Heading,
  List,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

export default function NotesCard({note}) {
  return (
    <Center py={6}>
      <Box
        minW={"300px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <List spacing={3}>
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {note.notesTitle}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              {note.ownerName}
            </Text>
            <Text fontWeight={600} mb={4}>
              <Text fontWeight={600} color={"gray.500"}>
                {"Branch: "}
              </Text>
              {note.branch}
            </Text>
            <Text fontWeight={600} mb={4}>
              <Text fontWeight={600} color={"gray.500"}>
                {"Subject: "}
              </Text>
              {note.subject}
            </Text>
          </List>

          <Button
            mt={2}
            w={"full"}
            bg={"green.400"}
            color={"white"}
            rounded={"xl"}
            boxShadow={"0 5px 20px 0px rgb(72 187 120 / 43%)"}
            _hover={{
              bg: "green.500",
            }}
            _focus={{
              bg: "green.500",
            }}
            onClick={() => {
              //this trick will generate a temp <a /> tag
              var link = document.createElement("a");
              link.href =
                note.file;

              //Set properties as you wise
              link.download = note.notesTitle;
              link.target = "blank";

              //this part will append the anchor tag and remove it after automatic click
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            Download
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
