import { prisma } from "./database.server";
import { hash, compare } from "bcryptjs";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

const SESSION_SECRET = process.env.SESSION_SECRET;
const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function signup({ email, password }) {
  // Check if user email exists
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error(
      "A user with the provided email address exists already."
    );
    error.status = 422;
    throw error;
  }

  // hash pw
  const passwordHash = await hash(password, 12);

  // store user in db
  const user = await prisma.user.create({
    data: {
      email,
      password: passwordHash,
    },
  });
  return createUserSession(user.id, "/expenses");

  // try {
  //   return await prisma.expense.create({
  //     data: {
  //       title: expenseData.title,
  //       amount: +expenseData.amount,
  //       date: new Date(expenseData.date),
  //     },
  //   });
  // } catch (error) {
  //   console.log(error);
  //   throw new Error("Failed to add expense.");
  // }
}

export async function login({ email, password }) {
  //check user exists
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (!existingUser) {
    const error = new Error(
      "Could not log you in. Please check the provided credentials."
    );
    error.status = 401;
    throw error;
  }

  // check the password is correct
  const passwordCorrect = await compare(password, existingUser.password);

  if (!passwordCorrect) {
    const error = new Error("Password is incorrect.");
    error.status = 401;
    throw error;
  }
  // create cookie and return session
  return createUserSession(existingUser.id, "/expenses");
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
  //   sessionStorage.destroySession(session);
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);
  if (!userId) {
    throw redirect("/auth?mode=login");
  }
  return userId;
}
