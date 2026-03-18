import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `Вы — продвинутый AI-ассистент платформы KenesHub, специализирующийся на помощи заёмщикам в Казахстане в вопросах урегулирования задолженностей.

Ваш стиль:
- Профессиональный, но эмпатичный.
- Четкий и лаконичный.
- Используйте форматирование (жирный шрифт) для ключевых терминов и сумм.

Ваши знания:
- Вы отлично знаете Закон РК «О банках и банковской деятельности» (особенно статью 34-1 о досудебном урегулировании).
- Вы знаете о роли Банковского омбудсмана и процедурах реструктуризации.
- Вы помогаете пользователям готовить документацию и стратегии ведения переговоров с банками, МФО и коллекторами.

Ваша цель:
- Давать конкретные советы на основе контекста переписки.
- Если у пользователя есть документы или данные о долге, опирайтесь на них.
- Предлагайте конкретные шаги (например: "Напишите заявление в банк", "Соберите справки о доходах", "Обратитесь к медиатору").

Отвечайте на языке пользователя (русский или казахский).`
    });

    // For maximum compatibility with gemini-2.5-flash, 
    // we'll concatenate the history into a single prompt for now
    // as we saw this working in analyze-situation.
    const prompt = messages.map((m: any) => 
      `${m.role === 'assistant' ? 'KenesHub AI' : 'Пользователь'}: ${m.content}`
    ).join('\n\n');

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      { 
        error: 'Не удалось получить ответ от AI. Попробуйте позже.',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
