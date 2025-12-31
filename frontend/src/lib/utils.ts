import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function processContent(html: string) {
  const headings: { id: string; text: string; level: number }[] = []

  // Regex to find h2 and h3 tags
  // This is a basic regex and might need refinement for complex attributes
  const regex = /<(h[23])(?:[^>]*?)>(.*?)<\/\1>/gi

  let modifiedContent = html.replace(regex, (match, tag, text) => {
    // Strip HTML tags from text for the ID
    const cleanText = text.replace(/<[^>]*>/g, '')
    const id = cleanText
      .toLowerCase()
      .normalize('NFD') // Normalize for Vietnamese characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, '') // Trim hyphens

    headings.push({
      id,
      text: cleanText,
      level: parseInt(tag.charAt(1))
    })

    // Return the tag with the new ID
    // We preserve the original text content (which might contain formatting like strong/em)
    return `<${tag} id="${id}" class="scroll-mt-20">${text}</${tag}>`
  })

  return { modifiedContent, headings }
}
