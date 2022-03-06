import Container from "react-bootstrap/Container";
import { getHexCodeFromRGBArray } from "./ColourScheme";

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

export function Footer({ colorScheme }) {
    return (
        <footer className="footer mt-auto border-top bg-light bg-opacity-25">
            <Container
                className="py-4 text-center"
            >
                <p>
                    cmd-f 2022
                </p>
                <p>
                    Created by: <TeamMembers colorScheme={colorScheme}/>
                </p>
                <p>
                    Powered by: <FooterLink url={"https://openai.com/api/"} text={"OpenAI API"} colorScheme={colorScheme}/>
                </p>
                <p>
                    Made with React
                </p>
            </Container>
        </footer>
    );
}

function TeamMembers({ colorScheme }) {
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
                    <FooterLink url={person.url} text={person.name} colorScheme={colorScheme}/>
                </span>
            );
        })
    );
}

function FooterLink({ url, text, colorScheme }) {
    return <a
        href={url}
        className="text-decoration-none"
        style={{
            color: getHexCodeFromRGBArray(colorScheme[3]),
        }}
    >
        {text}
    </a>
}