'use client'
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { Button } from '@/components/common/Button';
import { Loading } from '@/components/common/Loading';
import { isEmpty } from '@/utils/utils';

interface IFilterBarSectionItem {
    sectionName: string;
    items: Array<{
        id: number;
        name: string
    }>
}

export const FilterBarSectionItem: React.FC<IFilterBarSectionItem> = ({
    sectionName,
    items
}) => {
    const [selectedFilter, setSelectedFilter] = useState<string[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter()
    const pathname = usePathname()

    const onChangeCheckBox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (selectedFilter.includes(value)) {
            const arr = [...selectedFilter].filter(item => item !== value);
            setSelectedFilter(arr);
        } else {
            const arr = [...selectedFilter].concat(value);
            setSelectedFilter(arr);
        }
    }, [selectedFilter]);

    const createQueryString = useCallback(() => {
        const params = new URLSearchParams({
            category_id: ''
        })
        const formattedCategoriesParams = selectedFilter.join(',');
        params.set('category_id', formattedCategoriesParams)
        router.push(pathname + '?' + params.toString())
    }, [selectedFilter, pathname, router]);

    if (isEmpty(items)) {
        return (
            <div className="filter-bar-section-item h-[200px] flex items-center justify-center">
                <Loading />
            </div>
        )
    }

    return (
        <div className="filter-bar-section-item">
            <hr className="h-0.5" />
            <h4 className="text-base mt-3 font-semibold">
                {sectionName}
            </h4>
            <ul className="mt-3">
                {items.map(item => (
                    <li
                        key={item.id} 
                        className="text-[#505050] text-base font-normal py-1"
                    >
                        <label htmlFor={item.name}>
                            <input
                                type="checkbox"
                                onChange={onChangeCheckBox}
                                value={item.id}
                                id={item.name}
                            />
                            <span className="ml-2">
                                {item.name}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
            <Button name='Search' className='mt-4' onClick={createQueryString} />
        </div>
    )
}
