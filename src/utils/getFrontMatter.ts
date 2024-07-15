import type {VariableDeclaration, ObjectExpression} from 'estree';
import type {Root} from 'hast';
import type {MdxjsEsmHast} from 'mdast-util-mdxjs-esm';

export const getFrontMatter = (ast: Root) => {
	const statement = ast.children.at(0)! as MdxjsEsmHast;
	const declaration = statement.data!.estree!.body.at(0) as VariableDeclaration;

	return declaration.declarations.at(0)!.init as ObjectExpression;
};
