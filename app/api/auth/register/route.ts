import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { name, email, role } = await request.json();

    if (!name || !email || !role) {
      return NextResponse.json({ error: 'Все поля обязательны' }, { status: 400 });
    }

    // Сохраняем в реальную БД
    const newUser = await db.insert(users).values({
      id: uuidv4(),
      name,
      email,
      role,
    }).returning().get();

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return NextResponse.json({ error: 'Ошибка сервера или такой email уже есть' }, { status: 500 });
  }
}
