"use server"

import prisma from "@/lib/prisma";

interface CheckUserExistsProps {
  email: string
}
export async function checkUserExists({ email }: CheckUserExistsProps): Promise<boolean> {
  const response = await prisma.user.count({
    where: { email }
  })

  return response > 0
}