export function cn(...c: (string | undefined | boolean)[]): string {
	return c.filter(Boolean).join(" ");
}

export const getRouteSegments = (pathname: string) =>
	pathname.split("/").filter(Boolean);

export function objectToArray<T extends object, K extends string>(
	obj: Record<string, T>,
	keyName: K,
) {
	return Object.entries(obj).map(([key, value]) => ({
		[keyName]: key,
		...value,
	})) as unknown as (T & Record<K, string>)[];
}
