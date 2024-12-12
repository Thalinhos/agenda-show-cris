export function Header({ pagename }) { 
    return (
        <> 
            <style>
                {`
                    @media (max-width: 768px) {
                        .agendaTitle {
                            display: none;
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
                            margin-bottom: 2em;
                        }
                    }
                `}
            </style>

        <div>
            <header className="bg-white text-gray-900 text-center p-2">
                <div className="flex ml-6 mb-2">
                    <div className="w-full flex justify-between">
                    </div>
                    <div className="text-blue-500 mr-8 transition-colors duration-300 hover:scale-110 hover:underline">
                        <div className="h-6"></div>
                    </div>    
                </div>
                <hr className="w-full border-t-2" />
                <div className="flex justify-between items-center ml-8 mr-8 mt-2">
                    <img src="./foto_perfil.jpg" alt="Logo" className="w-12 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"/>
                    <h1 className="mt-2 text-3xl font-semibold text-gray-800 mb-1 agendaTitle">Minha Agenda</h1>
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
            <div className="flex items-center justify-center mt-12">
                <h1 className="text-xl text-gray-800 font-medium pagenameTitle">
                    {pagename}!
                </h1>
            </div>
        </div>
        </>
    );
}
