import React, {ReactNode, useContext} from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Stack,
  MenuList,
  Button,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import {CgProfile} from "react-icons/cg";
import {MdSell} from "react-icons/md";
import { BsAlarm } from "react-icons/bs";
import {IconType} from "react-icons";
import {ReactText} from "react";
import { Link as RouterLink, Router, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import verifySignIn from "../utils/verifySignIn";
import getFromLocalStorage from "../utils/getFromLocalStorage";
import userSignOut from "../utils/userSignOut";
import userContext from "../context/userContext";
import {
  BsFillChatDotsFill,
  BsBookFill,
  BsFillCloudDownloadFill,
} from "react-icons/bs";
import {TbNotebook} from "react-icons/tb";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}
const LinkItems: Array<LinkItemProps> = [
  {name: "Home", icon: FiHome, route: "/"},
  // {name: "Favourites", icon: FiStar, route: "/fav"},
  {name: "Upload Books", icon: BsBookFill, route: "/upload"},
  {name: "Upload Notes", icon: TbNotebook, route: "/notes-upload"},
  {name: "Profile", icon: CgProfile, route: "/profile"},
  {name: "My Chats", icon: BsFillChatDotsFill, route: "/messenger"},
  {name: "Download Notes", icon: BsFillCloudDownloadFill, route: "/notes-download"},
];

export default function SidebarWithHeader({children}: {children: ReactNode}) {
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user, setUser} = useContext(userContext);

  useEffect(() => {
    const isLoggedIn = verifySignIn();
    console.log(isLoggedIn);
    if(isLoggedIn){
      setUser({token: getFromLocalStorage('token'), name: getFromLocalStorage('name')});
    }else{
      setUser({token: null, name: null});
    }
  }, []);

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{base: "none", md: "block"}}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{base: 0, md: 60}} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({onClose, ...rest}: SidebarProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{base: "full", md: 60}}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <div className="logo">
            <img
              className="image"
              src={process.env.PUBLIC_URL + "/BookClub.png"}
              alt="Book Club"
              width="40"
              height="40"
            ></img>
            Book<span>Club</span>
          </div>
        </Text>
        <CloseButton display={{base: "flex", md: "none"}} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <RouterLink to={link.route}>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </RouterLink>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({icon, children, ...rest}: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{textDecoration: "none"}}
      _focus={{boxShadow: "none"}}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({onOpen, ...rest}: MobileProps) => {
  const {user, setUser} = useContext(userContext);
  const navigate = useNavigate();

  const signOut = () => {
    userSignOut(setUser);
    navigate('/');
  }

  return (
    <Flex
      ml={{base: 0, md: 60}}
      px={{base: 4, md: 4}}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{base: "space-between", md: "flex-end"}}
      {...rest}
    >
      <IconButton
        display={{base: "flex", md: "none"}}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{base: "flex", md: "none"}}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <div className="logo">
          <img
            className="image"
            src={process.env.PUBLIC_URL + "/BookClub.png"}
            alt="Book Club"
            width="40"
            height="40"
          ></img>
          Book<span>Club</span>
        </div>
      </Text>

      {user.token ? (
        <HStack spacing={{base: "0", md: "6"}}>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{boxShadow: "none"}}
              >
                {/* https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1259&q=80 */}
                <HStack>
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1544502062-f82887f03d1c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                  <VStack
                    display={{base: "none", md: "flex"}}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">{user.name}</Text>
                  </VStack>
                  <Box display={{base: "none", md: "flex"}}>
                    <FiChevronDown />
                  </Box>
                </HStack>
              </MenuButton>
              <MenuList>
                <RouterLink to="/profile">
                  <MenuItem>Profile</MenuItem>
                </RouterLink>
                {/* <MenuItem>Settings</MenuItem>
                <MenuItem>Billing</MenuItem> */}
                <MenuDivider />
                <MenuItem onClick={signOut}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      ) : (
        <Stack direction="row" spacing={4} align="center">
          <RouterLink to="/signup">
            <Button colorScheme="teal" variant="solid">
              Sign Up
            </Button>
          </RouterLink>

          <RouterLink to="/signin">
            <Button colorScheme="teal" variant="outline">
              Sign in
            </Button>
          </RouterLink>
        </Stack>
      )}
    </Flex>
  );
};
