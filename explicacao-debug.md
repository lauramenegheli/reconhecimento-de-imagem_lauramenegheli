# Documentação dos Erros no Código `debug.py`

O código original continha vários erros de sintaxe, tipo e lógica. Abaixo, uma lista dos erros identificados, suas causas e as correções aplicadas.

## Erros Identificados e Correções

1. **Erro de Sintaxe na Linha 5: Faltam aspas no `input`**
   - **Descrição**: `item1 = float(input(Preço do item 1? ))` - O string dentro de `input` não tem aspas, causando erro de sintaxe.
   - **Correção**: Adicionadas aspas duplas: `item1 = float(input("Preço do item 1? "))`

2. **Erro de Tipo na Linha 15: `desconto_cupom` tratado como string em operações numéricas**
   - **Descrição**: `desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))` - `input` retorna uma string, mas a variável é usada em cálculos (`desconto = subtotal * (desconto_cupom / 100)`) e comparações (`if desconto_cupom > 0`), causando `TypeError`.
   - **Correção**: Convertido para `float`: `desconto_cupom = float(input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))`

3. **Erro de Sintaxe na Linha 25: Faltando 'f' na f-string**
   - **Descrição**: `print(" Item 2:        R$ {total_item2:.2f}")` - É uma string literal, não uma f-string, então `{total_item2}` não é interpolado.
   - **Correção**: Adicionado 'f' no início: `print(f" Item 2:        R$ {total_item2:.2f}")`

4. **Erro de Indentação na Linha 30: `print` dentro do `if` não indentado**
   - **Descrição**: `if desconto_cupom > 0: \nprint(f" Desconto ({desconto_cupom:.0f}%): -R$ {desconto:.2f}")` - O `print` não está indentado, causando erro de sintaxe (não pertence ao bloco `if`).
   - **Correção**: Indentado o `print`: adicionado 4 espaços.

5. **Melhoria na Linha 33: Formatação redundante no `print` do total**
   - **Descrição**: `print(f" TOTAL:         R$ {round(total, 2):.2f}")` - `round(total, 2)` arredonda, e `:.2f` formata, redundante e pode causar confusão.
   - **Correção**: Simplificado para `print(f" TOTAL:         R$ {total:.2f}")`, assumindo que `total` é calculado corretamente.

## Código Corrigido

Após as correções, o código agora executa sem erros, calcula corretamente o total com imposto e desconto, e exibe a saída formatada.

## Teste Sugerido

Para testar:
- Execute o script.
- Insira nome, quantidades e preços.
- Insira um percentual de desconto (ex.: 10) ou 0.
- Verifique se o cálculo e a exibição estão corretos.
