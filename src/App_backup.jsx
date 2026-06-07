import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'

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

function App() {
  const [user, setUser] = useState(null)

const [auth, setAuth] = useState({
  email: '',
  password: ''
})
 async function signIn() {
  const { data, error } = await supabase.auth.signInWithPassword({
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
  const { error } = await supabase.auth.signUp({
    email: auth.email,
    password: auth.password
  })

  if (error) {
    alert('Erro no cadastro')
    console.log(error)
  } else {
    alert('Conta criada! Agora faça login.')
  }
}
  const [orcamentos, setOrcamentos] = useState([])
const [idSelecionado, setIdSelecionado] = useState(null);
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
gitg  } else {
    alert('Excluído com sucesso')
    fetchOrcamentos()
  }
}

const editarOrcamento = async (item) => {

  const novaCidade = prompt(
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
    alert('Erro: ' + error.message)
  } else {
    alert('Atualizado com sucesso')
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

  const inputStyle = {
    padding: 15,
    borderRadius: 10,
    border: '1px solid #ccc',
    fontSize: 16,
    outline: 'none'
  }

  const servicoCard = {
    background: '#ffffff',
    padding: 20,
    borderRadius: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
  }

  const fotoStyle = {
    width: '100%',
    height: 260,
    objectFit: 'cover',
    borderRadius: 20,
    boxShadow: '0 5px 20px rgba(0,0,0,0.15)'
  }

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
    foto11
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
    <div
      style={{
        background: '#f5f9fc',
        fontFamily: 'Arial',
        minHeight: '100vh'
      }}
    >

      {/* HERO */}

      <section
  style={{
    backgroundImage:
      `linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${foto1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    textAlign: 'center',
    padding: '20px'
  }}
>
        <img
          src={logo}
          alt="Didi Piscinas"
          style={{
            width: 220,
            marginBottom: 20
          }}
        />

        <h1
  style={{
    fontSize: '4rem',
    marginBottom: 20
  }}
>
  Didi Piscinas
</h1>

        <h2
  style={{
    maxWidth: 900,
    lineHeight: 1.6,
    fontWeight: 'normal'
  }}
>
  Especialistas em Limpeza, Manutenção,
  Reformas, Aquecimento e Construção de Piscinas
  em Mairinque e Região.
</h2>

        <a
          href="https://wa.me/5511991922595"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-block',
            marginTop: 30,
            background: '#25D366',
            color: '#fff',
            padding: '15px 30px',
            borderRadius: 10,
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Solicitar Orçamento
        </a>
      </section>

      {/* SOBRE */}

      <section
        style={{
          maxWidth: 1200,
          margin: '60px auto',
          padding: 20,
          textAlign: 'center'
        }}
      >
        <h2
          style={{
            color: '#0077b6',
            marginBottom: 20
          }}
        >
          Sobre a Empresa
        </h2>

        <p
          style={{
            lineHeight: 1.8,
            color: '#555'
          }}
        >
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

<section
  style={{
    maxWidth: 1200,
    margin: '60px auto',
    padding: 20,
    textAlign: 'center'
  }}
>
  <h2
    style={{
      color: '#0077b6',
      marginBottom: 30
    }}
  >
    Área de Atendimento
  </h2>

  <div
    style={{
      display: 'grid',
      gridTemplateColumns:
        'repeat(auto-fit,minmax(180px,1fr))',
      gap: 20
    }}
  >
    <div style={servicoCard}>📍 Mairinque</div>
    <div style={servicoCard}>📍 São Roque</div>
    <div style={servicoCard}>📍 Alumínio</div>
    <div style={servicoCard}>📍 Ibiúna</div>
    <div style={servicoCard}>📍 Araçariguama</div>
    <div style={servicoCard}>📍 Sorocaba</div>
    <div style={servicoCard}>📍 Itu</div>
    <div style={servicoCard}>📍 Cotia</div>
  </div>
</section>
      <section
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 20
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#0077b6',
            marginBottom: 30
          }}
        >
          Nossos Serviços
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(220px,1fr))',
            gap: 20
          }}
        >
          <div style={servicoCard}>Instalação</div>
          <div style={servicoCard}>Manutenção</div>
          <div style={servicoCard}>Troca de Vinil</div>
          <div style={servicoCard}>Troca de Filtro</div>
          <div style={servicoCard}>Troca de Areia</div>
          <div style={servicoCard}>Construções</div>
          <div style={servicoCard}>Reformas</div>
          <div style={servicoCard}>Aquecimento</div>
          <div style={servicoCard}>Limpeza</div>
          <div style={servicoCard}>Caça Vazamentos</div>
        </div>
      </section>
      {/* DIFERENCIAIS */}
{/* DEPOIMENTOS */}

<section
  style={{
    background: '#f5f9fc',
    padding: '60px 20px'
  }}
>
  <h2
    style={{
      textAlign: 'center',
      color: '#0077b6',
      marginBottom: 40
    }}
  >
    O Que Nossos Clientes Dizem
  </h2>

  <div
    style={{
      maxWidth: 1200,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns:
        'repeat(auto-fit,minmax(300px,1fr))',
      gap: 20
    }}
  >
    <div style={servicoCard}>
      ⭐⭐⭐⭐⭐
      <br /><br />
      Excelente atendimento e serviço de qualidade.
      <br /><br />
      <strong>João - Mairinque</strong>
    </div>

    <div style={servicoCard}>
      ⭐⭐⭐⭐⭐
      <br /><br />
      Minha piscina ficou impecável.
      Recomendo a todos.
      <br /><br />
      <strong>Mariana - São Roque</strong>
    </div>

    <div style={servicoCard}>
      ⭐⭐⭐⭐⭐
      <br /><br />
      Equipe muito profissional e pontual.
      <br /><br />
      <strong>Carlos - Alumínio</strong>
    </div>
  </div>
</section>
      <section
        style={{
          background: '#0077b6',
          color: '#fff',
          padding: '60px 20px',
          marginTop: 60
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            marginBottom: 40
          }}
        >
          Nossos Diferenciais
        </h2>

        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(220px,1fr))',
            gap: 20
          }}
        >
          <div>✔ Atendimento Personalizado</div>
          <div>✔ Profissionais Capacitados</div>
          <div>✔ Qualidade Garantida</div>
          <div>✔ Equipamentos Modernos</div>
          <div>✔ Atendimento Rápido</div>
          <div>✔ Preço Justo</div>
        </div>
      </section>

      {/* ESTATÍSTICAS */}

      <section
        style={{
          maxWidth: 1200,
          margin: '60px auto',
          padding: 20
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
            gap: 30,
            textAlign: 'center'
          }}
        >
          <div>
            <h2
              style={{
                color: '#0077b6',
                fontSize: 45
              }}
            >
              500+
            </h2>
            <p>Clientes Atendidos</p>
          </div>

          <div>
            <h2
              style={{
                color: '#0077b6',
                fontSize: 45
              }}
            >
              1000+
            </h2>
            <p>Serviços Realizados</p>
          </div>

          <div>
            <h2
              style={{
                color: '#0077b6',
                fontSize: 45
              }}
            >
              3+
            </h2>
            <p>Anos de Experiência</p>
          </div>
        </div>
      </section>

      {/* FORMULÁRIO */}

      <section
        style={{
          maxWidth: 800,
          margin: '0 auto',
          padding: 20
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: 40,
            borderRadius: 20,
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              color: '#0077b6',
              marginBottom: 30
            }}
          >
            Solicite um Orçamento
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 15
            }}
          >
            <input
              name="nome"
              placeholder="Nome"
              value={form.nome}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="telefone"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="cidade"
              placeholder="Cidade"
              value={form.cidade}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              name="bairro"
              placeholder="Bairro"
              value={form.bairro}
              onChange={handleChange}
              style={inputStyle}
            />
              <input
  name="email"
  placeholder="E-mail"
  value={form.email}
  onChange={handleChange}
  style={inputStyle}
/>
<input
  name="endereco"
  placeholder="Endereço"
  value={form.endereco}
  onChange={handleChange}
  style={inputStyle}
/>
            <select
              name="tipo_servico"
              value={form.tipo_servico}
              onChange={handleChange}
              style={inputStyle}
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
              style={{
                ...inputStyle,
                height: 120,
                resize: 'none'
              }}
            />

            <input
              name="origem"
              placeholder="Como nos conheceu?"
              value={form.origem}
              onChange={handleChange}
              style={inputStyle}
            />

            <button
              type="submit"
              style={{
                background:
                  'linear-gradient(135deg,#0077b6,#00b4d8)',
                color: '#fff',
                border: 'none',
                padding: 15,
                borderRadius: 10,
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Enviar Orçamento
            </button>
          </form>
        </div>
      </section>

      {/* GALERIA */}

      <section
        style={{
          maxWidth: 1200,
          margin: '60px auto',
          padding: 20
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            color: '#0077b6',
            marginBottom: 30
          }}
        >
          Galeria de Serviços
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(250px,1fr))',
            gap: 20
          }}
        >
          {fotos.map((foto, index) => (
            <img
              key={index}
              src={foto}
              alt={`Piscina ${index + 1}`}
              style={fotoStyle}
            />
          ))}
        </div>
      </section>

      {/* RODAPÉ */}
       <section
  style={{
    maxWidth: 1000,
    margin: '60px auto',
    padding: 20
  }}
>
  <h2
    style={{
      color: '#0077b6',
      marginBottom: 20
    }}
  >
    Orçamentos Recebidos
  </h2>

  {orcamentos.map((item) => (
    <div
      key={item.id}
      style={{
        background: '#fff',
        padding: 20,
        marginBottom: 15,
        borderRadius: 10,
        boxShadow: '0 3px 10px rgba(0,0,0,.1)'
      }}
    >
      <p><strong>Nome:</strong> {item.nome}</p>
      <p><strong>Telefone:</strong> {item.telefone}</p>
      <p><strong>Cidade:</strong> {item.cidade}</p>
      <p><strong>Bairro:</strong> {item.bairro}</p>
      <p><strong>Serviço:</strong> {item.tipo_servico}</p>

      <div
  style={{
    marginTop: 10,
    display: 'flex',
    gap: 10
  }}
>
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
      <footer
        style={{
          background: '#0a2239',
          color: '#fff',
          textAlign: 'center',
          padding: 40,
          marginTop: 60
        }}
      >
        <h3>Didi Piscinas</h3>

        <p>
          Mairinque e Região
        </p>

        <p>
          Instalação • Manutenção • Reformas •
          Construção • Aquecimento
        </p>

        <p style={{ marginTop: 20 }}>
          © 2026 Todos os direitos reservados
        </p>
      </footer>

      {/* BOTÃO WHATSAPP */}

      <a
        href="https://wa.me/5511991922595"
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed',
          bottom: 25,
          right: 25,
          background: '#25D366',
          width: 70,
          height: 70,
          borderRadius: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 32,
          color: '#fff',
          textDecoration: 'none',
          boxShadow: '0 5px 15px rgba(0,0,0,.3)'
        }}
      >
        💬
      </a>
    </div>
  )
}

export default App