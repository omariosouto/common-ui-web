export interface TextMaskProtocol<Config = unknown> {
  mask: (value: string, config?: Config) => string;
  unmask: (value: string, config?: Config) => string;
}

export function createTextMask<Config = unknown>({
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