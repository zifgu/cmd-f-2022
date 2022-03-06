function parseFeeling(relationType, textMessage) {
    return `My ${relationType} said to me: ${textMessage}\n Summarize their feeling in one word:`;
}

function parseEmoji(parsedFeeling) {
    return `Convert into emoji.\n happy:😀\n scared:😨\n mischievous:😜\n"${parsedFeeling}":`;
}

function generateBasicResponse(relationType, textMessage) {
    return `${relationType}: ${textMessage}\n me:`;
}

function generateEmojiResponse(basicResponse) {
    return `Convert text into emoji.\nBack to the Future:👨👴🚗🕒\nBatman:🤵🦇\nTransformers:🚗🤖\n"${basicResponse}":`;
}

function generateFeelingResponse(relationType, textMessage) {
    return `My ${relationType} said to me: ${textMessage}\n Hearing this makes me feel: `;
}

function generateParaphraseResponse(textMessage) {
    return `Paraphrase this for a second-grade student, change pronouns to second person:\n${textMessage}\n`;
}

function getMoodColor(parsedEmotion) {
    return `The CSS code for a color like ${parsedEmotion}:\n\n background-color:\n`;
}

export async function getEmotion(openai, relationship, message) {
    const emotion = await openai.createCompletion("text-davinci-001", {
        prompt: parseFeeling(relationship, message),
        temperature: 0,
        max_tokens: 15,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    });
    return emotion.data.choices[0].text.trim();
}

export async function getEmoji(openai, emotion) {
    const emoji = await openai.createCompletion("text-davinci-001", {
        prompt: parseEmoji(emotion),
        temperature: 0.8,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\n"],
    });

    return emoji.data.choices[0].text.trim();
}

export async function getBasicResponse(openai, relationship, message) {
    const basicResponse = await openai.createCompletion("text-davinci-001", {
        prompt: generateBasicResponse(relationship, message),
        temperature: 0.8,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\n"],
    });
    return basicResponse.data.choices[0].text.trim();
}

export async function getEmojiResponse(openai, basicResponse) {
    const emojiResponse = await openai.createCompletion("text-davinci-001", {
        prompt: generateEmojiResponse(basicResponse),
        temperature: 0.8,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\n"],
    });

    return emojiResponse.data.choices[0].text.trim();
}

export async function getFeelingResponse(openai, relationship, message) {
    const feelingResponse = await openai.createCompletion("text-davinci-001", {
        prompt: generateFeelingResponse(relationship, message),
        temperature: 0.3,
        max_tokens: 40,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return feelingResponse.data.choices[0].text.trim();
}

export async function getParaphraseResponse(openai, message) {
    const paraphraseResponse = await openai.createCompletion("text-davinci-001", {
        prompt: generateParaphraseResponse(message),
        temperature: 0.7,
        max_tokens: 64,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return paraphraseResponse.data.choices[0].text.trim();
}

export async function getColorResponse(openai, emotion) {
    const color = await openai.createCompletion("text-davinci-001", {
        prompt: getMoodColor(emotion),
        temperature: 0,
        max_tokens: 64,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: [";"],
    });

    return color.data.choices[0].text.trim()
}