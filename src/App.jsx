import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import { FaWhatsapp } from 'react-icons/fa'

import logo from "./assets/logo.png"

import foto1 from "./foto1.jpeg"
import foto2 from "./foto2.jpeg"
import foto3 from "./foto3.jpeg"
import foto4 from "./foto4.jpeg"
import foto5 from "./foto5.jpeg"
import foto6 from "./foto6.jpeg"
import foto7 from "./foto7.jpeg"
import foto8 from "./foto8.jpeg"
import foto9 from "./foto9.jpeg"
import foto10 from "./foto10.jpeg"
import foto11 from "./foto11.jpeg"
import foto12 from "./foto12.jpeg"


function App() {

  const [user, setUser] = useState(null)

  const [auth, setAuth] = useState({
    email: '',
    password: ''
  })

  const [orcamentos, setOrcamentos] = useState([])

  const [idSelecionado, setIdSelecionado] = useState(null)

  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    cidade: '',
    bairro: '',
    tipo_servico: '',
    mensagem: '',
    origem: ''
  })

  async function signIn() {

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: auth.email,
        password: auth.password
      })

    if (error) {
      alert('Erro no login')
      console.log(error)
    } else {
      setUser(data.user)
    }
  }

  async function signUp() {

    const { error } =
      await supabase.auth.signUp({
        email: auth.email,
        password: auth.password
      })

    if (error) {
      alert('Erro no cadastro')
      console.log(error)
    } else {
      alert('Usuário criado com sucesso!')
    }
  }

  async function fetchOrcamentos() {

    const { data, error } = await supabase
      .from('orcamentos')
      .select('*')

    if (error) {
      console.log(error)
    } else {
      setOrcamentos(data)
    }
  }

const deletarOrcamento = async (id) => {

  const confirmar = confirm(
    'Deseja realmente excluir este orçamento?'
  )

  if (!confirmar) return

  const { error } = await supabase
    .from('orcamentos')
    .delete()
    .eq('id', id)

  if (error) {
    alert('Erro: ' + error.message)
 } else {
    alert('Excluído com sucesso')
    fetchOrcamentos()
  }
}
const editarOrcamento = async (item) => {

  const novaCidade = window.prompt(
    'Digite a nova cidade:',
    item.cidade
  )

  if (!novaCidade) return

  const { error } = await supabase
    .from('orcamentos')
    .update({
      cidade: novaCidade
    })
    .eq('id', item.id)

  if (error) {
    alert(error.message)
  } else {
    alert('Atualizado com sucesso!')
    fetchOrcamentos()
  }
}



  function handleChange(e) {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  async function handleSubmit(e) {
  e.preventDefault()

  const { error } = await supabase
    .from('orcamentos')
    .insert([form])

  if (error) {
    console.log(error)
    alert('Erro ao enviar orçamento')
  } else {
    alert('Orçamento enviado com sucesso!')
    fetchOrcamentos()

    setForm({
      nome: '',
      telefone: '',
      email: '',
      endereco: '',
      cidade: '',
      bairro: '',
      tipo_servico: '',
      mensagem: '',
      origem: ''
    })
  }
}

const cardClass =
  "bg-white p-5 rounded-xl text-center font-bold shadow-md"

const inputClass =
  "w-full p-4 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-sky-500"

const fotoClass =
  "w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition"
  
  const fotos = [
    foto1,
    foto2,
    foto3,
    foto4,
    foto5,
    foto6,
    foto7,
    foto8,
    foto9,
    foto10,
    foto11,
    foto12,
  ]
  if (!user) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
          Login Didi Piscinas
        </h2>

        <input
          type="email"
          placeholder="E-mail"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) =>
            setAuth({ ...auth, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Senha"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={(e) =>
            setAuth({ ...auth, password: e.target.value })
          }
        />

        <button
          onClick={signIn}
          className="w-full bg-blue-600 text-white p-3 rounded-lg mb-3 hover:bg-blue-700"
        >
          Entrar
        </button>

        <button
          onClick={signUp}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          Criar Conta
        </button>

      </div>
    </div>
  )
}
  return (
  <div className="min-h-screen bg-slate-50">
     {/* HERO */}

<section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white px-6 overflow-hidden">

  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{
      backgroundImage: `url(${foto1})`
    }}
  ></div>

  <div className="absolute inset-0 bg-black/60"></div>

  <div className="relative z-10 flex flex-col items-center">

    <img
      src={logo}
      alt="Didi Piscinas"
      className="w-48 md:w-60 mb-6"
    />

    <h1 className="text-5xl md:text-7xl font-bold mb-6">
      Didi Piscinas
    </h1>

    <h2 className="max-w-4xl text-lg md:text-2xl leading-relaxed">
      Especialistas em Limpeza, Manutenção,
      Reformas, Aquecimento e Construção de Piscinas
      em Mairinque e Região.
    </h2>

    <a
      href="https://wa.me/5511991922595"
      target="_blank"
      rel="noreferrer"
      className="mt-8 bg-sky-600 hover:bg-sky-700 px-8 py-4 rounded-xl font-bold transition duration-300"
    >
      Fale Conosco
    </a>

  </div>

