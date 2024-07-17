import {kebabCase} from 'change-case';
import type * as hast from 'hast';
import {AnchorElement, ArrayExpression, ObjectExpression} from './utils/builders.js';
import {getFrontMatter} from './utils/getFrontMatter.js';
import {getHeadings} from './utils/getHeadings.js';

export default function transformer(ast: hast.Root) {
	const frontmatter = getFrontMatter(ast);
	const headings = getHeadings(ast);

	const tableOfContents = new ArrayExpression();

	for (const heading of headings) {
		const headingContent = heading.children.at(0) as hast.Text;

		const slug = kebabCase(headingContent.value);

		// add table of contents to frontmatter
		tableOfContents.add(new ObjectExpression({
			title: headingContent.value,
			id: slug,
		}));

		// convert header to a link
		heading.properties.id = slug;
		heading.children = [new AnchorElement(`#${slug}`, heading.children)];
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
}
