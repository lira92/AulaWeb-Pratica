(function main() {
    var obterElementos = function() {
        var formReceita = document.getElementById('form-adicionar-receita');
        var formDespesa = document.getElementById('form-adicionar-despesa');
        return {
            receita: {
                form: formReceita,
                campos: {
                    descricao: formReceita.querySelector('[name=descricao]'),
                    valor: formReceita.querySelector('[name=valor]'),
                }
            },
            despesa: {
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

    var receitas = despesasStore.listar();
    console.log(receitas);
    var despesas = receitasStore.listar();
    console.log(despesas);

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