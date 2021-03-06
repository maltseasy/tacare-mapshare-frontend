/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    HStack,
    useToast,
    IconButton,
    useDisclosure,
    Spacer,
    Text,
    Drawer,
    DrawerBody,
    VStack,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import { HiMenu } from "react-icons/hi";
import { FiLogOut, FiLogIn } from "react-icons/fi";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Logo } from "./components/Logo";
import { NavLink } from "./components/NavLink";
import { Link } from "react-router-dom";
import { loggedInState, userState } from "../../store";
import { logout } from "../../helpers/persistence";
export function DefaultNavBar() {
    return (
        <Flex alignItems={"center"} justifyContent={"space-between"} p={4} boxShadow="md" h="8vh" w="full">
            <Logo as={Link} to="/" ml={{ base: 2, sm: 4, md: 8 }} />
            <Flex mr={{ base: 2, sm: 4, md: 8 }}>
                <Box _hover={{ backgroundColor: "background.primary", cursor: "pointer" }} borderRadius="sm" p={1} as={Link} to="/login">
                    <HStack>
                        <Text>Login</Text>
                        <FiLogIn size="20" />
                    </HStack>
                </Box>
            </Flex>
        </Flex>
    );
}

function NavBarFunc() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isLoggedIn = useRecoilValue(loggedInState);
    const user = useRecoilValue(userState);

    const loggedInMarkup = (
        <>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">
                        <VStack alignItems="center">
                            <Logo boxSize="200px" my="-8" />
                            <Text>MapShare Mobile</Text>
                        </VStack>
                    </DrawerHeader>
                    <DrawerBody>
                        <VStack spacing={6} alignItems="center" mt="2">
                            <NavLink as={Link} to="/" label={"Home"} onClick={onClose} />
                            <NavLink as={Link} to="/profile" label={"Profile"} onClick={onClose} />

                            <Box
                                onClick={() => {
                                    logout();
                                    window.location.assign("/");
                                }}
                            >
                                <HStack>
                                    <Text>Logout</Text>
                                    <FiLogOut size="16" />
                                </HStack>
                            </Box>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Flex justifyContent={{ base: "flex-start", md: "space-between" }} px={{ base: 8, md: 4 }} boxShadow="md" h="8vh">
                <HStack spacing={2} display={{ base: "inline-flex", md: "none" }}>
                    <IconButton
                        size="lg"
                        icon={isOpen ? <></> : <HiMenu size="30" />}
                        aria-label={"Open Menu"}
                        display={{ md: "none" }}
                        onClick={isOpen ? () => onClose() : () => onOpen()}
                    />
                    <Spacer />
                    <Logo as={Link} to="/" />
                </HStack>
                <HStack spacing={8} display={{ base: "none", md: "flex" }} ml="16">
                    <Logo as={Link} to="/" ml={4} mr={4} />
                    <NavLink as={Link} to="/" label={"Home"} />
                    <NavLink as={Link} to="/profile" label={"Profile"} />
                </HStack>
                <HStack spacing={8} display={{ base: "none", md: "flex" }} mr="6">
                    <Box
                        _hover={{ backgroundColor: "background.primary", cursor: "pointer" }}
                        onClick={() => {
                            logout();
                            window.location.assign("/");
                        }}
                        borderRadius="sm"
                        p={1}
                    >
                        <HStack>
                            <Text>Logout</Text>
                            <FiLogOut size="20" />
                        </HStack>
                    </Box>
                </HStack>
            </Flex>
        </>
    );

    return <>{isLoggedIn ? loggedInMarkup : DefaultNavBar()}</>;
}
export const NavBar = React.memo(NavBarFunc);
