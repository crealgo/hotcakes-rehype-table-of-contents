import type {Root} from 'hast';

export const getHeadings = (ast: Root) => ast.children
	.filter(node => node.type === 'element')
	.filter(element => /h1|h2|h3/.test(element.tagName));
