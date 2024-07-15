import {describe, expect, it} from 'vitest';
import type * as hast from 'hast';
import rehypeTableOfContents from '../../src/transformer';
import sampleHast from '../__data__/mdxhast-sample.json';

describe('the rehype plugin, given an ast with headings', () => {
	it('should return an ast with a table of contents and anchored headers', async () => {
		rehypeTableOfContents(sampleHast as hast.Root);

		expect(sampleHast).toMatchSnapshot();
	});
});
