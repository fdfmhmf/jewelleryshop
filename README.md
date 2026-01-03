# Shestyle — Jewellery & Accessories (Static Site)

What this is
- A small static website scaffold (HTML/CSS/JS) that lists products you provided.
- products.json contains all items you listed.
- Images are expected to live in the `images/` folder with filenames matching the product `id` (e.g. `earrings.jpg`).

How to run locally
1. Put all files in a folder.
2. Create an `images/` folder in the same folder and add images (see naming below).
3. Run a simple HTTP server (browsers block fetch from file://):
   - Python 3: `python -m http.server 8000`
   - Then open: `http://localhost:8000`

Image naming & adding custom images
- Each product entry in `products.json` uses an `image` path `images/<slug>.jpg`.
- To use your own photos:
  - Save the image as `images/<product-id>.<ext>` (for example `images/bridal-set.jpg`).
  - Accepted extensions: `.jpg`, `.jpeg`, `.png`, `.webp`.
  - If the filename differs, edit `products.json` and change the `image` field to the correct filename.
- If an image is missing, the site will fall back to a placeholder image automatically.

If you want me to add the images for you
- Send the image files (zipped or individually). Name each file with the product id (see `products.json` id fields). I will update the `images/` links or embed them for you.

Customizations I can make next (tell me which):
- Add checkout integration (Stripe / Razorpay).
- Add categories pages, product detail pages with multiple photos.
- Improve styling or add your logo and brand colors.
- Add an admin uploader to manage product images and inventory.
- Export as a ready-to-deploy package for Vercel/Netlify.

Enjoy — tell me which images you want to upload and I will place them in the site and update everything for you.