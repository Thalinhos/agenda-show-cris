import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {

    const navigate = useNavigate()

    useEffect(()=> {
        const verifyToken = async () => {
            try {
                const token = localStorage.getItem('token');
            
                if(!token){ navigate('/login'); }

                const response = await fetch('http://localhost:3000/verify', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}`
                    }
                  });
                
                if(!response.ok){ navigate('/login'); }

                const data = await response.json();

                if(data.errorMessage){ navigate('/login'); }

                if(data.message){ alert("Sucesso ao efetuar login, meu chapa", data.message); } // EXCLUIR DEPOIS
            } 
            catch (error) { navigate('/login'); }
        }
        verifyToken()
    }, [])

    return (
        <>
            <h1>Admin</h1>
        </>
    )
}