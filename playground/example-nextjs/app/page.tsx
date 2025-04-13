import {
  Box,
  Text,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@omariosouto/common-ui-web";

export default function HomeScreen() {
  return (
    <Box>
      <Avatar
        className="size-12"
      >
        <AvatarImage src="https://github.com/omariosouto.png" />
        <AvatarFallback className="text-white bg-black">MS</AvatarFallback>
      </Avatar>
      <Text className="text-3xl font-bold underline">Hello World!</Text>
    </Box>
  )
}