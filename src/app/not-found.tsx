"use client"

import { Button, Center, Container, Stack, Text } from '@mantine/core'
import { redirect } from 'next/navigation'
 
export default function NotFound() {
  return (
    <Container>
      <Center my="lg">
        <Stack align='center'>
          <Text fz="h1" fw="bolder">OOPS</Text>
          <Text fz="h1" fw="bolder">PAGE NOT EXISTS</Text>
          <Button onClick={() => redirect("/")}>BACK TO HOME</Button>
        </Stack>
      </Center>
    </Container>
  )
}