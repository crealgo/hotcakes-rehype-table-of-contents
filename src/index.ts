import {kebabCase} from 'change-case';
import type {ArrayExpression} from 'estree';
import type {Root, Text} from 'hast';
import type {Plugin} from 'unified';
import {getFrontMatter} from './utils/getFrontMatter';
import {getHeadings} from './utils/getHeadings';

const rehypeTableOfContents: Plugin<[], Root> = () => ast => {
	const frontmatter = getFrontMatter(ast);
	const headings = getHeadings(ast);

	const tableOfContents: ArrayExpression = {
		type: 'ArrayExpression',
		elements: [],
	};

	for (const heading of headings) {
		const headingContent = heading.children.at(0) as Text;

		const slug = kebabCase(headingContent.value);

		// add table of contents to frontmatter
		tableOfContents.elements.push({
			type: 'ObjectExpression',
			properties: [
				{
					type: 'Property',
					method: false,
					shorthand: false,
					computed: false,
					kind: 'init',
					key: {type: 'Literal', value: 'title'},
					value: {type: 'Literal', value: headingContent.value},
				},
				{
					type: 'Property',
					method: false,
					shorthand: false,
					computed: false,
					kind: 'init',
					key: {type: 'Literal', value: 'id'},
					value: {type: 'Literal', value: slug},
				},
			],
		});

		// convert header to a link
		heading.properties.id = slug;
		heading.children = [
			{
				type: 'element',
				tagName: 'a',
				properties: {
					href: `#${slug}`,
				},
				children: heading.children,
			},
		];
	}

	frontmatter.properties.push({
		type: 'Property',
		key: {
			type: 'PrivateIdentifier',
			name: 'tableOfContents',
		},
		kind: 'init',
		method: false,
		shorthand: false,
		computed: false,
		value: tableOfContents,
	});
};

export default rehypeTableOfContents;
