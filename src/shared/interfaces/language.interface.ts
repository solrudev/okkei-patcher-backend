export enum Language {
	ENGLISH = "en",
	RUSSIAN = "ru"
}

export function languageFromString(value: string): Language | null {
	if (value.startsWith(Language.ENGLISH)) {
		return Language.ENGLISH;
	}
	if (value.startsWith(Language.RUSSIAN)) {
		return Language.RUSSIAN;
	}
	return null;
}