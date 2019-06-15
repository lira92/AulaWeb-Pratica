(function main() {
    var obterElementos = function() {
        var formReceita = document.getElementById('form-adicionar-receita');
        var formDespesa = document.getElementById('form-adicionar-despesa');
        return {
            cabecalho: {
                saldo: document.getElementById('saldo'),
                principal: document.getElementById('progresso-principal'),
                categorias: document.getElementById('progresso-categoria'),
                visalGeral: document.getElementById('visao-geral')
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
            }
        };
    }

    var storeGenerica = function (chave) {
        return {
            listar: function() {
                var itens = localStorage.getItem(chave);

                if (!itens) {
                    return [];
                }

                return JSON.parse(itens);
            },
            salvar: function(items) {
                localStorage.setItem(chave, JSON.stringify(items));
            }
        };
    }

    var despesasStore = storeGenerica('despesas-'+0619);
    var receitasStore = storeGenerica('receitas');

    var elementos = obterElementos();
    console.log(elementos);

    var categorias = [
        {
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
    var previstoDeReceita = 4000;

    var criarOpcaoCategoria = function(categoria) {
        var elemento = document.createElement('option');
        elemento.innerHTML = categoria.descricao;
        elemento.value = categoria.identificador;
        return elemento;
    }

    var carregarSelectDeCategorias = function() {
        categorias.forEach(function(categoria) {
            elementos.despesa.form.categoria.appendChild(criarOpcaoCategoria(categoria));
        });
    }

    var agrupar = function(items, propriedade) {
        return items.reduce(function(acumulador, item) {
            (acumulador[item[propriedade]] = acumulador[item[propriedade]] || []).push(item);
            return acumulador;
        }, {});
    }

    var padLeft = function(numero, quantidade, caracter) {
        return Array(quantidade-String(numero).length+1).join(caracter||'0')+numero;
    }

    var formatarData = function(data) {
        var dataFormatada = data;
        if (typeof(data) == 'string') {
            dataFormatada = new Date(data);
        }

        return `${padLeft(dataFormatada.getDate(), 2)}/${padLeft(dataFormatada.getMonth(), 2)}`;
    }

    var renderizarReceita = function(receita) {
        return `<tr>
            <td class="coluna-descricao-transacao">
                ${receita.descricao}
                <p class="categoria-label">Receitas</p>
            </td>
            <td class="coluna-valor-transacao">${accounting.formatMoney(receita.valor, "R$ ", 2, '.', ',')}</td>
        </tr>`;
    }

    var ordenarPorDataMaisRecente = function(a, b) {
        if (new Date(b) < new Date(a)) {
            return -1;
        }
        if (new Date(b) > new Date(a)) {
            return 1;
        }
        return 0;
    }

    var obterCategoria = function(identificador) {
        return categorias.find(function(categoria) {
            return categoria.identificador == identificador;
        });
    }

    var renderizarDespesa = function(despesa) {
        var descricaoCategoria = obterCategoria(despesa.categoria).descricao;
        return `<tr>
            <td class="coluna-descricao-transacao">
                ${despesa.descricao}
                <p class="categoria-label">${descricaoCategoria}</p>
            </td>
            <td class="coluna-valor-transacao">${accounting.formatMoney(despesa.valor, "R$ ", 2, '.', ',')}</td>
        </tr>`;
    }

    var renderizarDespesas = function() {
        var despesasAgrupadas = agrupar(despesas, 'data');
        elementos.despesa.tabela.innerHTML = '';
        Object.keys(despesasAgrupadas)
            .sort(ordenarPorDataMaisRecente)
            .forEach(function(grupo) {
                elementos.despesa.tabela.innerHTML += `<tr>
                    <td class="coluna-data" colspan="2">${formatarData(grupo)}</td>                
                </tr>`;
                despesasAgrupadas[grupo].forEach(function(despesa) {
                    elementos.despesa.tabela.innerHTML += renderizarDespesa(despesa);
                });
            });
    }

    var renderizarReceitas = function() {
        var receitasAgrupadas = agrupar(receitas, 'data');
        elementos.receita.tabela.innerHTML = '';
        Object.keys(receitasAgrupadas)
            .sort(ordenarPorDataMaisRecente)
            .forEach(function(grupo) {
                elementos.receita.tabela.innerHTML += `<tr>
                    <td class="coluna-data" colspan="2">${formatarData(grupo)}</td>                
                </tr>`;
                receitasAgrupadas[grupo].forEach(function(receita) {
                    elementos.receita.tabela.innerHTML += renderizarReceita(receita);
                });
            });
    }

    var calcularTotais = function() {
        var totaisDespesas = despesas.reduce(function(acumulador, despesaAtual) {
            if (!acumulador.hasOwnProperty(despesaAtual.categoria)) {
                acumulador[despesaAtual.categoria] = 0;
            }

            acumulador[despesaAtual.categoria] += Number.parseFloat(despesaAtual.valor);
            acumulador.despesas += Number.parseFloat(despesaAtual.valor);
            return acumulador;
        }, { despesas: 0 });

        var totalReceita = receitas.reduce(function(acumulador, receita) {
            acumulador += Number.parseFloat(receita.valor);
            return acumulador;
        }, 0);

        return Object.assign({
            receitas: totalReceita,
            total: totalReceita - totaisDespesas.despesas
        }, totaisDespesas);
    }
    
    var renderizarProgressoCategoria = function(categoria, totais) {
        var totalCategoria = 0;
        if (totais.hasOwnProperty(categoria.identificador)) {
            totalCategoria = totais[categoria.identificador];
        }

        return `<div>
            <h5><span class="ofuscado">${categoria.descricao} ${accounting.formatMoney(totalCategoria, 'R$ ', 2, '.', ',')}</h5>
            <progress value="${totalCategoria}" max="${categoria.previsto}"></progress>
        </div>`;
    }

    var renderizarColunaPrincipal = function(totais) {
        var previstoDespesas = categorias.reduce(function(acumulador, categoria) {
            acumulador += categoria.previsto;
            return acumulador;
        })

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
    
    var renderizarColunaCategorias = function(totais) {
        elementos.cabecalho.categorias.innerHTML = '';
        categorias.forEach(function(categoria) {
            elementos.cabecalho.categorias.innerHTML += renderizarProgressoCategoria(categoria, totais);
        })
    }

    var renderizarItemVisaoGeral = function(item) {
        return `<div class="visao-geral-container">
            <h5><span class="ofuscado">${item.descricao}</h5>
            <span class="texto-grande">${accounting.formatMoney(item.valor, 'R$ ', 2, '.', ',')}</span>
        </div>`
    }

    var renderizarVisaoGeral = function(totais) {
        elementos.cabecalho.visalGeral.innerHTML = '';

        elementos.cabecalho.visalGeral.innerHTML += renderizarItemVisaoGeral({
            descricao: 'Receitas',
            valor: totais.receitas
        });

        elementos.cabecalho.visalGeral.innerHTML += renderizarItemVisaoGeral({
            descricao: 'Despesas',
            valor: totais.despesas
        });

        elementos.cabecalho.visalGeral.innerHTML += renderizarItemVisaoGeral({
            descricao: 'Economia',
            valor: totais.total
        });
    }

    var renderizarCabecalho = function() {
        var totais = calcularTotais();

        renderizarColunaPrincipal(totais);
        
        renderizarColunaCategorias(totais);

        renderizarVisaoGeral(totais);

        elementos.cabecalho.saldo.innetHTML = accounting.formatMoney(totais.total, 'R$ ', 2, '.', ',');
    }

    var receitas = receitasStore.listar();
    renderizarReceitas();
    var despesas = despesasStore.listar();
    renderizarDespesas();
    renderizarCabecalho();
    carregarSelectDeCategorias();

    elementos.receita.form.onsubmit = function(event) {
        event.preventDefault();

        var receita = {
            data: new Date(new Date().setHours(0,0,0,0)).toISOString()
        };

        Object.keys(elementos.receita.campos).forEach(function(campo) {
            receita[campo] = elementos.receita.campos[campo].value;
        });

        receitas.push(receita);
        receitasStore.salvar(receitas);
        elementos.receita.form.reset();
        renderizarReceitas();
        renderizarCabecalho();

        alert('Receita salva com sucesso');
    }

    elementos.despesa.form.onsubmit = function(event) {
        event.preventDefault();

        var despesa = {
            data: new Date(new Date().setHours(0,0,0,0)).toISOString()
        };

        Object.keys(elementos.despesa.campos).forEach(function(campo) {
            despesa[campo] = elementos.despesa.campos[campo].value;
        });

        despesas.push(despesa);
        despesasStore.salvar(despesas);
        elementos.despesa.form.reset();
        renderizarDespesas();
        renderizarCabecalho();

        alert('Despesa salva com sucesso');
    }
})();