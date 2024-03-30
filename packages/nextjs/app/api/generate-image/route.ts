import { NextResponse } from 'next/server';

// prompt 추가 가능
const customPrompt = 'pfp nft, a figure wearing a helmet, looking left sideways, embodying a theme of security, with an overall red color scheme, integrated into a pixelated collection. The scene is set against a backdrop that hints at vigilance and protection. Negative prompt: 3d, anime, (deformed eyes, nose, ears, nose), bad anatomy, ugly. The image should evoke a sense of safeguarding, with elements that may include encrypted symbols, digital locks, or abstract representations of cybersecurity,';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'dall-e-2',
        prompt: customPrompt + prompt,
        n: 1,
        size: '256x256',
      }),
    });

    const data = await res.json();
    console.log('data : ', data);

    if (data && data.data) {
      return NextResponse.json({ url: data.data[0].url });
    } else {
      return NextResponse.json(
        { error: 'Failed to retrieve image from OpenAI' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log('error : ', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
