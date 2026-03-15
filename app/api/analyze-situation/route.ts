import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { situation } = await req.json();

    if (!situation) {
      return NextResponse.json({ error: 'Situation is required' }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Ты — эксперт платформы KenesHub (Платформа урегулирования долгов в Казахстане).
Твоя задача — проанализировать ситуацию пользователя с долгами и дать ОЧЕНЬ КОРОТКИЙ (не более 3-4 предложений), четкий и эмпатичный совет.

Платформа связывает 5 ролей:
1. Заёмщик (пользователь)
2. Кредитор (Банк/МФО)
3. Коллектор
4. Юрист
5. Омбудсмен (Медиатор)

Твой ответ должен состоять из двух абзацев:
1 абзац: Краткий анализ ситуации и конкретный совет, к кому из специалистов платформы лучше обратиться в данном случае (например, "Вам лучше связаться с медиатором для досудебного урегулирования" или "Вам срочно нужен юрист, так как банк подал в суд").
2 абзац: Призыв к действию. Обязательно напиши: "Зарегистрируйтесь на KenesHub, чтобы начать решение вашей проблемы прямо сейчас."

Отвечай профессионально, но понятно. Не используй сложную терминологию без необходимости.`
        },
        {
          role: 'user',
          content: situation
        }
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const advice = response.choices[0].message.content;

    return NextResponse.json({ advice });
  } catch (error) {
    console.error('Error analyzing situation:', error);
    return NextResponse.json(
      { 
        error: 'Failed to analyze situation. Please try again later.',
        details: error instanceof Error ? error.message : String(error),
        hasKey: !!process.env.OPENAI_API_KEY
      },
      { status: 500 }
    );
  }
}
