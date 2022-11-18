import {
  Flex,
  Box,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export default function InfoPage({message}) {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack>
        <Box
          alignSelf={"center"}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={30}
        >
          <Stack alignSelf={"center"} maxW={"lg"}>
            <Text fontSize="3xl" align={"center"}>
              {message}
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
