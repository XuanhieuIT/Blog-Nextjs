"use client"

export function TechPartners() {
    const logos = [
        { name: "WordPress", src: "https://upload.wikimedia.org/wikipedia/commons/9/98/WordPress_blue_logo.svg", scale: "w-10" },
        { name: "Next.js", src: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png", scale: "w-8 invert dark:invert-0" },
        { name: "React", src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg", scale: "w-9" },
        { name: "TypeScript", src: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg", scale: "w-9" },
        { name: "Tailwind", src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg", scale: "w-10" },
        { name: "Supabase", src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Supabase_logo.svg", scale: "w-8" },
        { name: "GraphQL", src: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg", scale: "w-9" },
        { name: "Vercel", src: "https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png", scale: "w-8 invert dark:invert-0" },
    ]

    return (
        <section className="py-12 border-t">
            <div className="flex flex-wrap items-center justify-between gap-6 md:gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                {logos.map((logo, idx) => (
                    <div key={idx} className="h-16 w-24 md:w-28 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                        <img src={logo.src} alt={logo.name} className={`${logo.scale} object-contain`} />
                    </div>
                ))}
            </div>
        </section>
    )
}
