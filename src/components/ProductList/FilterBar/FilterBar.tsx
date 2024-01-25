'use client'
import { useState, useCallback, useEffect } from 'react';

import { FilterBarSectionItem } from "./FilterBarSectionItem"
import { BASE_URL } from '@/constants';

interface IFilterItem {
    id: number;
    name: string;
}

export const FilterBar: React.FC = () => {
    const [categories, setCategories] = useState<IFilterItem[]>([]);

    const getCategories = useCallback(async () => {
        const response = await fetch(`${BASE_URL}/categories`)
        const data = await response.json();
        const mappedData: IFilterItem[] = (data || []).map((item: any) => ({
            id: item.id,
            name: item.title
        }));
        setCategories(mappedData);
    }, []);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    return (
        <div className="filter-bar flex-[0_0_20%]">
            <FilterBarSectionItem
                sectionName="Category"
                items={categories}
            />
        </div>
    )
}