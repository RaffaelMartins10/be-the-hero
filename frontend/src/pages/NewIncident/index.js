import React , {useState} from 'react';
import {Link , useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [value,setValue] = useState('');
    const ongId = localStorage.getItem('ongId');

    const history = useHistory();

    async function handleNewIcident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        
        try {
            await api.post('incidents',data,{
                headers :{
                    authorization: ongId,
                }
            });
            
            alert('Cadastrado com Sucesso...');
            history.push('/profile');
        } catch (error) {
            alert("Erro no cadastro tente novamente");
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        voltar para HOME
                    </Link>
                </section>
                <form onSubmit={handleNewIcident}>
                    <input 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Título do caso"
                    /> 
                    <textarea 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição"
                    /> 
                    <input 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em reais"
                    /> 
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );

}