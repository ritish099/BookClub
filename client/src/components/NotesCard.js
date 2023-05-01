import {
  Box,
  Center,
  Text,
  Stack,
  Heading,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import {CheckIcon} from "@chakra-ui/icons";

export default function NotesCard({title, userName }) {
  return (
    <Center py={6}>
      <Box
        maxW={"330px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        {/* <Stack
          textAlign={"center"}
          p={6}
          color={useColorModeValue("gray.800", "white")}
          align={"center"}
        >
          <Text
            fontSize={"sm"}
            fontWeight={500}
            bg={useColorModeValue("green.50", "green.900")}
            p={2}
            px={3}
            color={"green.500"}
            rounded={"full"}
          >
            Hobby
          </Text>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text fontSize={"3xl"}>$</Text>
            <Text fontSize={"6xl"} fontWeight={800}>
              79
            </Text>
            <Text color={"gray.500"}>/month</Text>
          </Stack>
        </Stack> */}

        <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
          <List spacing={3}>
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {"title"}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
              {"Arnesh"}
            </Text>
            <Text fontWeight={600} mb={4}>
              <Text fontWeight={600} color={"gray.500"}>
                {"Branch: "}
              </Text>
              {"Computer Science and Engineering"}
            </Text>
            <Text fontWeight={600} mb={4}>
              <Text fontWeight={600} color={"gray.500"}>
                {"Subject: "}
              </Text>
              {"Data Structures"}
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
          >
            Download
          </Button>
        </Box>
      </Box>
    </Center>
  );
}
