import type {Root} from 'hast';
import type {Plugin} from 'unified';
import transformer from './transformer.js';

const rehypeTableOfContents: Plugin<[], Root> = () => ast => {
	transformer(ast);
};

export default rehypeTableOfContents;
