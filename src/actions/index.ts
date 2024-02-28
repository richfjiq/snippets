'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { db } from '@/db';

export const editSnippet = async (id: number, code: string) => {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: { id },
  });
  revalidatePath('/');
  redirect('/');
};

export const createSnippet = async (
  formState: { message: string },
  formData: FormData
) => {
  // check the user's inputs and make sure they're valid
  const title = formData.get('title');
  const code = formData.get('code');

  if (typeof title !== 'string' || title.length < 3) {
    return {
      message: 'Tittle must be longer.',
    };
  }

  if (typeof code !== 'string' || code.length < 10) {
    return {
      message: 'Code must be longer.',
    };
  }

  try {
    // create a new record in the database
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: 'Something went wrong...',
      };
    }
  }

  revalidatePath('/');
  // redirect the user back to the root route
  // always leave the redirect outside the try catch, because inside causes an error 'NEXT_REDIRECT'
  redirect('/');
};
