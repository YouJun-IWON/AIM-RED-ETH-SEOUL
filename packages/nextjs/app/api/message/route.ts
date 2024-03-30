// server action으로 전환 예정
import { ParsedEvent, ReconnectInterval, createParser } from "eventsource-parser";
import { AttackAIPayload } from "~~/validation/message";

// 입력된 데이터의 유효성 검사 진행해야 함
export async function POST(req: Request) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  let counter = 0;

  const { message } = await req.json();

  //! error check
  //throw new Error('message')

  const payload: AttackAIPayload = {
    input: message.text,
    subject: message.subject,
   
    chat_history: message.chat_history,
  };

  console.log("payload", payload);

  const res = await fetch("http://ec2-3-34-141-12.ap-northeast-2.compute.amazonaws.com:3000/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  //console.log(res.json());

  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;

          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            console.log({ json });

            const text = json.answer || "";

            const score = json.score || "";

            if (score) {
              console.log({ score });
            }

            if (counter < 2 && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }

            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
          } catch (e) {
            // maybe parse error

            controller.error(e);
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);

      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  //return stream;

  return new Response(stream);
}
