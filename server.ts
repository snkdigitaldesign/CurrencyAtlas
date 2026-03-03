import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Proxy for ExchangeRate-API to hide key
  app.get("/api/exchange/:base", async (req, res) => {
    const { base } = req.params;
    const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
    
    if (!apiKey || apiKey === "MY_EXCHANGE_API_KEY" || apiKey === "") {
      return res.status(401).json({ 
        error: "API key not configured", 
        message: "Please set NEXT_PUBLIC_EXCHANGE_API_KEY in your environment variables." 
      });
    }

    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`);
      const data = await response.json();
      
      if (data.result === "error") {
        return res.status(400).json(data);
      }
      
      res.json(data);
    } catch (error) {
      console.error("Fetch error:", error);
      res.status(500).json({ error: "Failed to fetch exchange rates" });
    }
  });

  // Historical data proxy
  app.get("/api/history/:base/:target", async (req, res) => {
    const { base, target } = req.params;
    const apiKey = process.env.NEXT_PUBLIC_EXCHANGE_API_KEY;
    
    if (!apiKey || apiKey === "MY_EXCHANGE_API_KEY" || apiKey === "") {
      return res.status(401).json({ error: "API key not configured" });
    }

    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${base}/${target}`);
      const data = await response.json();
      
      if (data.result === "error") {
        return res.status(400).json(data);
      }

      res.json(data);
    } catch (error) {
      console.error("Fetch error:", error);
      res.status(500).json({ error: "Failed to fetch historical data" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
