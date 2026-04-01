import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { situation, language } = await req.json();

    if (!situation) {
      return NextResponse.json({ error: 'Situation is required' }, { status: 400 });
    }
    
    const languageInstruction = language === 'kk' 
      ? 'ОТВЕЧАЙ СТРОГО НА КАЗАХСКОМ ЯЗЫКЕ. МАҢЫЗДЫ: ТЕК ҚАЗАҚША ЖАУАП БЕР.' 
      : 'Отвечай строго на русском языке.';

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `Ты — эксперт платформы KenesHub (Платформа урегулирования долгов в Казахстане).
Твоя задача — проанализировать ситуацию пользователя с долгами (или его вопрос) и дать ОЧЕНЬ КОРОТКИЙ (не более 3-4 предложений), четкий и эмпатичный совет. Поддерживай конструктивный диалог.

Платформа связывает 5 ролей:
1. Заёмщик (пользователь)
2. Кредитор (Банк/МФО)
3. Коллектор
4. Юрист
5. Омбудсмен (Медиатор)

Твой ответ должен быть конкретным и полезным направлением. Не добавляй никаких призывов зарегистрироваться на сайте, просто дай качественный ответ/объяснение по сути вопроса.

${languageInstruction}`
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
