import accounting from 'accounting';
import storeGenerica from './store.js';
import * as load_xlnt from 'xlnt';
import exportToExcel from './excel-export';
import * as firebase from "firebase/app";
import 'firebase/auth';
import adicionarHandlersModal from './modal';

(async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCNfQ3EAgokc-_9m9xPLV7BoSpKyxkzY0Y",
    authDomain: "orcamento-pessoal-85a66.firebaseapp.com",
    databaseURL: "https://orcamento-pessoal-85a66.firebaseio.com",
    projectId: "orcamento-pessoal-85a66",
    storageBucket: "",
    messagingSenderId: "317049111773",
    appId: "1:317049111773:web:ca0c0ebfc4883d22"
  };

  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js');
    });
  }

  firebase.initializeApp(firebaseConfig);

  const modal = adicionarHandlersModal(
    document.getElementById('loginModal'),
    {
      bloquearModal: true
    }
  );
  

  const obterElementos = () => {
    const formReceita = document.getElementById('form-adicionar-receita');
    const formDespesa = document.getElementById('form-adicionar-despesa');
    const formLogin = document.getElementById('form-login');
    return {
      cabecalho: {
        saldo: document.getElementById('saldo'),
        principal: document.getElementById('progresso-principal'),
        categorias: document.getElementById('progresso-categoria'),
        visalGeral: document.getElementById('visao-geral'),
        acoes: {
          logout: document.getElementById('logout'),
        }
      },
      receita: {
        tabela: document.getElementById('tabela-receitas'),
        form: formReceita,
        campos: {
          descricao: formReceita.querySelector('[name=descricao]'),
          valor: formReceita.querySelector('[name=valor]'),
        }
      },
      despesa: {
        tabela: document.getElementById('tabela-despesas'),
        form: formDespesa,
        campos: {
          descricao: formDespesa.querySelector('[name=descricao]'),
          valor: formDespesa.querySelector('[name=valor]'),
          categoria: formDespesa.querySelector('[name=categoria]')
        }
      },
      login: {
        form: formLogin,
        campos: {
          email: formLogin.querySelector('[name=email]'),
          senha: formLogin.querySelector('[name=password]'),
        },
        acoes: {
          cadastrar: formLogin.querySelector('[name=cadastrar]'),
          login: formLogin.querySelector('[name=login]'),
        }
      }
    };
  }

  const despesasStore = new storeGenerica('despesas');
  const receitasStore = new storeGenerica('receitas');

  const elementos = obterElementos();

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      elementos.cabecalho.acoes.logout.style.display = 'block';
      modal.fecharModal();
      elementos.login.form.reset();
    } else {
      elementos.cabecalho.acoes.logout.style.display = 'none';
      modal.abrirModal();
    }
  });

  const categorias = [{
    identificador: 'lazer',
    descricao: 'Lazer',
    previsto: 320
  },
  {
    identificador: 'alimentacao',
    descricao: 'Alimentação',
    previsto: 800
  },
  {
    identificador: 'moradia',
    descricao: 'Moradia',
    previsto: 700
  },
  {
    identificador: 'transporte',
    descricao: 'Transporte',
    previsto: 500
  }
  ];
  const previstoDeReceita = 4000;

  const criarOpcaoCategoria = (categoria) => {
    const elemento = document.createElement('option');
    elemento.innerHTML = categoria.descricao;
    elemento.value = categoria.identificador;
    return elemento;
  }

  const carregarSelectDeCategorias = () => {
    categorias.forEach((categoria) => {
      elementos.despesa.form.categoria.appendChild(criarOpcaoCategoria(categoria));
    });
  }

  const agrupar = (items, propriedade) => {
    return items.reduce((acumulador, item) => {
      (acumulador[item[propriedade]] = acumulador[item[propriedade]] || []).push(item);
      return acumulador;
    }, {});
  }

  const padLeft = (numero, quantidade, caracter) => {
    return Array(quantidade - String(numero).length + 1).join(caracter || '0') + numero;
  }

  const formatarData = (data) => {
    let dataFormatada = data;
    if (typeof (data) == 'string') {
      dataFormatada = new Date(data);
    }

    return `${padLeft(dataFormatada.getDate(), 2)}/${padLeft(dataFormatada.getMonth(), 2)}`;
  }

  const renderizarReceita = (receita) => {
    return `<tr>
            <td class="coluna-descricao-transacao">
                ${receita.descricao}
                <p class="categoria-label">Receitas</p>
            </td>
            <td class="coluna-valor-transacao">${accounting.formatMoney(receita.valor, "R$ ", 2, '.', ',')}</td>
        </tr>`;
  }

  const ordenarPorDataMaisRecente = (a, b) => {
    if (new Date(b) < new Date(a)) {
      return -1;
    }
    if (new Date(b) > new Date(a)) {
      return 1;
    }
    return 0;
  }

  const obterCategoria = (identificador) => {
    return categorias.find(categoria => categoria.identificador == identificador);
  }

  const renderizarDespesa = (despesa) => {
    const descricaoCategoria = obterCategoria(despesa.categoria).descricao;
    return `<tr>
            <td class="coluna-descricao-transacao">
                ${despesa.descricao}
                <p class="categoria-label">${descricaoCategoria}</p>
            </td>
            <td class="coluna-valor-transacao">${accounting.formatMoney(despesa.valor, "R$ ", 2, '.', ',')}</td>
        </tr>`;
  }

  const renderizarDespesas = () => {
    const despesasAgrupadas = agrupar(despesas, 'data');
    elementos.despesa.tabela.innerHTML = '';
    Object.keys(despesasAgrupadas)
      .sort(ordenarPorDataMaisRecente)
      .forEach((grupo) => {
        elementos.despesa.tabela.innerHTML += `<tr>
                    <td class="coluna-data" colspan="2">${formatarData(grupo)}</td>                
                </tr>`;
        despesasAgrupadas[grupo].forEach((despesa) => {
          elementos.despesa.tabela.innerHTML += renderizarDespesa(despesa);
        });
      });
  }

  const renderizarReceitas = () => {
    const receitasAgrupadas = agrupar(receitas, 'data');
    elementos.receita.tabela.innerHTML = '';
    Object.keys(receitasAgrupadas)
      .sort(ordenarPorDataMaisRecente)
      .forEach((grupo) => {
        elementos.receita.tabela.innerHTML += `<tr>
                    <td class="coluna-data" colspan="2">${formatarData(grupo)}</td>                
                </tr>`;
        receitasAgrupadas[grupo].forEach((receita) => {
          elementos.receita.tabela.innerHTML += renderizarReceita(receita);
        });
      });
  }

  const calcularTotais = () => {
    const totaisDespesas = despesas.reduce((acumulador, despesaAtual) => {
      if (!acumulador.hasOwnProperty(despesaAtual.categoria)) {
        acumulador[despesaAtual.categoria] = 0;
      }

      acumulador[despesaAtual.categoria] += Number.parseFloat(despesaAtual.valor);
      acumulador.despesas += Number.parseFloat(despesaAtual.valor);
      return acumulador;
    }, { despesas: 0 });

    const totalReceita = receitas.reduce((acumulador, receita) => {
      acumulador += Number.parseFloat(receita.valor);
      return acumulador;
    }, 0);

    return {
      ...totaisDespesas,
      receitas: totalReceita,
      total: totalReceita - totaisDespesas.despesas
    };
  }

  const renderizarProgressoCategoria = (categoria, totais) => {
    let totalCategoria = 0;
    if (totais.hasOwnProperty(categoria.identificador)) {
      totalCategoria = totais[categoria.identificador];
    }

    return `<div>
            <h5><span class="ofuscado">${categoria.descricao} ${accounting.formatMoney(totalCategoria, 'R$ ', 2, '.', ',')}</h5>
            <progress value="${totalCategoria}" max="${categoria.previsto}"></progress>
        </div>`;
  }

  const renderizarColunaPrincipal = (totais) => {
    const previstoDespesas = categorias.reduce((acumulador, categoria) => {
      acumulador += categoria.previsto;
      return acumulador;
    }, 0)

    elementos.cabecalho.principal.innerHTML = '';

    elementos.cabecalho.principal.innerHTML += renderizarProgressoCategoria({
      descricao: 'Receitas',
      identificador: 'receitas',
      previsto: previstoDeReceita
    }, totais);

    elementos.cabecalho.principal.innerHTML += renderizarProgressoCategoria({
      descricao: 'Despesas',
      identificador: 'despesas',
      previsto: previstoDespesas
    }, totais);
  }

  const renderizarColunaCategorias = (totais) => {
    elementos.cabecalho.categorias.innerHTML = '';
    categorias.forEach((categoria) => {
      elementos.cabecalho.categorias.innerHTML += renderizarProgressoCategoria(categoria, totais);
    })
  }

  const renderizarItemVisaoGeral = (item) => {
    return `<div class="visao-geral-container">
            <h5><span class="ofuscado">${item.descricao}</h5>
            <span class="texto-grande">${accounting.formatMoney(item.valor, 'R$ ', 2, '.', ',')}</span>
        </div>`
  }

  const renderizarVisaoGeral = ({ receitas: totalReceitas, despesas: totalDespesas, total }) => {
    elementos.cabecalho.visalGeral.innerHTML = '';

    elementos.cabecalho.visalGeral.innerHTML += renderizarItemVisaoGeral({
      descricao: 'Receitas',
      valor: totalReceitas
    });

    elementos.cabecalho.visalGeral.innerHTML += renderizarItemVisaoGeral({
      descricao: 'Despesas',
      valor: totalDespesas
    });

    elementos.cabecalho.visalGeral.innerHTML += renderizarItemVisaoGeral({
      descricao: 'Economia',
      valor: total
    });

    const container = document.createElement('div');
    container.classList.add('visao-geral-container');

    const botaoExportar = document.createElement('button');
    botaoExportar.innerHTML = '<i class="far fa-file-excel"></i> Exportar';
    botaoExportar.classList.add('btn');
    botaoExportar.classList.add('botao-branco');
    botaoExportar.onclick = () => {
      load_xlnt().then((xlnt) => {
        exportToExcel(xlnt, despesas, receitas);
      });
    }
    container.append(botaoExportar);

    elementos.cabecalho.visalGeral.append(container);
  }

  const renderizarCabecalho = () => {
    const totais = calcularTotais();

    renderizarColunaPrincipal(totais);

    renderizarColunaCategorias(totais);

    renderizarVisaoGeral(totais);

    const { total } = totais;
    elementos.cabecalho.saldo.innerHTML = accounting.formatMoney(total, 'R$ ', 2, '.', ',');
  }

  let receitas = [];
  const receitasPromise = receitasStore.listar();
  receitasPromise.then((receitasArmazenadas) => {
    receitas = receitasArmazenadas;
    renderizarReceitas();
  })

  let despesas = [];
  const despesasPromise = despesasStore.listar();
  despesasPromise.then((despesasArmazenadas) => {
    despesas = despesasArmazenadas;
    renderizarDespesas();
  })

  await Promise.all([
    receitasPromise,
    despesasPromise
  ]);
  renderizarCabecalho();
  carregarSelectDeCategorias();

  elementos.receita.form.onsubmit = async (event) => {
    event.preventDefault();

    const receita = {
      data: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
    };

    Object.keys(elementos.receita.campos).forEach((campo) => {
      const { value } = elementos.receita.campos[campo];
      receita[campo] = value;
    });

    receitas.push(receita);
    try {
      await receitasStore.salvar(receitas);
      elementos.receita.form.reset();
      renderizarReceitas();
      renderizarCabecalho();
      alert('Receita salva com sucesso');
    } catch {
      alert('Ocorreu um erro ao salvar a receita');
    }
  }

  elementos.despesa.form.onsubmit = async (event) => {
    event.preventDefault();

    const despesa = {
      data: new Date(new Date().setHours(0, 0, 0, 0)).toISOString()
    };

    Object.keys(elementos.despesa.campos).forEach((campo) => {
      const { value } = elementos.despesa.campos[campo];
      despesa[campo] = value;
    });

    despesas.push(despesa);
    try {
      await despesasStore.salvar(despesas);
      elementos.despesa.form.reset();
      renderizarDespesas();
      renderizarCabecalho();

      alert('Despesa salva com sucesso');
    } catch {
      alert('Ocorreu um erro ao salvar a despesa');
    }
  }

  elementos.login.acoes.cadastrar.onclick = async (event) => {
    const email = elementos.login.campos.email.value;
    const senha = elementos.login.campos.senha.value;
    firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then((response) => {
        alert('Usuário cadastrado com sucesso');
      }).catch((error) => {
        console.log(error);
      });
  }

  elementos.login.acoes.login.onclick = async (event) => {
    const email = elementos.login.campos.email.value;
    const senha = elementos.login.campos.senha.value;
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .catch((error) => {
        if (error.code == 'auth/wrong-password' || error.code == 'auth/user-not-found') {
          alert('E-mail ou senha inválidos');
          return;
        }
        alert('Não foi possível efetuar login');
      });
  }

  elementos.cabecalho.acoes.logout.onclick = async (event) => {
    firebase.auth().signOut().catch((error) => {
      console.log(error);
    });
  }
})();