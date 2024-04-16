const MenuItems = [
    {
        id: 1,
        text: 'Home',
        path: '/'
    },
    {
        id: 2,
        text: 'Liên hệ',
        path: '/lien-he'
    },
    {
        id: 3,
        text: 'Về chúng tôi',
        path: '/ve-chung-toi'
    },
    {
        id: 4,
        text: 'Bài viết',
        path: '/bai-viet'
    },
    {
        id: 5,
        text: 'Signup'
    }
]

export const HeaderMenu: React.FC = () => {
    return (
        <ul className="flex items-center">
            {MenuItems.map(item => (
                <li key={item.id} className="mr-12 last:mr-0">
                    <a href={item.path}> 
                        {item.text}
                    </a>
                </li>
            ))}
        </ul>
    )
}