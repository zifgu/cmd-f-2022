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
            <Container className="py-4 text-center">
                <p>
                    cmd-f 2022
                </p>
                <p>
                    Created by: <TeamMembers />
                </p>
                <p>
                    Powered by: <FooterLink url={"https://openai.com/api/"} text={"OpenAI API"}/>
                </p>
                <p>
                    Made with React
                </p>
            </Container>
        </footer>
    );
}

function TeamMembers() {
    return (
        people.map((person, index, array) => {
            let preString = ", ";
            if (index === 0) {
                preString = "";
            } else if (index === array.length - 1) {
                preString = ", and ";
            }

            return (
                <span key={person.name}>
                    {preString}
                    <FooterLink url={person.url} text={person.name}/>
                </span>
            );
        })
    );
}

function FooterLink({ url, text }) {
    return <a href={url} className="text-info text-decoration-none">{text}</a>
}