import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { MoveUpRightIcon} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex sm:min-h-[85.5vh] min-h-[85vh] flex-col items-center justify-center text-center px-2 sm:py-8 py-12">
      <Link
        href="https://github.com/RazielID752/RazielID752"
        target="_blank"
        className="mb-5 sm:text-lg flex items-center gap-2 underline underline-offset-4 sm:-mt-12"
      >
        Siga no GitHub{" "}
        <MoveUpRightIcon className="w-4 h-4 font-extrabold" />
      </Link>
      <h1 className="text-4xl font-bold mb-4 sm:text-6xl">
        Domine o front-end de maneira prática
      </h1>
      <p className="mb-8 sm:text-lg max-w-[800px] text-muted-foreground">
        Esta documentação foi criada para ser sua guia no caminho do front-end,
        proporcionando a base sólida e as ferramentas necessárias para
        impulsionar sua carreira. Com exemplos práticos e explicações claras,
        você estará preparado para enfrentar desafios reais e se destacar no
        desenvolvimento web.
      </p>
      <div className="flex flex-row items-center gap-5">
        <Link
          href={`/docs${page_routes[0].href}`}
          className={buttonVariants({ className: "px-6", size: "lg" })}
        >
          Iniciar leitura
        </Link>
        <Link
          href="/blog"
          className={buttonVariants({
            variant: "secondary",
            className: "px-6",
            size: "lg",
          })}
        >
          Ler Blog
        </Link>
      </div>
    </div>
  );
}
