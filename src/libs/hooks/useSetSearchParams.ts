import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const useSetSearchParams = (key: string, paramsStringify: string) => {
    // const params = new URLSearchParams({
    //     [key]: "",
    // });
    // params.set(key, paramsStringify);
    // router.push(pathname + "?" + params.toString());
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
