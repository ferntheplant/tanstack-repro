import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const data = (await (await fetch('https://dummyjson.com/posts?skip=0&limit=10')).json())
		.posts as {
		id: number;
		title: string;
		body: string;
		userId: number;
		tags: string[];
		reaction: number;
	}[];
	return {
		data
	};
};
