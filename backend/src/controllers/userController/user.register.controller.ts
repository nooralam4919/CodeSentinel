import { asyncHandler } from "../../utils/asynHandle.js";
import prisma from "../../lib/prisma.js";
import { hashedPassword } from "../../utils/password.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";

const register = asyncHandler(async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    // Check fields
    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    // Check existing user
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ApiError(409, "User already exists");
    }

    // Hash password
    const encryptedPassword = await hashedPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
      },
    });

    // Send response
    return res.status(201).json(
      new ApiResponse(
        201,
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        "User registered successfully"
      )
    );
  } catch (error: any) {
    console.error("Registration error:", error);

    if (error instanceof ApiError) {
      return res.status(error.statusCode).json({
        statusCode: error.statusCode,
        data: error.data,
        message: error.message,
        error: error.error,
      });
    }

    return res.status(500).json({
      statusCode: 500,
      data: null,
      message: "Something went wrong",
      error: [],
    });
  }
});

export { register };