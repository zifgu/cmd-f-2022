export function Header({ title, subtitle }) {
    return (
        <header
            className="text-center pt-4 pb-3 my-3 border-bottom border-white"
            style = {{
                borderRadius: "15px",
                backgroundColor: "rgba(255, 255, 255, 0.9)",
            }}
        >
            <h1 className="fs-2 lead">
                {title}
            </h1>
            <h2 className="fs-4 text-muted lead">
                <i>{subtitle}</i>
            </h2>
        </header>

    );
}