import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CardEvent } from "../components/CardEvent";

export default function Home() {

    const date = new Date(); 
    const nomeDoMes = date.toLocaleString('pt-BR', { month: 'long' });
    const nomeDoAno = date.getFullYear();

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <Header pagename={ "Os meus eventos para o mês " + nomeDoMes + " de " + nomeDoAno + "" }/>
                
                
                <div className="container mx-auto  flex-1 overflow-auto  px-1">
                    <div>
                        <CardEvent/>
                    </div>
                </div>
                

                <Footer />
            </div>
        </>
    )
}