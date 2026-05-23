/** Inline DB images (base64 or very long strings) are served via API instead of embedded in HTML/JSON. */

export function isInlineImage(src: string | null | undefined): boolean {
  if (!src) return false;
  return src.startsWith('data:') || src.length > 500;
}

export function productImageUrl(
  productId: string,
  src?: string | null,
  galleryIndex?: number
): string {
  if (!src || isInlineImage(src)) {
    const base = `/api/products/${productId}/image`;
    return galleryIndex != null ? `${base}?i=${galleryIndex}` : base;
  }
  return src;
}

export function categoryImageUrl(categoryId: string, src?: string | null): string {
  if (!src || isInlineImage(src)) {
    return `/api/categories/${categoryId}/image`;
  }
  return src;
}