</section>
      {/* SOBRE */}

     <section className="max-w-6xl mx-auto my-16 px-5 text-center">
      
        <h2 className="text-sky-700 mb-5 text-3xl font-bold">
        
          Sobre a Empresa
        </h2>

        <p className="leading-8 text-gray-600">
      
          A Didi Piscinas atua há mais de 3 anos oferecendo
          serviços especializados para residências,
          condomínios e áreas de lazer.

          Trabalhamos com equipamentos de qualidade,
          profissionais capacitados e atendimento
          personalizado para garantir segurança,
          conforto e satisfação aos nossos clientes.
        </p>
      </section>

      {/* SERVIÇOS */}
{/* ÁREA DE ATENDIMENTO */}

<section className="max-w-6xl mx-auto my-16 px-5 text-center">

    <h2 className="text-center text-sky-700 text-3xl font-bold mb-8">
    Área de Atendimento
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

   <div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  📍 Alphaville
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  📍 Alumínio
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  📍 Araçariguama
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  📍 Cabreúva
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  📍 Cotia
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  📍 Ibiúna
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  📍 Itu
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  📍 Itupeva
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  📍 Mairinque
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  📍 São Roque
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  📍 Sorocaba
</div>
   
  </div>
</section>
      <section className="max-w-6xl mx-auto px-5">
       <h2 className="text-sky-700 text-3xl font-bold mb-8">
      
          Nossos Serviços
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
         <div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  Aquecimento
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  Caça Vazamentos
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  Construções
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  Instalação
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  Limpeza
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  Manutenção
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  Reformas
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  Troca de Areia
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  Troca de Filtro
</div>

<div className="bg-white p-5 rounded-xl shadow-md font-bold text-center hover:shadow-lg transition">
  Troca de Vinil
</div>
         
        </div>
      </section>
      {/* DIFERENCIAIS */}
{/* DEPOIMENTOS */}

<section className="bg-sky-700 text-white py-16 px-5 mt-16">
  <h2 className="text-center text-white text-3xl font-bold mb-10">
    O Que Nossos Clientes Dizem
  </h2>

 <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">

   <div className="bg-white text-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
  ⭐⭐⭐⭐⭐
  <br /><br />
  Excelente atendimento e serviço de qualidade.
  <br /><br />
  <strong>João - Mairinque</strong>
</div>

<div className="bg-white text-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
  ⭐⭐⭐⭐⭐
  <br /><br />
  Minha piscina ficou impecável.
  Recomendo a todos.
  <br /><br />
  <strong>Mariana - São Roque</strong>
</div>

<div className="bg-white text-gray-800 p-6 rounded-xl shadow-md text-center hover:shadow-lg transition">
  ⭐⭐⭐⭐⭐
  <br /><br />
  Equipe muito profissional e pontual.
  <br /><br />
  <strong>Carlos - Alumínio</strong>
</div>
  </div>
</section>
      <section className="bg-sky-700 text-white py-16 px-5 mt-16">
       <h2 className="text-center text-3xl font-bold mb-10">
          Nossos Diferenciais
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
          <div>✔ Atendimento Personalizado</div>
          <div>✔ Compromisso com Prazos</div>
          <div>✔ Equipamentos Modernos</div>
          <div>✔ Garantia nos Serviços</div>
          <div>✔ Preço Justo</div>
          <div>✔ Profissionais Capacitados</div>
          <div>✔ Qualidade Garantida</div>
          <div>✔ Transparência e Confiança</div>
        </div>
      </section>

      {/* ESTATÍSTICAS */}

  
        <section className="max-w-6xl mx-auto my-16 px-5">
      
        <div className="flex flex-wrap justify-around gap-8 text-center">
          <div>
           <h2 className="text-sky-700 text-5xl font-bold">
              500+
            </h2>
            <p>Clientes Atendidos</p>
          </div>

          <div>
           <h2 className="text-sky-700 text-5xl font-bold">
              1000+
            </h2>
            <p>Serviços Realizados</p>
          </div>

          <div>
            <h2 className="text-sky-700 text-5xl font-bold">
              3+
            </h2>
            <p>Anos de Experiência</p>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}

     <section className="max-w-3xl mx-auto px-5">
    
        <div className="bg-white p-10 rounded-2xl shadow-xl">
          <h2 className="text-center text-sky-700 text-3xl font-bold mb-8">
            Solicite um Orçamento
          </h2>

         <form
  onSubmit={handleSubmit}
  className="flex flex-col gap-4"
