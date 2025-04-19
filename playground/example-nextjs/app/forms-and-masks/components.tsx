"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { s } from "@omariosouto/common-schema";
import { useAsyncStateQuery } from "@omariosouto/common-ui-web/state";
import { InputTextPrimal } from "@omariosouto/common-ui-web/components-primal";
import { Box, Text } from "@omariosouto/common-ui-web/components";

// [Masks]

interface TextMaskProtocol<Config = unknown> {
  mask: (value: string, config?: Config) => string;
  unmask: (value: string, config?: Config) => string;
}

function createTextMask<Config = unknown>({
  mask,
  unmask,
}: {
  mask: (value: string, config: Config) => string;
  unmask: (value: string, config: Config) => string;
}): TextMaskProtocol<Config> {
  return {
    mask: (value: string, config: Config = {} as Config) => {
      return mask(value, config);
    },
    unmask: (value: string, config: Config = {} as Config) => {
      return unmask(value, config);
    }
  };
}
// ======================================================================================================
// ======================================================================================================

// [LOCAL IMPLEMENTATION]

const priceMask = createTextMask<{ // The Money library could provide this as an entry like: index|test|mask
  currency: string;
  lang: string;
}>({
  mask(value, config) {
    return `${config.currency} ${value}`;
  },
  unmask(value, config) {
    return `${config.currency} ${value}`;
  }
});

const codeMask = createTextMask<{}>({
  mask(value) {
    // TODO: Create a utility function to help format like: 0000?-0000
    return value.replace(/(\d{4})(\d{4})/, "$1-$2");
  },
  unmask(value) {
    return value.replace(/-/g, "");
  }
});

// This must be placed in a common place inside the project and reused across it
const masks = {
  price: priceMask,
  code: codeMask,
} as const;

// ==================================================
// ==================================================

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
    mode: "onChange",
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
              {currency} - You are trying to buy ${data.name} for
              {" "}
              🇺🇸 {masks.price.mask(data.price, { currency, lang: "en-US" })}
              {" | "}
              🇧🇷 {masks.price.mask(data.price, { currency, lang: "pt-BR" })}
            </Text>
          )}
          {currency === "BRL" && (
            <Text>
              {currency} - Você está tentando comprar um ${data.name} por 🇺🇸 {data.price} | 🇧🇷 {data.price}
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