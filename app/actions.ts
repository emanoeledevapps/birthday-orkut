"use server"

import prisma from "@/lib/prisma";
import { Prisma, User } from "./generated/prisma";

type PostProps = Prisma.PostGetPayload<{
  include: { user: true; photos: true };
}>;

interface CheckUserExistsProps {
  id: string;
}
interface ReturnCheckUserExistsProps {
  exists: boolean;
  user?: User;
}
export async function checkUserExists({ id }: CheckUserExistsProps): Promise<ReturnCheckUserExistsProps> {
  const user = await prisma.user.findUnique({
    where: { id }
  })

  return {
    exists: user ? true : false,
    user: user ? user : undefined
  }
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
  photos: { url: string }[]
}
interface ReturnCreatePostProps {
  success: boolean;
  post?: PostProps;
  message?: string;
}
export async function createPost({ message, userId, photos }: CreatePostProps): Promise<ReturnCreatePostProps> {
  try {
    const response = await prisma.post.create({
      data: {
        message,
        userId,
        photos: {
          create: photos
        }
      },
      include: {
        user: true,
        photos: true
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

interface GetPostsProps {
  page: number;
}
interface ReturnGetPostProps {
  success: boolean;
  posts: PostProps[];
  message?: string;
  meta: {
    current_page: number;
    total_pages: number;
    total_posts: number;
  }
}
export async function getPosts({ page }: GetPostsProps): Promise<ReturnGetPostProps> {
  const limitPerPage = 10;
  const skip = (page - 1) * limitPerPage;

  try {
    const posts = await prisma.post.findMany({
      skip,
      take: limitPerPage,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true,
        photos: true
      }
    });

    const totalPosts = await prisma.post.count();
    const totalPages = Math.ceil(totalPosts / limitPerPage);

    return {
      success: true,
      posts,
      meta: {
        current_page: page,
        total_pages: totalPages,
        total_posts: totalPosts
      }
    }
  } catch (e) {
    console.log(e);
    return {
      success: false,
      posts: [],
      meta: {
        current_page: page,
        total_pages: 0,
        total_posts: 0
      }
    }
  }
}

interface UpdateProfilePhotoProps {
  userId: string;
  profilePhotoUrl: string;
}
interface ReturnUpdateProfilePhotoProps {
  success: boolean
  user?: User
}
export async function updateProfilePhoto(
  {
    userId, profilePhotoUrl
  }: UpdateProfilePhotoProps):
  Promise<ReturnUpdateProfilePhotoProps> {

  try {
    const response = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profilePhoto: profilePhotoUrl
      }
    })

    return {
      success: true,
      user: response
    }
  } catch (e) {
    console.log(e);
    return {
      success: false
    }
  }
}