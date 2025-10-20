// index.js
import express from "express";
import cors from "cors";
import { supabase } from "./supabaseClient.js";

// Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Mengizinkan Cross-Origin Resource Sharing
app.use(express.json()); // Mem-parsing body request JSON

// --- ROUTES ---

/**
 * @route   GET /items
 * @desc    Mendapatkan semua item cucian, mendukung filter status
 * @query   ?status=Selesai (opsional)
 */
app.get("/items", async (req, res) => {
  const { status } = req.query;

  try {
    let query = supabase.from("laundry_items").select("*");

    // Terapkan filter jika ada
    if (status) {
      query = query.eq("status", status);
    }

    // Urutkan berdasarkan data terbaru
    query = query.order("received_date", { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   GET /items/:id
 * @desc    Mendapatkan satu item berdasarkan ID
 */
app.get("/items/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("laundry_items")
      .select("*")
      .eq("id", id)
      .single(); // .single() akan error jika tidak ada data (bagus untuk 404)

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Item not found" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   POST /items
 * @desc    Membuat item cucian baru
 */
app.post("/items", async (req, res) => {
  // Ambil data dari body, validasi sederhana
  const { customer_name, shoe_type, service_type } = req.body;

  if (!customer_name || !shoe_type || !service_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const { data, error } = await supabase
      .from("laundry_items")
      .insert({ customer_name, shoe_type, service_type }) // Status default 'Diterima' dari SQL
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   PUT /items/:id
 * @desc    Mengupdate item cucian (misal: update status)
 */
app.put("/items/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Data yang akan di-update (misal: { status: 'Selesai' })

  try {
    const { data, error } = await supabase
      .from("laundry_items")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Item not found" });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * @route   DELETE /items/:id
 * @desc    Menghapus item cucian
 */
app.delete("/items/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const { error, count } = await supabase
      .from("laundry_items")
      .delete({ count: "exact" }) // Meminta Supabase mengembalikan jumlah baris yang dihapus
      .eq("id", id);

    if (error) throw error;

    // Periksa apakah ada data yang benar-benar dihapus
    if (count === 0) {
      return res.status(404).json({ error: "Item not found" });
    }

    // 204 No Content adalah respons standar untuk delete sukses
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Root endpoint untuk health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Shoe Laundry API is running." });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Ekspor app untuk Vercel
export default app;
