import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export const useSetSearchParams = (key: string, paramsStringify: string) => {
    const router = useRouter();
    const pathname = usePathname();

    const setParamsSearch = useCallback(() => {
        const params = new URLSearchParams({
            [key]: "",
        });
        params.set(key, paramsStringify);
        router.push(pathname + "?" + params.toString());
    }, [router, pathname, key, paramsStringify]);

    useEffect(() => {
        setParamsSearch();
    }, [setParamsSearch]);
}
