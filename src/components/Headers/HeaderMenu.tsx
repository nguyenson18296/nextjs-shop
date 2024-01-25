const MenuItems = [
    {
        id: 1,
        text: 'Home'
    },
    {
        id: 2,
        text: 'Contact'
    },
    {
        id: 3,
        text: 'About'
    },
    {
        id: 4,
        text: 'Signup'
    }
]

export const HeaderMenu: React.FC = () => {
    return (
        <ul className="flex items-center">
            {MenuItems.map(item => (
                <li key={item.id} className="mr-12 last:mr-0">
                    <a href="#"> 
                        {item.text}
                    </a>
                </li>
            ))}
        </ul>
    )
}