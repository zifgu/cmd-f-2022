import Container from "react-bootstrap/Container";

const people = [
    {
        name: "Nicole",
        url: "https://github.com/nicolelassetter",
    },
    {
        name: "Floria",
        url: "https://github.com/zifgu",
    },
    {
        name: "Coco",
        url: "https://github.com/cocowcy",
    },
];

export function Footer() {
    return (
        <footer className="footer mt-auto border-top bg-light">
            <Container className="pt-4">
                Created by:
                <TeamMembers />

            </Container>
        </footer>
    );
}

function TeamMembers() {
    return (
        people.map((person) => (
            <p>
                 <a href={person.url} className="text-muted text-center">{person.name}</a>
            </p>
        ))
    );
}