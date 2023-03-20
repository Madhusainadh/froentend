import React from "react";

import {
  chakra,
  Box,
  Flex,
  useColorModeValue,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  Image,
} from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { Logo } from "@choc-ui/logo";
import SiteLogo from "../../../Assets/icons/SiteLogo.jpg"
import { Link } from "react-router-dom";
export default function Navbar(){
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <>
      <chakra.header
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <chakra.a
              href="/government"
              title="Choc Home Page"
              display="flex"
              alignItems="center"
            >
              <Image pl={"20px"} w={"150px"}  h={"50px"} src={SiteLogo} />
              <VisuallyHidden>Choc</VisuallyHidden>
            </chakra.a>
           
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={1}
              mr={1}
              color="brand.500"
              display={{ base: "none", md: "inline-flex" }}
            >
              <Button variant="ghost"><Link  to="/roaddamage"  >Road Damage Report</Link></Button>
              <Button variant="ghost">Road Jam 
              </Button>
              <Button variant="ghost">Trafic voilation Report
              </Button>
              <Button variant="ghost">Accident Report
              </Button>
              <Button variant="ghost">Sign in</Button>
            </HStack>
            
            <Box display={{ base: "inline-flex", md: "none" }}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color="gray.800"
                _dark={{ color: "inherit" }}
                variant="ghost"
                icon={<AiOutlineMenu />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                flexDirection="column"
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <Button w="full" variant="ghost">
                Road Damage Report
                </Button>
                <Button w="full" variant="ghost">
                Road Jam 
                </Button>
                <Button w="full" variant="ghost">
                  Trafic voilation Report
                </Button>
                <Button w="full" variant="ghost">
                  Accident Report
                </Button>
                <Button w="full" variant="ghost">
                  Sign in
                </Button>
              </VStack>
            </Box>
          </HStack>
        </Flex>
      </chakra.header>
    </>
  );
};
