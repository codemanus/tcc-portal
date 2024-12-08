import data from './media.js';

export const load = () => {
	return {
		lectures: data.lectures.map((lecture) => ({
			id: lecture.id,
			title: lecture.title,
			slug: lecture.slug,
			thumbnailUrl: lecture.thumbnailUrl,
			description: lecture.description,
			week: lecture.week,
			course: lecture.course,
			duration: lecture.duration,
			date: lecture.date,
			videoUrl: lecture.videoUrl,
			notesUrl: lecture.notesUrl
		}))
	};
};
