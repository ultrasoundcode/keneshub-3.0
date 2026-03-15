import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { situation } = await req.json();

    if (!situation) {
      return NextResponse.json({ error: 'Situation is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Ты — эксперт платформы KenesHub (Платформа урегулирования долгов в Казахстане).
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
    });

    const result = await model.generateContent(situation);
    const response = await result.response;
    const advice = response.text();

    return NextResponse.json({ advice });
  } catch (error) {
    console.error('Error analyzing situation:', error);
    return NextResponse.json(
      { error: 'Failed to analyze situation. Please try again later.' },
      { status: 500 }
    );
  }
}
