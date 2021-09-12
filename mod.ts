/**
 * The attributes which a XML node can have.
 */
export type Attributes = { [tagName: string]: string | boolean | number };

/**
 * A node in the XML tree.
 */
export type RootNode = {
  tag: string;
  attributes: Attributes;
  children: Node[];
};

/**
 * A node in the XML tree or a text node.
 */
export type Node = RootNode | string | boolean | number;

/**
 * @param {Node} node - The node to render
 * @param {Object} args - Additional arguments used when rendering
 * @param {Function} args.mapTag - A function which transforms the tag names of the elements
 * @returns {string}
 * @example
 * render(<div>Hello</div>)
 * // => "<div>Hello</div>"
 *
 * render(<x:FOO>Hello</x:FOO>, {
 *   replaceTag: (tagName) => tagName.replace('x:', '')
 * })
 * // => "<FOO>Hello</FOO>"
 */
export function render(
  node: Node,
  args?: { replaceTag: (s: string) => string },
): string {
  if (
    typeof node === "string" || typeof node === "number" ||
    typeof node === "boolean"
  ) {
    return node.toString();
  }

  const tag = args?.replaceTag ? args.replaceTag(node.tag) : node.tag;
  const attr = encodeAttributes(node.attributes);
  const children = node.children.map((node: Node) => render(node, args));

  return `<${tag}${attr}>${children.join("")}</${tag}>`;

  function encodeAttributes(attributes: Attributes): string {
    if (
      attributes === undefined || attributes === null ||
      Object.entries(attributes).length === 0
    ) {
      return "";
    } else {
      return " " +
        Object.entries(attributes)
          .map(([key, value]) => `${key}="${encodeXml(value.toString())}"`)
          .join(" ");
    }
  }

  function encodeXml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }
}

export namespace React {
  // types for jsx
  export declare namespace JSX {
    export interface IntrinsicAttributes {
      key?: any;
    }
    export interface IntrinsicElements {
      [tagName: string]: Attributes;
    }
  }

  export function createElement(
    tag: string | ((props: any) => RootNode),
    props: Attributes,
    ...children: Node[]
  ): Node {
    if (typeof tag === "function") {
      return tag({ ...props, children });
    } else if (typeof tag === "string") {
      return { tag, children, attributes: props };
    }
    throw new Error("tag must be a string or a function");
  }
}

export default React;
