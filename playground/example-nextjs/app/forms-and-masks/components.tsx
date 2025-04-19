"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { s } from "@omariosouto/common-schema";
import { useAsyncStateQuery } from "@omariosouto/common-ui-web/state";
import { InputTextPrimal } from "@omariosouto/common-ui-web/components-primal";
import { Box, Text } from "@omariosouto/common-ui-web/components";

// Wire Layer
const ProductSchema = s.object({
  name: s.string(),
  price: s.string(), // -> Create custom type for this
  description: s.string(),
  code: s.string(),
});
type ProductWireIn = s.infer<typeof ProductSchema>;
type Product = s.infer<typeof ProductSchema>;

// [Http Layer]
const http = {
  async getProduct(): Promise<Product> {
    const wireIn: ProductWireIn = {
      name: "Nintendo Switch 2",
      description: "This is a product description",
      price: "450.00", // [BRL+pt-BR] R$ 450,00 | [BRL+en-US] R$ 450.00 | [USD+pt-BR] $450,00 | [USD+en-US] $450.00
      code: "99998888", // Mask: 9999-8888
    };
    return ProductSchema.parse(wireIn);
  },
};

// [Component Layer]
export function ProductView() {
  const product = useAsyncStateQuery({
    queryKey: ["product"],
    queryFn: () => http.getProduct(),
    suspendRenderization: true,
  });

  const [code, setCode] = React.useState(product.data.code);
  const form = useForm<
    {
      price: Product["price"];
    }
  >({
    defaultValues: {
      price: product.data.price,
    },
  });

  const { data, isLoading, error } = product;

  if (isLoading) return <Box><Text>Loading...</Text></Box>;
  if (error) return <Box><Text>Error: {error.message}</Text></Box>;

  return (
    <Box className="p-6">
      {["BRL", "USD"].map((currency) => (
        <Box className="mb-8" key={currency}>
          {currency === "USD" && (
            <Text>
              {currency} - You are trying to buy ${data?.name} for 🇺🇸 {data?.price} | 🇧🇷 {data?.price}
            </Text>
          )}
          {currency === "BRL" && (
            <Text>
              {currency} - Você está tentando comprar um ${data?.name} por 🇺🇸 {data?.price} | 🇧🇷 {data?.price}
            </Text>
          )}

          <Box>
            <Text
              tag="h1"
            >
              {({
                BRL: "Qual é o preço que você quer pagar?",
                USD: "What price do you want to pay?",
              })[currency]}
            </Text>
            <form>
              <InputTextPrimal
                {...form.register("price", { required: true })}
              />
            </form>
          </Box>
          <Box>
            <Text
              tag="h1"
            >
              {({
                BRL: "Qual é o seu código secreto do produto?",
                USD: "What is your product secret code?",
              })[currency]}
            </Text>
            <form>
              <InputTextPrimal
                defaultValue={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </form>
          </Box>
        </Box>
      ))}

      <Box>
        <Text>
          React.hookForm: {form.getValues().price}
        </Text>
        <Text>
          React.useState: {code}
        </Text>
      </Box>
    </Box>
  );
}


/*

# What do I need?

- [ ] I need to have a custom Schema type for the data
- [ ] I need to be able to mask the input
- [ ] I need to be able to unmask the input

*/