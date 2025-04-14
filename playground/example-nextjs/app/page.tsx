import {
  Box,
  Text,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Button,
} from "@omariosouto/common-ui-web";
import { ToggleTheme } from "./client";

export default function HomeScreen() {
  return (
    <Box>
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