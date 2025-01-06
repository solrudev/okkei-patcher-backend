export function groupBy<T, K extends keyof any>(arr: T[], key: (i: T) => K): Record<K, T[]> {
	return arr.reduce((groups, item) => {
		const group = groups[key(item)] ||= [];
		group.push(item)
		return groups;
	}, {} as Record<K, T[]>);
}