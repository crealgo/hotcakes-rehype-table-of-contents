import type * as estree from 'estree';
import type * as hast from 'hast';

export class SimpleLiteral implements estree.SimpleLiteral {
	type = 'Literal' as const;
	value;
	raw;

	constructor(_value: string) {
		this.value = _value;
		this.raw = _value;
	}
}

export class StringProperty implements estree.Property {
	type = 'Property' as const;
	method = false;
	shorthand = false;
	computed = false;
	kind = 'init' as const;
	key;
	value;

	constructor(key: string, value: string) {
		this.key = new SimpleLiteral(key);
		this.value = new SimpleLiteral(value);
	}
}

export class ObjectExpression implements estree.ObjectExpression {
	type = 'ObjectExpression' as const;
	properties: StringProperty[] = [];

	constructor(object: Record<string, string>) {
		const entries = Object.entries(object);

		for (const [key, value] of entries) {
			this.properties.push(new StringProperty(key, value));
		}
	}
}

export class ArrayExpression implements estree.ArrayExpression {
	type = 'ArrayExpression' as const;
	elements: estree.Expression[] = [];

	add(element: estree.Expression) {
		this.elements.push(element);
	}
}

export class AnchorElement implements hast.Element {
	type = 'element' as const;
	tagName = 'a';
	properties: hast.Properties;
	children: hast.ElementContent[] = [];

	constructor(href: string, children: hast.ElementContent[]) {
		this.properties = {href};
		this.children.push(...children);
	}
}
