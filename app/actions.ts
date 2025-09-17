"use server"

import prisma from "@/lib/prisma";
import { Post, User } from "./generated/prisma";

interface CheckUserExistsProps {
  id: string;
}
export async function checkUserExists({ id }: CheckUserExistsProps): Promise<boolean> {
  const response = await prisma.user.count({
    where: { id }
  })

  return response > 0
}

interface CreateUserProps {
  id: string;
  name: string;
}
interface ReturnCreateUserProps {
  success: boolean;
  user?: User;
  message?: string;
}
export async function createUser({ id, name }: CreateUserProps): Promise<ReturnCreateUserProps> {
  try {
    const userExists = await prisma.user.findFirst({ where: { id } });
    if (userExists) {
      return {
        success: false,
        message: "user-exists"
      }
    }

    const response = await prisma.user.create({
      data: {
        id,
        name
      }
    })

    return {
      success: true,
      user: response
    }
  } catch (e) {
    console.log(e)
    return { success: false }
  }
}

interface CreatePostProps {
  userId: string;
  message: string;
}
interface ReturnCreatePostProps {
  success: boolean;
  post?: Post;
  message?: string;
}
export async function createPost({ message, userId }: CreatePostProps): Promise<ReturnCreatePostProps> {
  try {
    const response = await prisma.post.create({
      data: {
        message,
        userId
      }
    });

    return {
      success: true,
      post: response
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
    }
  }
}