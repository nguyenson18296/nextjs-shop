export const PRODUCT_KINDS = [
    {
        id: 1,
        name: "Woman's Fashion"
    },
    {
        id: 2,
        name: "Men's Fashion"
    },
    {
        id: 3,
        name: "Electronics"
    },
    {
        id: 4,
        name: "Medicine"
    },
    {
        id: 5,
        name: "Sports & Outdoor"
    },
    {
        id: 6,
        name: "Baby’s & Toys"
    },
    {
        id: 7,
        name: "Groceries & Pets"
    },
    {
        id: 8,
        name: "Health & Beauty"
    }
]

export const ProductKindMenu: React.FC = () => {
    return (
        <ul className="flex-[0_0_20%]">
            {PRODUCT_KINDS.map(item => (
                <li key={item.id} className="mt-4 text-base font-normal first:mt-0">
                    {item.name}
                </li>
            ))}
        </ul>
    )
}
