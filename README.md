# JSX XML Serializer

No dependency XML encoder using JSX to describe the XML tree for Deno.


## Examples:

### Simple

```tsx
import React, { render } from "./mod.ts";

console.log(render(<asd name={false}>asdf</asd>));

// => `<asd name="false">asdf</asd>`,
```

### Component

```tsx
import React, { render } from "./mod.ts";

function Component({ name, nr }: { name: string; nr: number }) {
  return (
    <person>
      <name>{name}</name>
      <nr>{nr}</nr>
    </person>
  );
}

console.log(render(<Component name="asdf" nr={123} />)

// => `<person><name>asdf</name><nr>123</nr></person>`,
```

### Uppercase tag names
JSX only allows lowercase generic tag names.
Upper case names are reserved for component functions.
You can use XML namespaces and `replaceTag` to circumvent this.

```tsx
import React, { render } from "./mod.ts";

console.log(
  render(
    <x:FOO>Hello</x:FOO>,
    {
        replaceTag: (tagName) => tagName.replace("x:", ""),
    },
  )
),

// => `<FOO>Hello</FOO>`,
```