>
          
            <input
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              name="cidade"
              placeholder="Cidade"
              value={form.cidade}
              onChange={handleChange}
              className={inputClass}
            />

            <input
              name="bairro"
              placeholder="Bairro"
              value={form.bairro}
              onChange={handleChange}
              className={inputClass}
            />
              <input
            name="email"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            />
             <input
             name="endereco"
            placeholder="Endereço"
            value={form.endereco}
            onChange={handleChange}
            className={inputClass}
            />
            <select
              name="tipo_servico"
              value={form.tipo_servico}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">
                Selecione o Serviço
              </option>

              <option>Instalação</option>
              <option>Manutenção</option>
              <option>Troca de Vinil</option>
              <option>Troca de Filtro</option>
              <option>Troca de Areia</option>
              <option>Construção</option>
              <option>Reforma</option>
              <option>Aquecimento</option>
              <option>Limpeza</option>
              <option>Caça Vazamentos</option>
            </select>

             <textarea
             name="mensagem"
             placeholder="Mensagem"
             value={form.mensagem}
             onChange={handleChange}
             className="w-full border border-gray-300 rounded-lg p-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-sky-500"
             />

            <input
              name="origem"
              placeholder="Como nos conheceu?"
              value={form.origem}
              onChange={handleChange}
              className={inputClass}
            />

           <button
           type="submit"
           className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition"
          >
          Enviar Orçamento
        </button>
          </form>
        </div>
      </section>

      {/* GALERIA */}

      <section className="max-w-6xl mx-auto my-16 px-5">
        <h2 className="text-center text-sky-700 text-3xl font-bold mb-8">
          Galeria de Serviços
        </h2>

    
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {fotos.map((foto, index) => (
           <img
          key={index}
          src={foto}
          alt={`Piscina ${index + 1}`}
          className="w-full h-64 object-cover rounded-2xl shadow-lg hover:scale-105 transition"
/>
          ))}
        </div>
      </section>

      {/* RODAPÉ */}
       
 <section className="max-w-6xl mx-auto my-16 px-5">
  
   <h2 className="text-sky-700 text-3xl font-bold mb-5">
    Orçamentos Recebidos
  </h2>

  {orcamentos.map((item) => (
    <div
  key={item.id}
  className="bg-white p-5 mb-4 rounded-xl shadow-md"
>
      <p><strong>Nome:</strong> {item.nome}</p>
      <p><strong>Telefone:</strong> {item.telefone}</p>
      <p><strong>Cidade:</strong> {item.cidade}</p>
      <p><strong>Bairro:</strong> {item.bairro}</p>
      <p><strong>Serviço:</strong> {item.tipo_servico}</p>

  
  <div className="flex gap-3 mt-3">
  <button
  onClick={() => editarOrcamento(item)}
  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
>
  Editar
</button>

<button
  onClick={() => deletarOrcamento(item.id)}
  className="bg-sky-700 text-white px-4 py-2 rounded-lg hover:bg-sky-800"
>
  Excluir
</button>
</div>
    </div>
  ))}
</section>
      <footer className="bg-slate-900 text-white text-center py-10 mt-16">
        <h3>Didi Piscinas</h3>

        <p>
          Mairinque e Região
        </p>

        <p>
          Instalação • Manutenção • Reformas •
          Construção • Aquecimento
        </p>

        <p className="mt-5">
          © 2026 Todos os direitos reservados
        </p>
      </footer>

      {/* BOTÃO WHATSAPP */}

      <a
  href="https://wa.me/5511991922595"
  target="_blank"
  rel="noreferrer"
  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 w-16 h-16 rounded-full flex items-center justify-center text-white text-4xl shadow-xl transition"
>
  <FaWhatsapp />
</a>
    </div>
  )
}

export default App