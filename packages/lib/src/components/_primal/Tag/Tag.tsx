import React, {
  ElementType,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ReactNode,
  forwardRef,
} from "react";

type TagProps<T extends ElementType> = {
  as?: T;
  children?: ReactNode;
} & ComponentPropsWithoutRef<T>;

type TagComponent = <T extends ElementType = "span">(
  props: TagProps<T> & { ref?: React.Ref<ComponentPropsWithRef<T>["ref"]> }
) => React.ReactElement | null;

/**
 * Componente polimórfico Tag, com suporte a qualquer tag ou componente
 */
export const Tag = forwardRef(
  <T extends ElementType = "span">(
    { as, children, ...props }: TagProps<T>,
    ref: React.Ref<ComponentPropsWithRef<T>["ref"]>
  ) => {
    const Component = as || "span";
    return (
      <Component ref={ref} data-slot="tag" {...props}>
        {children}
      </Component>
    );
  }
) as TagComponent;
