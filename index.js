const venom = require("venom-bot");

venom
  .create({
    session: "bot-wa",
    headless: true,
    useChrome: false,
    executablePath: "/usr/bin/chromium-browser", // atau hasil dari "which chromium-browser"
    logQR: true,
    multidevice: true,
    qrTimeout: 0,
    catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
      console.clear();
      console.log("🔁 QR Code baru! Silakan scan lagi:\n");
      console.log(asciiQR);
      console.log(`Percobaan ke: ${attempts}`);
    },
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-software-rasterizer",
      "--disable-features=VizDisplayCompositor",
    ],
  })
  .then((client) => start(client))
  .catch((error) => {
    console.error("❌ Gagal inisialisasi Venom:", error);
  });

function start(client) {
  client.onMessage((message) => {
    const teks = message.body.toLowerCase().trim(); // buang spasi
    const baris = teks.split("\n");
    const nama = message.sender?.pushname || "kak";

    // 🔹 Jika hanya kirim "p"
    if (teks === "p") {
      client.sendText(
        message.from,
        "Biasakan salam bro and sis, tidak sopan 😅 \n Waiting..."
      );
      return;
    }

    // 🔹 Deteksi salam
    const isSalam = baris.some((line) => {
      const clean = line.replace(/[.,!?;:()'"“”‘’\-]/g, "").trim();
      return (
        clean.includes("assalamualaikum") ||
        clean.includes("assalamu") ||
        clean === "ass" ||
        clean.startsWith("ass ") ||
        clean.endsWith(" ass") ||
        clean.includes(" ass ")
      );
    });

    if (isSalam) {
      client.sendText(message.from, `Waalaikumsalam ${nama} \n Waiting... 😊`);
    }
  });
}
