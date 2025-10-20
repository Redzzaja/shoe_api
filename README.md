Tentu, berikut adalah draf `README.md` yang disesuaikan untuk proyek kita, dengan mengambil inspirasi struktur dari referensi yang Anda berikan, namun menggunakan teknologi dan *endpoint* yang telah kita bangun (Node.js, Express, Supabase, Vercel).

-----

````markdown
# REST API Layanan Cuci Sepatu (Node.js + Supabase)

## Deskripsi Umum

Proyek ini adalah REST API *backend* yang dibangun menggunakan **Node.js** dan **Express.js** untuk mengelola data operasional layanan cuci sepatu. API ini terhubung ke database **Supabase** (PostgreSQL) untuk penyimpanan data yang persisten dan di-deploy ke **Vercel** agar dapat diakses secara publik.

Tujuan utama proyek ini adalah menyediakan *backend* yang fungsional dan *scalable* untuk aplikasi *frontend* (web atau *mobile*), yang memungkinkan pencatatan, pemantauan, dan pembaruan status cucian sepatu secara *real-time*.

## Fitur Utama API

API ini mengimplementasikan fungsionalitas CRUD (Create, Read, Update, Delete) penuh.

| Metode | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/items` | Mendapatkan seluruh daftar item cucian. |
| `GET` | `/items/:id` | Mendapatkan satu item spesifik berdasarkan ID. |
| `POST` | `/items` | Menambahkan data sepatu baru ke dalam antrian. |
| `PUT` | `/items/:id` | Memperbarui data item (misal: mengubah status). |
| `DELETE` | `/items/:id` | Menghapus data item dari database. |

---

## Fitur Khusus: Filter Status

API ini mendukung pemfilteran *query parameter* untuk melihat item berdasarkan status pengerjaan.

**Contoh Request:**
`GET /items?status=Selesai`

Ini akan mengembalikan *array* yang hanya berisi item cucian dengan status "Selesai".

---

## Struktur Data (Skema Supabase)

Data disimpan dalam tabel `laundry_items` di Supabase dengan skema berikut:

| Kolom | Tipe Data | Deskripsi |
| :--- | :--- | :--- |
| `id` | `bigint` (PK) | ID unik untuk setiap item, dibuat otomatis. |
| `customer_name`| `text` | Nama pelanggan. |
| `shoe_type` | `text` | Merek atau jenis sepatu (misal: "Nike Air Force 1"). |
| `service_type` | `text` | Jenis layanan (misal: "Deep Clean", "Unyellowing"). |
| `status` | `laundry_status` (ENUM) | Status pengerjaan ('Diterima', 'Dicuci', 'Dikeringkan', 'Selesai', 'Diambil'). |
| `received_date`| `date` | Tanggal item diterima (default: hari ini). |
| `finished_date`| `date` | Tanggal item selesai dikerjakan (nullable). |

---

## Teknologi yang Digunakan

* **Node.js:** Runtime environment JavaScript sisi server.
* **Express.js:** Framework *backend* minimalis untuk membangun API.
* **Supabase:** Platform *Backend-as-a-Service* (BaaS) yang menyediakan database PostgreSQL.
* **Vercel:** Platform *cloud* untuk *hosting* dan *deployment* *serverless*.
* **Dependensi:** `@supabase/supabase-js`, `express`, `cors`, `dotenv`.

---

## Contoh Request dan Response

**URL Basis:** `[GANTI DENGAN LINK VERCEL ANDA]`

---

### 1. GET /items
Mendapatkan semua item.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "customer_name": "Agus Setiawan",
    "shoe_type": "Nike Air Max 90",
    "service_type": "Deep Clean",
    "status": "Selesai",
    "received_date": "2025-10-20",
    "finished_date": "2025-10-21"
  },
  {
    "id": 2,
    "customer_name": "Citra Lestari",
    "shoe_type": "Adidas Stan Smith",
    "service_type": "Fast Clean",
    "status": "Dicuci",
    "received_date": "2025-10-21",
    "finished_date": null
  }
]
````

-----

### 2\. POST /items

Membuat item baru.

**Body Request (JSON):**

```json
{
  "customer_name": "Budi Santoso",
  "shoe_type": "Converse Chuck Taylor",
  "service_type": "Unyellowing"
}
```

**Response (201 Created):**
*(API mengembalikan data lengkap yang baru dibuat)*

```json
{
  "id": 3,
  "customer_name": "Budi Santoso",
  "shoe_type": "Converse Chuck Taylor",
  "service_type": "Unyellowing",
  "status": "Diterima",
  "received_date": "2025-10-22",
  "finished_date": null
}
```

-----

### 3\. PUT /items/:id

Mengupdate item (misal: item dengan `id` 2).

**Request:** `PUT /items/2`

**Body Request (JSON):**

```json
{
  "status": "Selesai",
  "finished_date": "2025-10-22"
}
```

**Response (200 OK):**
*(API mengembalikan data lengkap yang baru di-update)*

```json
{
  "id": 2,
  "customer_name": "Citra Lestari",
  "shoe_type": "Adidas Stan Smith",
  "service_type": "Fast Clean",
  "status": "Selesai",
  "received_date": "2025-10-21",
  "finished_date": "2025-10-22"
}
```

-----

### 4\. DELETE /items/:id

Menghapus item (misal: item dengan `id` 1).

**Request:** `DELETE /items/1`

**Response (204 No Content):**
(Tidak ada *body* respons, menandakan sukses)

-----

## Instalasi dan Menjalankan Lokal

1.  **Clone Repository:**

    ```bash
    git clone [https://github.com/](https://github.com/)<username>/<repo-name>.git
    cd <repo-name>
    ```

2.  **Instalasi Dependensi:**

    ```bash
    npm install
    ```

3.  **Setup Environment:**

      * Buat file `.env` di *root* proyek.
      * Isi file tersebut dengan kredensial Supabase Anda:
        ```env
        SUPABASE_URL=https://<your-project-id>.supabase.co
        SUPABASE_ANON_KEY=<your-anon-public-key>
        ```

4.  **Menjalankan Server (Development):**

    ```bash
    npm run dev
    ```

    API akan berjalan di `http://localhost:3000`.

## Link Deploy (Vercel)

API ini telah di-deploy dan dapat diakses secara publik melalui URL berikut:

**[MASUKKAN LINK DEPLOY VERCEL ANDA DI SINI]**

```
```
