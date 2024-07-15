import type {Root} from 'hast';
import type * as _ from 'mdast-util-mdxjs-esm';

export const getFrontMatter = (ast: Root) => {
	const statement = ast.children.find(statement => statement.type === 'mdxjsEsm');
	const exportDeclaration = statement!.data!.estree!.body.find(declaration => declaration.type === 'ExportNamedDeclaration');

	if (exportDeclaration?.declaration?.type !== 'VariableDeclaration') {
		throw new Error('Something went wrong.');
	}

	const frontmatter = exportDeclaration.declaration.declarations.find(d => d.type === 'VariableDeclarator');

	if (frontmatter?.type !== 'VariableDeclarator' || frontmatter.init?.type !== 'ObjectExpression') {
		throw new Error('Frontmatter does not exist in this ast');
	}

	return frontmatter.init;
};
