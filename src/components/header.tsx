"use client";
import { Music } from "lucide-react";

export default function Header() {
  return (
    <header className="flex flex-col gap-4 px-7 py-5">
      {/* <Breadcrumbs /> */}
      <div className="flex items-center gap-3">
        <Music className="stroke-[3]" />
        <h1 className="text-2xl font-semibold">drum-drum</h1>
      </div>
    </header>
  );
}

// function Breadcrumbs() {
//   const pathname = usePathname();
//   const pages = pathname.split("/").slice(1);
//   return (
//     <nav className="flex" aria-label="Breadcrumb">
//       <ol role="list" className="flex items-center space-x-4">
//         <li>
//           <div>
//             <a href="#" className="text-gray-400 hover:text-gray-500">
//               <HomeIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
//               <span className="sr-only">Home</span>
//             </a>
//           </div>
//         </li>
//         {pages.map((page, i) => (
//           <li key={page}>
//             <div className="flex items-center">
//               <ChevronRightIcon
//                 className="h-5 w-5 flex-shrink-0 text-gray-400"
//                 aria-hidden="true"
//               />
//               <a
//                 href={`/${slugify(page)}`}
//                 className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
//                 aria-current={i === pages.length - 1 ? "page" : undefined}
//               >
//                 {page}
//               </a>
//             </div>
//           </li>
//         ))}
//       </ol>
//     </nav>
//   );
// }
