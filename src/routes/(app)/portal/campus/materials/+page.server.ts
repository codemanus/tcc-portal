import resources from './resources';

export function load() {
	return {
		data: resources.map((resource) => ({
			...resource,
			id: resource.id,
			title: resource.title,
			description: resource.description,
			type: resource.type,
			requirement: resource.requirement,
			price: resource.price,
			publisher: resource.publisher,
			url: resource.url,
			thumbnailUrl: resource.thumbnailUrl,
			courseDependencies: resource.courseDependencies,
			tags: resource.tags?.map((tag) => ({
				label: tag,
				href: `/portal/campus/materials?tag=${tag}`
			}))
		}))
	};
}

export type PageData = Awaited<ReturnType<typeof load>>;
