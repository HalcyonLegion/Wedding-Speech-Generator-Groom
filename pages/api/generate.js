import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const { tone, groom, bride, duration, metstory, feeling, times123, adventures, future } = req.body;

  if (!tone || !groom || !bride || !duration || !metstory || !feeling || !times123 || !adventures || !future) {
    res.status(400).json({
      error: {
        message: "Please enter all required inputs",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model:"text-davinci-003",
      prompt: generatePrompt(tone, groom, bride, duration, metstory, feeling, times123, adventures, future),
      temperature: 0.8,
      max_tokens: 1500,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(tone, groom, bride, duration, metstory, feeling, times123, adventures, future) {
  return `
  tone: ${tone}
  groom: ${groom}
  bride: ${bride}
  duration: ${duration}
  metstory: ${metstory}
  feeling: ${feeling}
  times123: ${times123}
  adventures: ${adventures}
  future: ${future}
  
  Using British English, write out a complete and detailed, ${tone} Wedding Speech to be given by the Groom whose name is ${groom}. The name of his Bride, the person he married today, is ${bride}. ${groom} and ${bride} have been engaged for ${duration} and he will mention this fact in the speech. The Speech must include these details from this story about how ${bride} and ${groom} first met ${metstory}. ${groom} will talk about how excited he has been feeling about this big day, and as well as how nervous he was until he saw ${bride} in her dress for the first time. ${groom} will talk about how he met the Bride's family for the first time as well as how he felt ${feeling} about asking ${bride}'s father for his blessing. ${groom} will lavish praise on ${bride} throughout the speech and thank her for all the times she was there for him, which were: ${times123}. The Groom will also talk about how great the Bride is with his own family, and that he is very proud of her. The Groom will talk about their adventures together ${adventures} as well as their plans for the future ${future}. The speech will wrap up with the Groom thanking everybody for attending, making a friendly comment about the Bridesmaids and his Best Man and then finally finishing with a heartfelt toast to his new wife ${bride} Write out the entire Speech in great detail and be as ${tone} throughout:

`;
}