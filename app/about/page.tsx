import React from "react";

const SobreMim: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-between  text-foreground">
      <div className="shadow-md rounded-lg bg-card text-card-foreground">
        <h1 className="text-3xl font-bold mb-6">Sobre mim</h1>
        <div className="flex flex-col">
          <h2 className="text-xl font-semibold">
            Olá! Sou <span className="text-primary">Marcos N</span>,
          </h2>
        </div>
        <p className="mt-6 leading-relaxed">
          E tenho o prazer de compartilhar com você este guia dedicado ao{" "}
          <strong>desenvolvimento Front-End</strong>. Ao longo dos últimos 2
          anos, tenho tido a oportunidade de ensinar <strong>Front-End</strong>{" "}
          para alunos no <strong>SENAI</strong>, e também sou um{" "}
          <strong>UX/UI Designer</strong> com mais de 4 anos de experiência em
          criar interfaces de alta qualidade e focadas no usuário.
        </p>
        <p className="mt-4 leading-relaxed">
          Minha jornada no mundo do design e desenvolvimento começou com a
          paixão por criar experiências digitais mais intuitivas e funcionais.
          Com experiência em tecnologias como{" "}
          <strong>React.js</strong>, <strong>Next.js</strong>,{" "}
          <strong>HTML5</strong>, <strong>CSS3</strong>,{" "}
          <strong>JavaScript</strong>, <strong>Tailwind</strong>, <strong>TypeScript</strong> e ferramentas de design como{" "}
          <strong>Figma</strong> e <strong>Adobe XD</strong>, procuro sempre
          unir o melhor do design com as melhores práticas de desenvolvimento
          para criar produtos web completos e eficientes.
        </p>
        <p className="mt-4 leading-relaxed">
          Além disso, sou apaixonado por compartilhar conhecimento e ajudar
          novos desenvolvedores a entenderem os conceitos fundamentais do{" "}
          <strong>Front-End</strong>, com um foco especial em{" "}
          <strong>acessibilidade</strong>, <strong>design responsivo</strong> e{" "}
          <strong>boas práticas de usabilidade</strong>.
        </p>
        <p className="mt-4 leading-relaxed">
          Neste guia, você encontrará uma série de tópicos e tutoriais que irão
          ajudá-lo a fortalecer suas habilidades e aprender a criar interfaces
          modernas e de alta qualidade.
        </p>
        <p className="mt-6 font-semibold">
          Espero que você aproveite a leitura e aprenda muito! Se tiver dúvidas
          ou sugestões, estou à disposição!
        </p>
      </div>
      <div>

      </div>
    </div>
  );
};

export default SobreMim;
