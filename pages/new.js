import { useState } from "react";
import { Input, Textarea } from "@rebass/forms";
import { Text, Flex, Heading, Button } from "rebass";
import Box from "../components/box";
import axios from "axios";

export default props => {
  const [text, setText] = useState(null);
  return (
    <Flex p="30px" width="100vw" flexDirection="column">
      <Heading m="auto" fontSize={[4, 5, 6]}>
        Register
      </Heading>
      <Box
        id="form"
        as="form"
        onSubmit={e => {
          e.preventDefault();
          setText(null);
          let file = document.getElementById("image").files[0];
          const form = new FormData();
          form.append("file", file);
          axios({
            method: "post",
            url:
              "https://cors-anywhere.herokuapp.com/uguu.se/api.php?d=upload-tool",
            data: form,
            headers: { "Content-Type": "multipart/form-data" }
          })
            .then(d => {
              let url = d.data;
              axios
                .post("/api/classes/create", {
                  name: document.getElementById("name").value,
                  desc: document.getElementById("desc").value,
                  image: url,
                  KeyWords: document.getElementById("key").value
                })
                .then(d => {
                  window.location.href = `/classes/${d.data.id}`;
                });
            })
            .catch(e => console.log(e));
        }}
        mx="auto"
        my="15px"
        sx={{ p: "10px", py: "30px" }}
        width={["90vw", "50vw", "50vw", "50vw"]}
      >
        {text}
        <Flex m="auto" flexDirection="column">
          <Text fontWeight="bold" m="auto">
            Class Name:
          </Text>
          <Input
            sx={{ borderRadius: "10px" }}
            width="70%"
            m="auto"
            id="name"
            required
          />
        </Flex>
        <Flex m="auto" my="20px" flexDirection="column">
          <Text fontWeight="bold" m="auto">
            Class Description:
          </Text>
          <Textarea
            id="desc"
            sx={{ borderRadius: "10px" }}
            width="70%"
            m="auto"
            required
          />
        </Flex>
        <Flex m="auto" my="20px" flexDirection="column">
          <Text fontWeight="bold" m="auto">
            Keywords (Separated by Comma):
          </Text>
          <Textarea
            id="key"
            sx={{ borderRadius: "10px" }}
            width="70%"
            m="auto"
            required
          />
        </Flex>
        <Flex m="auto" my="20px" flexDirection="column">
          <Text fontWeight="bold" m="auto">
            Class Image:
          </Text>
          <Input
            type="file"
            id="image"
            accept="image/*"
            sx={{ borderRadius: "10px" }}
            width="70%"
            m="auto"
            required
          />
        </Flex>
        <Flex py="20px">
          <Button m="auto" variant="3D" bg="accent">
            Start Class!
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
