import {IconButton, Icon} from "@chakra-ui/react";
import {BsFillChatFill} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ChatButton = () => {
    const navigate = useNavigate();

  return (
    <IconButton
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: "1000000",
      }}
      onClick={() => {navigate("/messenger")}}
      colorScheme="teal"
      size="lg"
      icon={<Icon as={BsFillChatFill} />}
    />
  );
};

export default ChatButton;
