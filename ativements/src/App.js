import { Paragraph, Title } from "./Components/Texts";
import logomarca from "./Assets/logomarca.png"
import { Register } from "./Pages/Register";
import { Login } from "./Pages/Login";
import { useState } from "react";


function App() {

  const [statusRegister, setStatusRegister] = useState(false)

  return (
    <main className="h-screen flex lg:flex-row sm:flex-col relative sm:gap-[12%] sm:py-[5%] lg:gap-0">

      <section className={`flex flex-col items-center justify-center bg-atvGradient lg:w-1/2 sm:h-[50%] sm:w-[100%] absolute lg:h-screen transition-all duration-700 sm:py-10 ${statusRegister ? "lg:left-[50%] sm:top-[50%] lg:top-[0]" : "lg:left-0 sm:top-[0] lg:top-[0]"}`}>
        <Title styles="text-complementary-white">Bem-vindo ao <img className="mt-3" src={logomarca} alt="Ativements" /></Title>

        <Paragraph styles="text-complementary-white mt-14 w-[45%]">
          A plataforma eficiente para gerenciar e acompanhar todos os recursos da escola SENAI Informática
        </Paragraph>

      </section>


      <Register onLinking={e => {setStatusRegister(false)}}/> 
      <Login onLinking={e => {setStatusRegister(true)}}/>

    </main>
  );
}

export default App;
