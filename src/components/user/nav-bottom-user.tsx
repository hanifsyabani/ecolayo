import { Category } from "@prisma/client";

interface NavUserProps {
  category: Category[];
}

export default function NavBottomUser({ category }: NavUserProps) {
  return (
    <nav className="bg-gray-800 w-full flex items-center gap-8 py-2 px-3">
       {category.map((item) => (
          <p key={item.id} className="text-white text-sm">{item.name}</p>
        ))}
    </nav>
  )
}
