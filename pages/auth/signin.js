'use client';
import { getCsrfToken } from "next-auth/react"
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
  Wrap,
} from '@chakra-ui/react'
import { Logo } from '../../components/Logo'
import { OAuthButtonGroup } from '../../components/OAuthButtonGroup'
import { PasswordField } from '../../components/PasswordField'



export default function SignIn({ csrfToken }) {
  return (
    <Center
      h={'100vh'}
      backgroundBlendMode={'hard-light'}
      backgroundImage="url('https://images.unsplash.com/photo-1583711565105-afd990bb44a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')"
      backgroundPosition={'center'}
      backgroundSize={'cover'}
      backgroundRepeat={'no-repeat'}>
      <Box
        w='100%' p={4}
        // bgGradient='linear(to-r, #000428, #004e92)'
        color='white'
      >
        <Container maxW="lg" py={{ base: '12', md: '12' }} px={{ base: '0', sm: '2' }}>
          <Stack spacing="4">
            <Stack spacing="4">
              <Logo color={'white'} />
              <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
                <Heading 
                // size={useBreakpointValue({ base: 'xs', md: 'xl' })}
                >
                  Seja bem-vindo(a)!
                </Heading>
              </Stack>
            </Stack>
            <Box
              color={'gray.900'}
              py={{ base: '0', sm: '8' }}
              px={{ base: '4', sm: '5' }}
              // bg={useBreakpointValue({ base: 'white', md: 'white', sm: 'white' })}
              boxShadow={{ base: 'none', sm: useColorModeValue('md', 'md-dark') }}
              borderRadius={{ base: 'none', sm: 'md' }}>
              <Stack spacing="6">
                <form method="post" action="/api/auth/callback/credentials">
                  <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                  <Stack spacing="5">
                    <FormControl>
                      <FormLabel htmlFor="email">Usuário ou Email</FormLabel>
                      <Input name="username" id="username" type="text" />
                    </FormControl>
                    <PasswordField />
                  </Stack>
                  <HStack justify="space-between">
                    <Checkbox defaultChecked>Lembre me</Checkbox>
                    <Button variant="link" colorScheme="blue" size="sm">
                      Enqueceu sua senha?
                    </Button>
                  </HStack>
                  <Stack spacing="6">
                    <Button
                      variant='brand'
                      type='submit'
                      w='100%'
                      h='45'
                      mb='20px'
                      mt='20px'>
                      Login
                    </Button>
                    <HStack>
                      <Divider />
                      <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                        ou entre com
                      </Text>
                      <Divider />
                    </HStack>
                    <OAuthButtonGroup />
                    <HStack spacing="1" justify="center">
                      <Text color="muted">Não tem uma conta?</Text>
                      <Button variant="link" colorScheme="blue">
                        Assine agora
                      </Button>
                    </HStack>
                  </Stack>
                </form>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
    </Center>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}