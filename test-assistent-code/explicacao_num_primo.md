# Explicação linha a linha do código `num_primos.py`

A seguir está uma explicação detalhada de cada parte do código que verifica se um número é primo.

```python
def eh_primo(n):
    """Retorna True se n for primo, caso contrário False."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

if __name__ == '__main__':
    numeros = [1, 2, 3, 4, 16, 17, 19, 20]
    for num in numeros:
        print(f"{num}: {eh_primo(num)}")
```

## Explicação detalhada

- `def eh_primo(n):`
  - Define uma função chamada `eh_primo` que recebe um parâmetro `n`.
  - Esta função vai determinar se `n` é um número primo.

- `    """Retorna True se n for primo, caso contrário False."""`
  - É uma *docstring* que descreve o propósito da função.
  - Ajuda outros programadores a entender o que a função faz.

- `    if n <= 1:`
  - Verifica se o número é menor ou igual a 1.
  - Números menores ou iguais a 1 não são considerados primos.

- `        return False`
  - Retorna `False` imediatamente quando `n` não pode ser primo.

- `    if n <= 3:`
  - Verifica se `n` é 2 ou 3.
  - Esses são primos, e são tratados como casos base.

- `        return True`
  - Retorna `True` para 2 e 3.

- `    if n % 2 == 0 or n % 3 == 0:`
  - Verifica se `n` é divisível por 2 ou por 3.
  - Se for, então não é primo, exceto 2 e 3, que já foram tratados.

- `        return False`
  - Retorna `False` quando `n` tem divisor 2 ou 3.

- `    i = 5`
  - Inicia a variável `i` em 5.
  - A partir daqui, o código tenta divisores maiores, mas ignora múltiplos de 2 e 3.

- `    while i * i <= n:`
  - Executa um loop enquanto `i` ao quadrado for menor ou igual a `n`.
  - Se nenhum divisor menor ou igual à raiz quadrada de `n` for encontrado, `n` é primo.

- `        if n % i == 0 or n % (i + 2) == 0:`
  - Verifica se `n` é divisível por `i` ou por `i + 2`.
  - Isto cobre pares de candidatos de forma eficiente: 5 e 7, 11 e 13, 17 e 19, etc.

- `            return False`
  - Se houver uma divisão exata, `n` não é primo e a função retorna `False`.

- `        i += 6`
  - Avança o próximo par de candidatos em 6 unidades.
  - Isso mantém `i` no formato de números que não são múltiplos de 2 nem de 3.

- `    return True`
  - Se o loop terminar sem encontrar divisores, `n` é primo.
  - A função retorna `True`.

- `if __name__ == '__main__':`
  - Verifica se o script está sendo executado diretamente.
  - Esse bloco não roda quando o arquivo é importado como módulo.

- `    numeros = [1, 2, 3, 4, 16, 17, 19, 20]`
  - Define uma lista de números para testar a função.

- `    for num in numeros:`
  - Inicia um loop para testar cada número na lista.

- `        print(f"{num}: {eh_primo(num)}")`
  - Exibe o número e o resultado da verificação.
  - Mostra `True` para números primos e `False` para os outros.
