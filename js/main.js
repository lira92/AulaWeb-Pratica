(function main() {
    var obterElementos = function() {
        var formReceita = document.getElementById('form-adicionar-receita');
        var formDespesa = document.getElementById('form-adicionar-despesa');
        return {
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

    var despesasStore = storeGenerica('despesas');
    var receitasStore = storeGenerica('receitas');

    var elementos = obterElementos();

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

    var renderizarDespesas = function() {

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

    var receitas = receitasStore.listar();
    renderizarReceitas();
    var despesas = despesasStore.listar();
    renderizarDespesas();

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

        alert('Despesa salva com sucesso');
    }
})();