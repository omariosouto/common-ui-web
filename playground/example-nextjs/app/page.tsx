import {
  Box,
  Text,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from "@omariosouto/common-ui-web/components";
import { ToggleTheme } from "./client";
import Link from "next/link";

export default function HomeScreen() {
  return (
    <Box className="p-10">
      <Box>
        <Link href="/async-state">
          <Text className="text-2xl font-bold">- Go to async state demo</Text>
        </Link>
      </Box>
      <Box>
        <Link href="/forms-and-masks">
          <Text className="text-2xl font-bold">- Go to forms and masks demo</Text>
        </Link>
      </Box>

      <ToggleTheme />
      <Avatar
        className="size-12"
      >
        <AvatarImage src="https://github.com/omariosouto.png" />
        <AvatarFallback className="text-white bg-black">MS</AvatarFallback>
      </Avatar>
      <Text className="text-3xl font-bold underline text-red-500">Hello World!</Text>
      <Button>
        Click me!
      </Button>
    </Box>
  )
}