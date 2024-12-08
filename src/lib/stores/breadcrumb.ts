import { writable } from 'svelte/store';

type Breadcrumb = {
	label: string;
	href?: string;
};

export const breadcrumbs = writable<Breadcrumb[]>([]);

export function setBreadcrumbs(items: Breadcrumb[]) {
	breadcrumbs.set([{ label: 'Home', href: '/portal' }, ...items]);
}
