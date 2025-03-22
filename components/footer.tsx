import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { MessageSquareMore, Coffee } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t w-full h-16">
      <div className="container flex items-center sm:justify-between justify-center sm:gap-0 gap-4 h-full text-muted-foreground text-sm flex-wrap sm:py-0 py-3 max-sm:px-4">
        <div className="flex items-center gap-3">
          <p className="text-center">
            Criado Por{" "}
            <Link
              className="px-1 underline underline-offset-2"
              href="https://www.linkedin.com/in/marcos-nathanael-b39936196/"
            >
              Marcos N
            </Link>
            | me siga no
            <Link
              className="px-1 underline underline-offset-2"
              href="https://github.com/RazielID752/RazielID752"
            >
              GitHub
            </Link>
            .
          </p>
        </div>

        <div className="gap-4 items-center hidden md:flex">
          <FooterButtons />
        </div>
      </div>
    </footer>
  );
}

export function FooterButtons() {
  return (
    <>
      <Link
        href="https://wa.me/5521974131359"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <MessageSquareMore className="h-[0.8rem] w-4 mr-2 text-primary fill-current" />
        Contato
      </Link>
      <Link
        href="https://www.buymeacoffee.com/razielid752" target="_blank" rel="noreferrer noopener"
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        <Coffee className="h-4 w-4 mr-2 text-[#FFDD00] fill-current" />
        Buy me a coffee
      </Link>
    </>
  );
}
