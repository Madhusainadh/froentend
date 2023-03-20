import { Button, Container, VStack } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

  return (
    <Container>
    <VStack m={"20px"} gap={"30px"}  >
    <Button w={"200px"} colorScheme="blue"  onClick={()=>navigate('/roaddamage')}   > Citizen Site </Button>
    <Button w={"200px"} colorScheme="red"  onClick={()=>navigate('/government')}> Admin Site </Button>
    </VStack>
    </Container>
  )
}

export default Home
