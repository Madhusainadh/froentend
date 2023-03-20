import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Stack,
  chakra,
  useColorModeValue,
  Box,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
const RoadDamageReportGov = () => {
  const [tableData, setTableData] = useState([]);
  const toast = useToast();

  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  const bg3 = useColorModeValue("gray.100", "gray.700");

  const getdata = async () => {
    let { data } = await axios.get("https://backend-production-4fe8.up.railway.app/roaddamage");
    console.log(data);
    setTableData(data);
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div bg="#edf3f8">
      <Flex
        bg="#edf3f8"
        _dark={{ bg: "#3e3e3e" }}
        p={50}
        alignItems="center"
        justifyContent="center"
        w={"100%"}
      >
        <Stack
          direction={{ base: "column" }}
          w="full"
          bg={{ md: bg }}
          shadow="lg"
        >
          <Flex justifyContent={"space-around"} margin="20px" bg="#edf3f8">
            <Text fontSize={"20px"}>
              Total tikets Raised:{"  "}
              {tableData.length}
            </Text>
            <Text fontSize={"20px"}>
              Total tikets Resolved:{"  "}
              {tableData.reduce((p, c) => (c.Work_Done ? (p = p + 1) : p), 0)}
            </Text>
          </Flex>
          {tableData &&
            tableData.map((e, i) => {
              return (
                <Flex
                  direction={{ base: "row", md: "column" }}
                  bg={bg2}
                  key={i}
                >
                  <SimpleGrid
                    spacingY={3}
                    columns={{ base: 1, md: 5 }}
                    w={{ base: 120, md: "full" }}
                    textTransform="uppercase"
                    bg={bg3}
                    color={"gray.500"}
                    py={{ base: 1, md: 5 }}
                    px={{ base: 2, md: 10 }}
                    fontSize="md"
                    fontWeight="hairline"
                  >
                    <span>Damage Type</span>
                    <span>Danger Level Out of 10</span>
                    <span>Full_Address</span>
                    <chakra.span>Actions</chakra.span>
                    <spam>Delete</spam>
                  </SimpleGrid>
                  <SimpleGrid
                    spacingY={3}
                    columns={{ base: 1, md: 5 }}
                    w="full"
                    py={2}
                    px={10}
                    fontWeight="hairline"
                  >
                    {/**   Reviewing:{type:Boolean,default:false},
Work_in_Progress:{type:Boolean,default:false},
Work_Done:{type:Boolean,default:false}, */}
                    <span>{e.Type_of_Damage}</span>

                    <chakra.span
                      textOverflow="ellipsis"
                      overflow="hidden"
                      whiteSpace="nowrap"
                    >
                      {e.Damage_level_out_of_10}
                    </chakra.span>
                    <span>{e.Full_Address_with_landmark}</span>
                    <VStack gap={"5px"}>
                      <Button
                        onClick={async () => {
                          await axios
                            .post(
                              `https://backend-production-4fe8.up.railway.app/roaddamage/:${e._id}`,
                              {
                                ...e,
                                Reviewing: !e.Reviewing,
                                Work_in_Progress: false,
                                Work_Done: false,
                              }
                            )
                            .then((res) => {
                              console.log(res);
                              getdata();
                            })
                            .catch((err) => console.log(err.message));
                        }}
                        size="sm"
                        variant="solid"
                        colorScheme={e.Reviewing ? "purple" : "red"}
                      >
                        {e.Reviewing ? "Problem Noted" : "Need to be reviewed"}
                      </Button>
                      <Button
                        onClick={async () => {
                          if (e.Reviewing) {
                            await axios
                              .post(
                                `https://backend-production-4fe8.up.railway.app/roaddamage/:${e.id}`,
                                {
                                  ...e,
                                  Work_in_Progress: !e.Work_in_Progress,
                                  Work_Done: false,
                                }
                              )
                              .then((res) => {
                                console.log(res);
                                getdata();
                              })
                              .catch((err) => console.log(err.message));
                          }
                        }}
                        colorScheme={e.Work_in_Progress ? "blue" : "red"}
                      >
                        {e.Work_in_Progress
                          ? "Work in Progress"
                          : "Work need to be started"}
                      </Button>
                      <Button
                        onClick={async () => {
                          if (e.Reviewing && e.Work_in_Progress) {
                            await axios
                              .post(
                                `https://backend-production-4fe8.up.railway.app/roaddamage/:${e.id}`,
                                { ...e, Work_Done: !e.Work_Done }
                              )
                              .then((res) => {
                                console.log(res);
                                getdata();
                              })
                              .catch((err) => console.log(err.message));
                          }
                        }}
                        colorScheme={e.Work_Done ? "green" : "red"}
                      >
                        {e.Work_Done ? "Problem Solved" : "Problem not solved"}
                      </Button>
                    </VStack>
                    <Button
                      h={"100%"}
                      w="60px"
                      ml={"40%"}
                      bg="red.300"
                      onClick={async () => {
                        confirmAlert({
                          title: "Confirm to submit",
                          message: "Are you sure to delete this.",
                          buttons: [
                            {
                              label: "Yes",
                              onClick: async () => {
                                await axios
                                  .delete(
                                    `https://backend-production-4fe8.up.railway.app/roaddamage/remove/${e._id}`
                                  )
                                  .then((res) => {
                                    toast({
                                      title: "Delete Ticket",
                                      description: "Deleted the picket",
                                      status: "success",
                                      duration: 9000,
                                      isClosable: true,
                                    });
                                    getdata();
                                  })
                                  .catch((err) =>
                                    toast({
                                      title: err.message,
                                      description: "error with delete",
                                      status: "error",
                                      duration: 9000,
                                      isClosable: true,
                                    })
                                  );
                              },
                            },
                            {
                              label: "No",
                              onClick: () => {
                                alert("Click No");
                              },
                            },
                          ],
                        });
                      }}
                    >
                      Delete
                    </Button>

                    <Flex justify={{ md: "end" }}>
                      {/**  <ButtonGroup variant="solid" size="sm" spacing={3}>
                    <IconButton
                      colorScheme="blue"
                      icon={<BsBoxArrowUpRight />}
                      aria-label="Up"
                    />
                    <IconButton
                      colorScheme="green"
                      icon={<AiFillEdit />}
                      aria-label="Edit"
                    />
                    <IconButton
                      colorScheme="red"
                      variant="outline"
                      icon={<BsFillTrashFill />}
                      aria-label="Delete"
                    />
                  </ButtonGroup>*/}
                    </Flex>
                  </SimpleGrid>
                </Flex>
              );
            })}
        </Stack>
      </Flex>
    </div>
  );
};

export default RoadDamageReportGov;
