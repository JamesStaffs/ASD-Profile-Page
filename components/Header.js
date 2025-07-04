function Header({ title }) {
    return (
        <header>
            <nav>
                <ul>
                    <li><a href="index.html">Profile</a></li>
                    <li><a href="contact.html">Contact</a></li>
                    <li><a href="contact-react.html">React Contact</a></li>
                </ul>
            </nav>
            <h1>{title}</h1>
        </header>
    )
}