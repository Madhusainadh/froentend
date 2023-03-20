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
  Text,
  Toast,
} from "@chakra-ui/react";
import { AiFillEdit, AiTwotoneLock } from "react-icons/ai";
import { BsBoxArrowUpRight, BsFillTrashFill } from "react-icons/bs";
import {
  Container,
  HStack,
  Input,
  TagLabel,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useToast } from '@chakra-ui/react'


import React, { useEffect, useState } from "react";
import axios from "axios";
const RoadDamageReport = () => {
  const [fieldData, setFieldData] = useState({});
  const [tableData, setTableData] = useState([]);

  const bg = useColorModeValue("white", "gray.800");
  const bg2 = useColorModeValue("white", "gray.800");
  const bg3 = useColorModeValue("gray.100", "gray.700");
  const toast = useToast()

  const handelInput = (e) => {
    setFieldData({
      ...fieldData,
      [e.target.name]: e.target.value,
    });
    console.log(fieldData);
  };
  const handelfileInput = (e) => {
    setFieldData({
      ...fieldData,
      [e.target.name]: e.target.files[0],
    });
    console.log(fieldData);
  };

  const getdata = async () => {
    let { data } = await axios.get("https://backend-production-4fe8.up.railway.app/roaddamage");
    console.log(data);
    setTableData(data);
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleSubmit = async (e) => {
    console.log(fieldData);
    try {
      const response = await axios.post(
        "https://backend-production-4fe8.up.railway.app/roaddamage/create",
        fieldData
      );
      toast({
        title: 'Ticket created.',
        description: "We've created your Ticket for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      console.log(response.data);
      getdata();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
    <Box gap="10px" m={"10px"}>
    <h1 style={{color:"red"}}  >FOR NOW ONLY ROAD DAMAGE REPORT ONLY WORKING</h1>
        <Container>
        <VStack gap={"10px"} m="10px"  >
        <Text>Type of Damage</Text>
        <Input
        type={"text"}
        value={fieldData.Type_of_Damage}
        name="Type_of_Damage"
        onChange={handelInput}
        placeholder="Type of Damage"
        />
        <Text>Damage level out of 10</Text>
        <Input
        type={"number"}
        value={fieldData.Damage_level_out_of_10}
        onChange={(e)=>e.target.value<=10?handelInput(e):""}
            name="Damage_level_out_of_10"
            max="10"
            placeholder="Damage level out of 10"
          />
          <Text>Raod Name</Text>
          <Input
          type={"text"}
          onChange={handelInput}
          name="Raod_Name"
          placeholder="Raod Name"
          />
          <Text>Full Address with landmark</Text>
          <Textarea
          type={"text"}
          value={fieldData.Full_Address_with_landmark}
          onChange={handelInput}
          name={"Full_Address_with_landmark"}
          placeholder="Full Address with landmark"
          />
          {/**     <text>Damage pick</text>
          <Input type={"file"}           onChange={handelfileInput}
          name="Damage_pick" placeholder="Damage pick" />
          <text>surrounding pick</text>
          <Input
          type={"file"}
          onChange={handelfileInput}

          name="surrounding_pick_1"
          placeholder="Damage pick"
        />
        <text>surrounding pick</text>
        <Input
          type={"file"}
          onChange={handelfileInput}

          name="surrounding_pick_2"
          placeholder="Damage pick"
        />  */}
          <Button onClick={handleSubmit} bg="green" >Submit</Button>
          </VStack>
        </Container>

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
          <Text fontSize={"20px"}>Total tikets Raised:{"  "}{tableData.length}</Text>
          <Text fontSize={"20px"}>Total tikets Resolved:{"  "}{ tableData.reduce( (p, c) => c.Work_Done ? p = p + 1 : p, 0)}
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
                      <span >
                        Actions
                      </span>
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
                      <span
                        textOverflow="ellipsis"
                        overflow="hidden"
                        whiteSpace="nowrap"
                      >
                        {e.Damage_level_out_of_10}
                      </span>
                      <span>{e.Full_Address_with_landmark}</span>
                      <VStack gap={"5px"} >
                        <Button size="sm" variant="solid" colorScheme={e.Reviewing?"purple":"red"}>
                          {e.Reviewing
                            ? "Problem Noted"
                            : "Need to be reviewed"}
                        </Button>
                        <Button colorScheme={e.Work_in_Progress?"blue":"red"}>
                          {e.Work_in_Progress
                            ? "Work in Progress"
                            : "Work need to be started"}
                        </Button>
                        <Button colorScheme={e.Work_Done?"green":"red"}>
                          {e.Work_Done
                            ? "Problem Solved"
                            : "Problem not solved"}
                        </Button>
                        
                      </VStack>
                    
                    </SimpleGrid>
                  </Flex>
                );
              })}
          </Stack>
        </Flex>
      </Box>
    </div>
  );
};

export default RoadDamageReport;
