import { ui, defaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split("/");
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof (typeof ui)[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    };
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
        // If the locale is the default, remove the prefix, else retain/add it.
        const isDefault = l === defaultLang;

        // Clean path of existing locale prefixes if any
        let cleanPath = path;
        const pathParts = path.split('/').filter(Boolean);
        if (pathParts.length > 0 && pathParts[0] in ui) {
            pathParts.shift();
            cleanPath = '/' + pathParts.join('/');
        }

        // Ensure cleanPath starts with a slash, or is exactly "/"
        if (!cleanPath.startsWith('/')) {
            cleanPath = '/' + cleanPath;
        }

        if (isDefault) {
            return cleanPath;
        }

        return `/${l}${cleanPath === '/' ? '' : cleanPath}`;
    };
}
