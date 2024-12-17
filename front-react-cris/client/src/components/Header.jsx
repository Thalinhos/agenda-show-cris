export function Header({ pagename }) { 
    return (
        <> 
            <style>
                {`
                    @media (max-width: 768px) {
                        .agendaTitle {
                            display: none;
                        }
                        .headerClass{
                        margin-bottom: 2.5rem;
                        }
                        header{
                        margin-top: 0.5rem;
                        }
                        .pagenameTitle {
                            margin-top: -32px;
                            margin-left: 32px;
                            margin-right: 32px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-align: center;
                            font-size: 22px;
                        }
                    }
                    @media (min-width: 768px){
                        .pagenameTitle {
                            margin-bottom: 1em;
                        }   
                `}
            </style>

        <div className="titleToMobile">
            <header className="headerClass bg-white text-gray-900 text-center p-1">
                <div className="flex justify-between items-center ml-8 mr-8 mb-2">
                    <img src="./foto_perfil.jpg" alt="Logo" className="w-12 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"/>
                    <h1 className="mt-4 ml-8  text-3xl font-semibold text-gray-800 mb-1 agendaTitle">Minha Agenda</h1>
                    <div className="flex gap-2">
                        <a href="https://www.instagram.com/dj_cris_st/" target="_blank">
                            <img src="./instagram.png" className="w-10" />
                        </a>
                        <a href="https://wa.me/555184727058" target="_blank">
                            <img src="./whatsapp.png" className="w-10"/>
                        </a>
                    </div>
                </div>
            </header>
            <div className="flex items-center justify-center mt-2">
                <h1 className="text-xl text-gray-800 font-medium pagenameTitle">
                    {pagename}!
                </h1>
            </div>
        </div>
        </>
    );
}
