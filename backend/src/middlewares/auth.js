import { createClient } from "@supabase/supabase-js";

export async function supabaseAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  // const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  const token = req.cookies?.authToken;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    );

    const { data: user, error } = await supabase.auth.getUser();
    if (error || !user) {
      return res
        .status(401)
        .json({ error: `Unauthorized: ${error?.message || "Invalid token"}` });
    }

    req.supabase = supabase;
    req.user = user.user;
    next();
  } catch (err) {
    return res
      .status(500)
      .json({ error: `Internal Server Error: ${err.message}` });
  }
}

export async function verifyUser(req, res, next) {
  const { userId } = req.body;
  const id = req.user.id;
  if (!userId || !id)
    return res.json({
      error: `${!userId ? "user from req" : "user from supabase"} not provided`,
    });
  if (userId == id) {
    next();
  } else {
    return res.status(401).json({ error: `Unauthorized` });
  }
}
