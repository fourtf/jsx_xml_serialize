import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";
import React, { render } from "./mod.ts";

Deno.test("simple", () => {
  assertEquals(
    render(<asd name={false}>asdf</asd>),
    `<asd name="false">asdf</asd>`,
  );
});

Deno.test("complex", () => {
  assertEquals(
    render(
      <asdf f="asdf">
        test<qwerty x="123">asdf</qwerty>
        <empty />
      </asdf>,
    ),
    `<asdf f="asdf">test<qwerty x="123">asdf</qwerty><empty></empty></asdf>`,
  );
});

Deno.test("component", () => {
  function Component({ name, nr }: { name: string; nr: number }) {
    return (
      <person>
        <name>{name}</name>
        <nr>{nr}</nr>
      </person>
    );
  }

  assertEquals(
    render(<Component name="asdf" nr={123} />),
    `<person><name>asdf</name><nr>123</nr></person>`,
  );
});

Deno.test("transformTagName", () => {
  assertEquals(
    render(
      <x:FOO>Hello</x:FOO>,
      {
        replaceTag: (tagName) => tagName.replace("x:", ""),
      },
    ),
    `<FOO>Hello</FOO>`,
  );
});
