import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json();

    console.log("Received contact form data:", { firstName, lastName, email, subject, message });

    // Basic validation
    if (!firstName || !lastName || !email || !subject || !message) {
      console.log("Validation failed: missing fields");
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("Validation failed: invalid email");
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    console.log("Validation passed, inserting into database");

    // Insert into database
    const sql = `
      INSERT INTO contact_messages (first_name, last_name, email, subject, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const result = await query(sql, [firstName, lastName, email, subject, message]);

    console.log("Database insertion result:", result);

    const responseData = { message: "Message sent successfully" };
    console.log("Sending response:", responseData);

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}