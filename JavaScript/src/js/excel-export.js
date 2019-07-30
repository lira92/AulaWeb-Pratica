export default function exportToExcel(xlnt, despesas, receitas) {
  const book = new xlnt.workbook();
  const sheet = book.active_sheet();

  sheet.merge_cells("A1:H1");
  sheet.using_cell("A1", c => c.set_value("Orçamento Mensal"));

  sheet.merge_cells("A2:D2");
  sheet.using_cell("A2", c => c.set_value("Despesas"));
  sheet.using_cell("A3", c => c.set_value("Data"));
  sheet.using_cell("B3", c => c.set_value("Descrição"));
  sheet.using_cell("C3", c => c.set_value("Categoria"));
  sheet.using_cell("D3", c => c.set_value("Valor"));

  sheet.merge_cells("F2:H2");
  sheet.using_cell("F2", c => c.set_value("Receitas"));
  sheet.using_cell("F3", c => c.set_value("Data"));
  sheet.using_cell("G3", c => c.set_value("Descrição"));
  sheet.using_cell("H3", c => c.set_value("Valor"));

  let linha = 4;
  despesas.forEach(despesa => {
    sheet.using_cell(1, linha, c => c.set_value(despesa.data));
    sheet.using_cell(2, linha, c => c.set_value(despesa.descricao));
    sheet.using_cell(3, linha, c => c.set_value(despesa.categoria));
    sheet.using_cell(4, linha, c => c.set_value(parseFloat(despesa.valor)));
    linha++;
  });

  const linhaTotais = linha + 1;
  sheet.merge_cells(`A${linhaTotais}:C${linhaTotais}`);
  sheet.using_cell(`A${linhaTotais}`, c => c.set_value("Total de despesas"));
  sheet.using_cell(`D${linhaTotais}`, c => c.set_formula(`=SUM(D4:D${linha})`));

  linha = 4;
  receitas.forEach(receita => {
    sheet.using_cell(6, linha, c => c.set_value(receita.data));
    sheet.using_cell(7, linha, c => c.set_value(receita.descricao));
    sheet.using_cell(8, linha, c => c.set_value(parseFloat(receita.valor)));
    linha++;
  });

  sheet.merge_cells(`F${linhaTotais}:G${linhaTotais}`);
  sheet.using_cell(`F${linhaTotais}`, c => c.set_value("Total de despesas"));
  sheet.using_cell(`H${linhaTotais}`, c => c.set_formula(`=SUM(H4:H${linha})`));

  book.download("orcamento_mensal.xlsx");

  sheet.delete();
  book.delete();
}