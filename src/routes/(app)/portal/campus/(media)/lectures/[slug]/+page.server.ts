import data from '../media.js';

export const load = ({ params }) => {
	const lecture = data.lectures.find((lecture) => lecture.slug === params.slug);
	return { lecture };
};
